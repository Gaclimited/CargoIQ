import { Link } from "react-router-dom";
import { useAnalysesList } from "../hooks/useTradeAnalyses";
import { AnalysisList } from "../components/trade/AnalysisList";
import { Button } from "../components/ui/Button";
import { useAuth } from "../hooks/useAuth";

export function DashboardPage() {
  const { user } = useAuth();
  const { data, isLoading, error } = useAnalysesList();

  return (
    <div className="container-page py-10">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-ink-900">
            Welcome back{user?.name ? `, ${user.name}` : ""}
          </h1>
          <p className="mt-1 text-sm text-ink-500">
            Here's an overview of your trade compliance analyses.
          </p>
        </div>
        <Link to="/analysis/new">
          <Button>+ New Analysis</Button>
        </Link>
      </div>

      <AnalysisList analyses={data} isLoading={isLoading} error={error} />
    </div>
  );
}
