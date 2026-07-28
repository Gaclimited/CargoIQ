import { useNavigate } from "react-router-dom";
import { AnalysisForm } from "../components/trade/AnalysisForm";
import { Card } from "../components/ui/Card";
import { useCreateAnalysis } from "../hooks/useTradeAnalyses";
import type { CreateTradeAnalysisRequest } from "../types/tradeAnalysis.types";

export function NewAnalysisPage() {
  const navigate = useNavigate();
  const mutation = useCreateAnalysis();

  async function handleSubmit(body: CreateTradeAnalysisRequest) {
    const result = await mutation.mutateAsync(body);
    navigate(`/analysis/${result.id}`);
  }

  return (
    <div className="container-page max-w-3xl py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-ink-900">New Product Analysis</h1>
        <p className="mt-1 text-sm text-ink-500">
          Provide shipment details and let AI generate a compliance snapshot.
        </p>
      </div>

      <Card>
        <AnalysisForm
          onSubmit={handleSubmit}
          isSubmitting={mutation.isPending}
          submitError={mutation.error}
        />
      </Card>
    </div>
  );
}
