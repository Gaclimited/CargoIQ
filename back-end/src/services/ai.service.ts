import { Type } from "@google/genai";
import { genAI, GEMINI_MODEL } from "../config/gemini";
import { env } from "../config/env";
import { AppError } from "../utils/AppError";
import { aiResponseSchema } from "../utils/validators/aiResponse.validator";
import {
    AiTradeAnalysisResult,
    CreateTradeAnalysisInput,
    GroundingSource,
} from "../types/tradeAnalysis.types";

const tradeAnalysisResponseSchema = {
    type: Type.OBJECT,
    properties: {
        productType: { type: Type.STRING },
        mainMaterials: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
        },
        electronics: { type: Type.STRING, enum: ["true", "false", "uncertain"] },
        batteryPresent: { type: Type.STRING, enum: ["true", "false", "uncertain"] },
        wireless: { type: Type.STRING, enum: ["true", "false", "uncertain"] },
        possibleHsCode: { type: Type.STRING },
        importDuty: { type: Type.STRING },
        vat: { type: Type.STRING },
        requiredDocuments: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
        },
        countryRegulations: { type: Type.STRING },
        aiSuggestions: { type: Type.STRING },
        confidenceNotes: { type: Type.STRING },
    },
    required: [
        "productType",
        "mainMaterials",
        "electronics",
        "batteryPresent",
        "wireless",
        "possibleHsCode",
        "importDuty",
        "vat",
        "requiredDocuments",
        "countryRegulations",
        "aiSuggestions",
    ],
};

const NO_UPDATES_FOUND_MESSAGE =
    "No significant recent regulatory or trade updates were found during live verification.";

/**
 * Result of the live Google Search Grounding step. Always resolves — even if
 * grounding is disabled or the request fails — so a grounding problem never
 * breaks the rest of the (pre-existing) analysis flow.
 */
interface LiveVerificationResult {
    liveVerification: boolean;
    recentUpdates: string;
    verificationTimestamp: string;
    sources: GroundingSource[];
    groundingMetadata?: unknown;
}

function buildGroundingPrompt(input: CreateTradeAnalysisInput): string {
    return `You are verifying current international trade compliance information using live Google Search, before a structured AI trade analysis is generated.

Search for the latest available information relevant to exporting "${input.productName}" (category: ${input.category}) from ${input.originCountry} to ${input.destinationCountry}. Specifically look for recent developments in:
- Import regulations and export regulations
- Tariff updates
- Customs notices
- Trade sanctions
- Import restrictions and export restrictions
- Required certifications
- Compliance updates
- Product recalls
- Shipping restrictions
- Dangerous goods requirements
- Regulatory announcements

Source quality: prioritize, in this order, (1) official government websites, (2) customs authorities, (3) regulatory agencies, (4) international organizations, (5) manufacturer documentation. Avoid blogs, forums, and opinion articles unless no better source exists.

Respond with a concise, factual summary (short paragraphs or bullet points) of anything relevant you find, noting what changed and when if dates are available. Do NOT invent or guess recent events — only report what your search actually finds.

If you find no significant recent regulatory or trade developments relevant to this shipment, respond with exactly this sentence and nothing else: "${NO_UPDATES_FOUND_MESSAGE}"`;
}

/**
 * Runs a live Google Search Grounding request (Gemini's `googleSearch` tool).
 *
 * IMPORTANT: the Gemini API does not support combining search tools with
 * `responseSchema`/`responseMimeType: "application/json"` in the same
 * `generateContent` call — a request using both is rejected with a 400
 * INVALID_ARGUMENT error. This is why grounding runs as its own plain-text
 * call here, separate from the structured JSON call further below, and its
 * findings are then woven into the structured call's prompt as context.
 */
async function performLiveVerification(
    input: CreateTradeAnalysisInput
): Promise<LiveVerificationResult> {
    const verificationTimestamp = new Date().toISOString();

    if (!env.ENABLE_SEARCH_GROUNDING) {
        return {
            liveVerification: false,
            recentUpdates:
                "Live verification is temporarily unavailable due to API limits. CargoIQ completed this analysis using Gemini's trade intelligence and compliance knowledge.",
            verificationTimestamp,
            sources: [],
        };
    }

    try {
        const response = await genAI.models.generateContent({
            model: GEMINI_MODEL,
            contents: buildGroundingPrompt(input),
            config: {
                tools: [{ googleSearch: {} }],
            },
        });

        const recentUpdates = response.text?.trim() || NO_UPDATES_FOUND_MESSAGE;
        const groundingMetadata = response.candidates?.[0]?.groundingMetadata;

        const sources: GroundingSource[] = [];
        const seenUris = new Set<string>();
        for (const chunk of groundingMetadata?.groundingChunks ?? []) {
            const uri = chunk.web?.uri;
            if (!uri || seenUris.has(uri)) continue;
            seenUris.add(uri);
            sources.push({ title: chunk.web?.title || uri, uri });
            if (sources.length >= 8) break; // keep the UI list readable
        }

        return {
            liveVerification: true,
            recentUpdates,
            verificationTimestamp,
            sources,
            groundingMetadata,
        };
    } catch (err) {
        console.error("Google Search Grounding request failed:", err);
        return {
            liveVerification: false,
            recentUpdates:
                "Live verification is temporarily unavailable due to API limits. CargoIQ completed this analysis using Gemini's trade intelligence and compliance knowledge.",
            verificationTimestamp,
            sources: [],
        };
    }
}

