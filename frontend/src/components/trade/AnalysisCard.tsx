import { Link } from "react-router-dom";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { formatDate, formatCurrency, formatWeight } from "../../utils/formatters";
import type { TradeAnalysis } from "../../types/tradeAnalysis.types";

export function AnalysisCard({ analysis }: { analysis: TradeAnalysis }) {
  return (
    <Link to={`/analysis/${analysis.id}`}>
      <Card hoverable className="h-full cursor-pointer">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-semibold text-ink-900">
              {analysis.productName}
            </h3>
            <p className="mt-0.5 text-sm text-ink-400">{analysis.category}</p>
          </div>
          <Badge tone="brand">
            {analysis.originCountry} &rarr; {analysis.destinationCountry}
          </Badge>
        </div>

        <p className="mt-4 line-clamp-2 text-sm text-ink-600">
          {analysis.description}
        </p>

        <div className="mt-4 flex items-center justify-between border-t border-ink-100 pt-3 text-xs text-ink-400">
          <span>
            {formatCurrency(analysis.value)} &middot; {formatWeight(analysis.weight)}
          </span>
          <span>{formatDate(analysis.createdAt)}</span>
        </div>
      </Card>
    </Link>
  );
}
