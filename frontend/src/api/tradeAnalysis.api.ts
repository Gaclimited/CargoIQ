import { apiClient } from "./client";
import type { ApiSuccess } from "../types/api.types";
import type {
  CreateTradeAnalysisRequest,
  TradeAnalysis,
  DeleteTradeAnalysisResult,
} from "../types/tradeAnalysis.types";

/**
 * POST /analyze (protected)
 * (src/routes/tradeAnalysis.routes.ts -> router.post("/analyze", validate(...), analyze))
 * Triggers the Gemini AI analysis on the backend and persists the result.
 */
export async function createAnalysis(
  body: CreateTradeAnalysisRequest
): Promise<TradeAnalysis> {
  const res = await apiClient.post<ApiSuccess<TradeAnalysis>>(
    "/analyze",
    body
  );
  return res.data.data;
}

/**
 * GET /analysis (protected)
 * (src/routes/tradeAnalysis.routes.ts -> router.get("/analysis", getAllAnalyses))
 * Returns only the authenticated user's analyses, newest first.
 */
export async function fetchAllAnalyses(): Promise<TradeAnalysis[]> {
  const res = await apiClient.get<ApiSuccess<TradeAnalysis[]>>("/analysis");
  return res.data.data;
}

/**
 * GET /analysis/:id (protected)
 * (src/routes/tradeAnalysis.routes.ts -> router.get("/analysis/:id", validate(...), getAnalysisById))
 */
export async function fetchAnalysisById(id: string): Promise<TradeAnalysis> {
  const res = await apiClient.get<ApiSuccess<TradeAnalysis>>(
    `/analysis/${id}`
  );
  return res.data.data;
}

/**
 * DELETE /analysis/:id (protected)
 * (src/routes/tradeAnalysis.routes.ts -> router.delete("/analysis/:id", validate(...), removeAnalysis))
 */
export async function deleteAnalysis(
  id: string
): Promise<DeleteTradeAnalysisResult> {
  const res = await apiClient.delete<ApiSuccess<DeleteTradeAnalysisResult>>(
    `/analysis/${id}`
  );
  return res.data.data;
}
