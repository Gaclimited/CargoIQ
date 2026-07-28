import { z } from "zod";
import { createTradeAnalysisSchema } from "../utils/validators/tradeAnalysis.validator";

export type CreateTradeAnalysisInput = z.infer<typeof createTradeAnalysisSchema>["body"];

export interface AiTradeAnalysisResult {
    productType: string;
    mainMaterials: string[];
    electronics: boolean | "uncertain";
    batteryPresent: boolean | "uncertain";
    wireless: boolean | "uncertain";
    possibleHsCode: string;
    importDuty: string;
    vat: string;
    requiredDocuments: string[];
    countryRegulations: string;
    aiSuggestions: string;
    confidenceNotes?: string;
    // --- Google Search Grounding additions ---
    // Populated by ai.service.ts after a live Google Search verification step.
    // These are NOT requested from Gemini's structured JSON schema (grounding
    // tools and responseSchema cannot be combined in a single Gemini request),
    // they are attached by our own service code once both Gemini calls finish.
    liveVerification: boolean;
    recentUpdates: string;
    verificationTimestamp: string;
    sources: GroundingSource[];
    groundingMetadata?: unknown;
}

export interface GroundingSource {
    title: string;
    uri: string;
}