import type { ReactNode } from "react";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { Alert } from "../ui/Alert";
import type { TradeAnalysis } from "../../types/tradeAnalysis.types";
import { formatTriState, triStateTone, formatDate } from "../../utils/formatters";

function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
      <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-ink-400">
        {title}
      </h3>
      {children}
    </div>
  );
}

export function AnalysisResult({ analysis }: { analysis: TradeAnalysis }) {
  const ai = analysis.aiResponse;

  return (
    <div className="space-y-6">
      {/* Shipment summary */}
      <Card>
        <h2 className="mb-4 text-lg font-semibold text-ink-900">
          Shipment Summary
        </h2>
        <div className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-3">
          <div>
            <p className="text-ink-400">Product</p>
            <p className="font-medium text-ink-900">{analysis.productName}</p>
          </div>
          <div>
            <p className="text-ink-400">Category</p>
            <p className="font-medium text-ink-900">{analysis.category}</p>
          </div>
          <div>
            <p className="text-ink-400">Route</p>
            <p className="font-medium text-ink-900">
              {analysis.originCountry} &rarr; {analysis.destinationCountry}
            </p>
          </div>
          <div>
            <p className="text-ink-400">Declared value</p>
            <p className="font-medium text-ink-900">
              ${analysis.value.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-ink-400">Weight</p>
            <p className="font-medium text-ink-900">{analysis.weight} kg</p>
          </div>
        </div>
      </Card>

      {/* Live Verification (Google Search Grounding) */}
      {ai.verificationTimestamp && (
        <Card>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-ink-900">
              🌐 Live Verification
            </h2>
            <Badge tone={ai.liveVerification ? "positive" : "neutral"}>
              {ai.liveVerification ? "Verified via Google Search" : "Unavailable"}
            </Badge>
          </div>
          <div className="space-y-5">
            <Section title="Last Verified">
              <p className="text-sm text-ink-700">
                {formatDate(ai.verificationTimestamp)}
              </p>
            </Section>

            <Section title="Recent Updates">
              <p className="whitespace-pre-line text-sm text-ink-700">
                {ai.recentUpdates}
              </p>
            </Section>

            {ai.sources && ai.sources.length > 0 && (
              <Section title="Sources">
                <ul className="list-inside list-disc space-y-1 text-sm">
                  {ai.sources.map((source, i) => (
                    <li key={i}>
                      <a
                        href={source.uri}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand-700 hover:underline"
                      >
                        {source.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </Section>
            )}
          </div>
        </Card>
      )}

      {/* AI Classification */}
      <Card>
        <h2 className="mb-4 text-lg font-semibold text-ink-900">
          AI Product Classification
        </h2>
        <div className="space-y-5">
          <Section title="Product Type">
            <p className="text-sm text-ink-700">{ai.productType}</p>
          </Section>

          <Section title="Main Materials">
            <div className="flex flex-wrap gap-2">
              {ai.mainMaterials.length > 0 ? (
                ai.mainMaterials.map((m, i) => (
                  <Badge key={i} tone="brand">
                    {m}
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-ink-400">Not specified</p>
              )}
            </div>
          </Section>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <p className="mb-1.5 text-sm font-semibold uppercase tracking-wide text-ink-400">
                Electronics
              </p>
              <Badge tone={triStateTone(ai.electronics)}>
                {formatTriState(ai.electronics)}
              </Badge>
            </div>
            <div>
              <p className="mb-1.5 text-sm font-semibold uppercase tracking-wide text-ink-400">
                Battery Present
              </p>
              <Badge tone={triStateTone(ai.batteryPresent)}>
                {formatTriState(ai.batteryPresent)}
              </Badge>
            </div>
            <div>
              <p className="mb-1.5 text-sm font-semibold uppercase tracking-wide text-ink-400">
                Wireless
              </p>
              <Badge tone={triStateTone(ai.wireless)}>
                {formatTriState(ai.wireless)}
              </Badge>
            </div>
          </div>
        </div>
      </Card>

      {/* Customs & duties */}
      <Card>
        <h2 className="mb-4 text-lg font-semibold text-ink-900">
          Customs &amp; Duties
        </h2>
        <div className="space-y-5">
          <Section title="Possible HS Code">
            <p className="text-sm text-ink-700">{ai.possibleHsCode}</p>
          </Section>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Section title="Estimated Import Duty">
              <p className="text-sm text-ink-700">{ai.importDuty}</p>
            </Section>
            <Section title="Estimated VAT / GST">
              <p className="text-sm text-ink-700">{ai.vat}</p>
            </Section>
          </div>
        </div>
      </Card>

      {/* Documents & regulations */}
      <Card>
        <h2 className="mb-4 text-lg font-semibold text-ink-900">
          Documentation &amp; Regulations
        </h2>
        <div className="space-y-5">
          <Section title="Required Documents">
            {ai.requiredDocuments.length > 0 ? (
              <ul className="list-inside list-disc space-y-1 text-sm text-ink-700">
                {ai.requiredDocuments.map((doc, i) => (
                  <li key={i}>{doc}</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-ink-400">Not specified</p>
            )}
          </Section>
          <Section title="Country-Specific Regulations">
            <p className="whitespace-pre-line text-sm text-ink-700">
              {ai.countryRegulations}
            </p>
          </Section>
        </div>
      </Card>

      {/* AI suggestions */}
      <Card>
        <h2 className="mb-4 text-lg font-semibold text-ink-900">
          AI Suggestions
        </h2>
        <p className="whitespace-pre-line text-sm text-ink-700">
          {ai.aiSuggestions}
        </p>
      </Card>

      {ai.confidenceNotes && (
        <Alert tone="warning" title="Confidence Notes">
          {ai.confidenceNotes}
        </Alert>
      )}

      <Alert tone="info">
        This analysis is AI-generated and provided for guidance only. Always
        verify HS codes, duty rates, and required documentation with a
        licensed customs broker before shipping.
      </Alert>
    </div>
  );
}