function buildPrompt(
    input: CreateTradeAnalysisInput,
    verification: LiveVerificationResult
): string {
    const liveContextBlock = verification.liveVerification
        ? `LIVE VERIFICATION FINDINGS (retrieved just now via Google Search, timestamp ${verification.verificationTimestamp}):
"""
${verification.recentUpdates}
"""

Combine your stable, general trade knowledge with these live-verified findings. The live findings supplement — they do NOT replace — your compliance analysis. If the live findings conflict with what you would otherwise assume from general knowledge, prefer the live-verified information and briefly explain the discrepancy. When a statement in "countryRegulations", "importDuty", "vat", "requiredDocuments", or "aiSuggestions" comes from the live findings above, mark it clearly (e.g. "Per recent live verification: ..."); mark everything else as standard/general trade knowledge (e.g. "Under standard trade rules: ...").`
        : `Live verification via Google Search was not available for this analysis (${verification.recentUpdates}). Base your analysis on stable, general trade knowledge only, and mention in "confidenceNotes" that live verification was unavailable for this specific analysis.`;

    return `You are an experienced international trade and customs assistant helping a business export a product internationally.

Analyze the product below and return structured trade information. Be precise and practical. If you cannot determine something confidently from the information given, do NOT guess — use "uncertain" for tri-state fields, and explicitly say so in the relevant text field or in "confidenceNotes".

Product details:
- Origin Country: ${input.originCountry}
- Destination Country: ${input.destinationCountry}
- Product Name: ${input.productName}
- Category: ${input.category}
- Declared Value: ${input.value}
- Weight (kg): ${input.weight}
- Description: ${input.description}

${liveContextBlock}

Provide your analysis covering:
1. Product type (a concise classification of what this product fundamentally is)
2. Main materials used in the product
3. Whether the product is electronic (true/false/uncertain)
4. Whether the product contains a battery (true/false/uncertain)
5. Whether the product has wireless connectivity (true/false/uncertain)
6. A possible HS (Harmonized System) code for customs classification — mention that it should be verified with a licensed customs broker
7. An estimated import duty range for shipping from ${input.originCountry} to ${input.destinationCountry} (clearly note this is an estimate, not official)
8. An estimated VAT/GST rate applicable in ${input.destinationCountry} (clearly note this is an estimate)
9. Documents typically required for this kind of export/import (e.g. commercial invoice, certificate of origin, etc.)
10. Any country-specific regulations, restrictions, or certifications relevant to this product and destination
11. Practical AI suggestions to help the business prepare this shipment smoothly

Respond ONLY with the structured JSON matching the provided schema.`;
}

export async function analyzeProductWithAI(
    input: CreateTradeAnalysisInput
): Promise<AiTradeAnalysisResult> {
    // Step 1: live Google Search Grounding (plain-text call, never throws).
    const verification = await performLiveVerification(input);

    // Step 2: existing structured JSON call, now with grounding findings
    // woven into the prompt as supplementary context (see buildPrompt).
    let rawText: string | undefined;

    try {
        const response = await genAI.models.generateContent({
            model: GEMINI_MODEL,
            contents: buildPrompt(input, verification),
            config: {
                responseMimeType: "application/json",
                responseSchema: tradeAnalysisResponseSchema,
            },
        });

        rawText = response.text;
    } catch (err) {
        console.error("Gemini API request failed:", err);
        throw new AppError(
            "The AI trade analysis service is currently unavailable. Please try again shortly.",
            502
        );
    }

    if (!rawText) {
        throw new AppError("The AI service returned an empty response.", 502);
    }

    let parsedJson: unknown;
    try {
        parsedJson = JSON.parse(rawText);
    } catch (err) {
        console.error("Failed to parse Gemini response as JSON:", rawText);
        throw new AppError("The AI service returned a malformed response.", 502);
    }

    const validation = aiResponseSchema.safeParse(parsedJson);

    if (!validation.success) {
        console.error("Gemini response failed schema validation:", validation.error.flatten());
        throw new AppError("The AI service returned an unexpected response format.", 502);
    }

    return {
        ...validation.data,
        liveVerification: verification.liveVerification,
        recentUpdates: verification.recentUpdates,
        verificationTimestamp: verification.verificationTimestamp,
        sources: verification.sources,
        groundingMetadata: verification.groundingMetadata,
    };
}