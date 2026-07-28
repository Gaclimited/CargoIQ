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

      {/* Hero */}
      <div className="rounded-3xl bg-gradient-to-r from-brand-600 to-brand-700 p-10 text-white shadow-lg">
        <h1 className="text-4xl font-bold">
          Welcome back{user?.name ? `, ${user.name}` : ""}! 👋
        </h1>

        <h2 className="mt-6 text-3xl font-bold">
          CargoIQ
        </h2>

        <p className="mt-4 max-w-2xl text-lg text-blue-100">
          AI-powered international trade intelligence that helps businesses
          estimate duties, identify HS codes, understand regulations,
          and prepare shipments with confidence.
        </p>

        <div className="mt-8 flex gap-4">
          <Link to="/analysis/new">
            <Button>Start New Analysis</Button>
          </Link>

          <a href="#history">
            <Button variant="outline">
              View Previous Analyses
            </Button>
          </a>
        </div>
      </div>

      {/* Features */}
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

        <div className="rounded-2xl border p-6 shadow-card">
          <h3 className="text-lg font-semibold">
            🌍 HS Code Suggestions
          </h3>
          <p className="mt-2 text-sm text-ink-600">
            AI-generated customs classifications with confidence notes.
          </p>
        </div>

        <div className="rounded-2xl border p-6 shadow-card">
          <h3 className="text-lg font-semibold">
            💰 Duties & Taxes
          </h3>
          <p className="mt-2 text-sm text-ink-600">
            Estimate import duties and VAT/GST before shipping.
          </p>
        </div>

        <div className="rounded-2xl border p-6 shadow-card">
          <h3 className="text-lg font-semibold">
            📄 Required Documents
          </h3>
          <p className="mt-2 text-sm text-ink-600">
            Know which export and import documents are commonly required.
          </p>
        </div>

        <div className="rounded-2xl border p-6 shadow-card">
          <h3 className="text-lg font-semibold">
            🤖 AI Trade Analysis
          </h3>
          <p className="mt-2 text-sm text-ink-600">
            Powered by Google Gemini to analyze your products in seconds.
          </p>
        </div>

      </div>

      {/* Analysis History */}
      <div id="history" className="mt-14">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            Previous Analyses
          </h2>

          <Link to="/analysis/new">
            <Button>+ New Analysis</Button>
          </Link>
        </div>

        <AnalysisList
          analyses={data}
          isLoading={isLoading}
          error={error}
        />
      </div>

      {/* Footer */}
      <div className="mt-16 rounded-2xl bg-ink-900 p-8 text-white">

        <h3 className="text-xl font-semibold">
          Need Help?
        </h3>

        <p className="mt-3 text-ink-300">
          Contact our team for assistance with international trade,
          customs procedures, or platform support.
        </p>

        <div className="mt-6 space-y-2 text-sm text-ink-300">
          <p>📧 support@cargoiq.com</p>
          <p>📚 Documentation</p>
          <p>🌐 AI-powered trade intelligence platform</p>
        </div>

        <hr className="my-6 border-ink-700" />

        <p className="text-xs text-ink-400">
          CargoIQ provides AI-assisted trade guidance.
          Customs classifications, duties, taxes, and regulations
          should always be verified with the appropriate customs
          authority or a licensed customs broker before shipment.
        </p>

      </div>

    </div>
  );
}
