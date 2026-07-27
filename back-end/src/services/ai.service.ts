import { Type } from "@google/genai";
import { genAI, GEMINI_MODEL } from "../config/gemini";
import { AppError } from "../utils/AppError";
import { aiResponseSchema } from "../utils/validators/aiResponse.validator";
import { AiTradeAnalysisResult, CreateTradeAnalysisInput } from "../types/tradeAnalysis.types";

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

function buildPrompt(input: CreateTradeAnalysisInput): string {
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
    let rawText: string | undefined;

    try {
        const response = await genAI.models.generateContent({
            model: GEMINI_MODEL,
            contents: buildPrompt(input),
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

    return validation.data;
}