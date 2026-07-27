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
}