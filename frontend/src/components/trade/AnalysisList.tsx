import { Link } from "react-router-dom";
import { AnalysisCard } from "./AnalysisCard";
import { Spinner } from "../ui/Spinner";
import { Alert } from "../ui/Alert";
import { Button } from "../ui/Button";
import type { TradeAnalysis } from "../../types/tradeAnalysis.types";
import type { NormalizedApiError } from "../../types/api.types";

interface AnalysisListProps {
  analyses: TradeAnalysis[] | undefined;
  isLoading: boolean;
  error: NormalizedApiError | null;
}

export function AnalysisList({ analyses, isLoading, error }: AnalysisListProps) {
  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Spinner size="lg" className="text-brand-600" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert tone="error" title="Couldn't load your analyses">
        {error.message}
      </Alert>
    );
  }

  if (!analyses || analyses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-ink-300 bg-white py-16 text-center">
        <h3 className="text-lg font-semibold text-ink-900">
          No analyses yet
        </h3>
        <p className="mt-1 max-w-sm text-sm text-ink-500">
          Run your first AI-powered trade compliance analysis to see it
          appear here.
        </p>
        <Link to="/analysis/new" className="mt-5">
          <Button>Start your first analysis</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {analyses.map((analysis) => (
        <AnalysisCard key={analysis.id} analysis={analysis} />
      ))}
    </div>
  );
}
