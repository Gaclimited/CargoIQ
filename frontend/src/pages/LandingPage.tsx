import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";

const features = [
  {
    title: "AI HS Code Classification",
    description:
      "Get a possible Harmonized System code for your product in seconds, powered by Gemini AI.",
  },
  {
    title: "Duty & VAT Estimates",
    description:
      "Understand estimated import duty and VAT/GST ranges before you ship internationally.",
  },
  {
    title: "Document Checklists",
    description:
      "See the documents typically required for your product's export and import route.",
  },
  {
    title: "Regulation Insights",
    description:
      "Surface country-specific regulations, restrictions, and certification requirements.",
  },
];

export function LandingPage() {
  return (
    <div>
      {/* Hero */}
      <section className="border-b border-ink-200 bg-gradient-to-b from-brand-50 to-white">
        <div className="container-page flex flex-col items-center py-20 text-center sm:py-28">
          <span className="mb-4 inline-flex items-center rounded-full bg-brand-100 px-3 py-1 text-xs font-medium text-brand-700">
            AI-Powered Trade Compliance
          </span>
          <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight text-ink-900 sm:text-5xl">
            Export with confidence, backed by AI trade analysis
          </h1>
          <p className="mt-5 max-w-xl text-lg text-ink-500">
            CargoIQ analyzes your product and shipping route to surface HS
            codes, duty estimates, required documents, and regulations —
            in seconds.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/register">
              <Button size="lg">Get started for free</Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline">
                Log in
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container-page py-16 sm:py-20">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-ink-900 sm:text-3xl">
            Everything you need before you ship
          </h2>
          <p className="mt-2 text-ink-500">
            One form, one AI analysis, a complete compliance snapshot.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <Card key={f.title} hoverable>
              <h3 className="font-semibold text-ink-900">{f.title}</h3>
              <p className="mt-2 text-sm text-ink-500">{f.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-ink-200 bg-ink-900">
        <div className="container-page flex flex-col items-center py-16 text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Ready to analyze your first shipment?
          </h2>
          <p className="mt-2 max-w-md text-ink-300">
            Create a free account and run your first AI trade compliance
            analysis in under a minute.
          </p>
          <Link to="/register" className="mt-6">
            <Button size="lg">Create your account</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
