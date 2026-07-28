import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchAllAnalyses,
  fetchAnalysisById,
  createAnalysis,
  deleteAnalysis,
} from "../api/tradeAnalysis.api";
import type {
  CreateTradeAnalysisRequest,
  TradeAnalysis,
  DeleteTradeAnalysisResult,
} from "../types/tradeAnalysis.types";
import type { NormalizedApiError } from "../types/api.types";

const ANALYSES_KEY = ["analyses"] as const;
const ANALYSIS_KEY = (id: string) => ["analyses", id] as const;

export function useAnalysesList() {
  return useQuery<TradeAnalysis[], NormalizedApiError>({
    queryKey: ANALYSES_KEY,
    queryFn: fetchAllAnalyses,
  });
}

export function useAnalysisDetail(id: string | undefined) {
  return useQuery<TradeAnalysis, NormalizedApiError>({
    queryKey: ANALYSIS_KEY(id ?? ""),
    queryFn: () => fetchAnalysisById(id as string),
    enabled: Boolean(id),
  });
}

export function useCreateAnalysis() {
  const queryClient = useQueryClient();
  return useMutation<TradeAnalysis, NormalizedApiError, CreateTradeAnalysisRequest>({
    mutationFn: (body: CreateTradeAnalysisRequest) => createAnalysis(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ANALYSES_KEY });
    },
  });
}

export function useDeleteAnalysis() {
  const queryClient = useQueryClient();
  return useMutation<DeleteTradeAnalysisResult, NormalizedApiError, string>({
    mutationFn: (id: string) => deleteAnalysis(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ANALYSES_KEY });
    },
  });
}

