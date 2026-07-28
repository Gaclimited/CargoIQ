import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAnalysisDetail, useDeleteAnalysis } from "../hooks/useTradeAnalyses";
import { AnalysisResult } from "../components/trade/AnalysisResult";
import { Button } from "../components/ui/Button";
import { Alert } from "../components/ui/Alert";
import { Spinner } from "../components/ui/Spinner";

export function AnalysisDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: analysis, isLoading, error } = useAnalysisDetail(id);
  const deleteMutation = useDeleteAnalysis();
  const [showConfirm, setShowConfirm] = useState(false);

  async function handleDelete() {
    if (!id) return;
    await deleteMutation.mutateAsync(id);
    navigate("/dashboard", { replace: true });
  }

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Spinner size="lg" className="text-brand-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-page py-10">
        <Alert tone="error" title="Couldn't load this analysis">
          {error.message}
        </Alert>
        <Link to="/dashboard" className="mt-4 inline-block">
          <Button variant="outline">Back to dashboard</Button>
        </Link>
      </div>
    );
  }

  if (!analysis) {
    return null;
  }

  return (
    <div className="container-page max-w-4xl py-10">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Link
            to="/dashboard"
            className="mb-2 inline-block text-sm text-ink-500 hover:text-ink-700"
          >
            &larr; Back to dashboard
          </Link>
          <h1 className="text-2xl font-bold text-ink-900">
            {analysis.productName}
          </h1>
          <p className="mt-1 text-sm text-ink-500">
            {analysis.originCountry} &rarr; {analysis.destinationCountry}
          </p>
        </div>

        <div className="flex gap-2">
          {showConfirm ? (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowConfirm(false)}
                disabled={deleteMutation.isPending}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={handleDelete}
                isLoading={deleteMutation.isPending}
              >
                Confirm delete
              </Button>
            </>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowConfirm(true)}
            >
              Delete analysis
            </Button>
          )}
        </div>
      </div>

      {deleteMutation.isError && (
        <Alert tone="error" title="Couldn't delete this analysis" className="mb-6">
          {deleteMutation.error.message}
        </Alert>
      )}

      <AnalysisResult analysis={analysis} />
    </div>
  );
}
