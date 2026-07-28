/**
 * Tri-state field as returned by the AI service after Zod transforms it
 * (see src/utils/validators/aiResponse.validator.ts -> triStateSchema).
 * The raw Gemini JSON uses the strings "true" | "false" | "uncertain", but the
 * backend transforms "true"/"false" into real booleans before persisting/returning.
 */
export type TriState = boolean | "uncertain";

/**
 * Matches src/types/tradeAnalysis.types.ts -> AiTradeAnalysisResult on the backend,
 * i.e. the exact shape stored in TradeAnalysis.aiResponse (Prisma Json column).
 */
export interface AiTradeAnalysisResult {
  productType: string;
  mainMaterials: string[];
  electronics: TriState;
  batteryPresent: TriState;
  wireless: TriState;
  possibleHsCode: string;
  importDuty: string;
  vat: string;
  requiredDocuments: string[];
  countryRegulations: string;
  aiSuggestions: string;
  confidenceNotes?: string;
}

/**
 * Matches src/utils/validators/tradeAnalysis.validator.ts -> createTradeAnalysisSchema.body
 */
export interface CreateTradeAnalysisRequest {
  originCountry: string;
  destinationCountry: string;
  productName: string;
  category: string;
  value: number;
  weight: number;
  description: string;
}

/**
 * Matches the Prisma `TradeAnalysis` model exactly (src/prisma/schema.prisma),
 * as returned by every endpoint in tradeAnalysis.controller.ts.
 */
export interface TradeAnalysis {
  id: string;
  userId: string;
  originCountry: string;
  destinationCountry: string;
  productName: string;
  category: string;
  value: number;
  weight: number;
  description: string;
  aiResponse: AiTradeAnalysisResult;
  createdAt: string;
}

/**
 * Matches the `data` field returned by DELETE /analysis/:id
 * (see tradeAnalysis.controller.ts -> removeAnalysis / service -> deleteTradeAnalysis)
 */
export interface DeleteTradeAnalysisResult {
  id: string;
}
