import type { TriState } from "../types/tradeAnalysis.types";

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatWeight(weight: number): string {
  return `${new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(weight)} kg`;
}

export function formatDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

/**
 * Tri-state fields come back from the backend as boolean | "uncertain"
 * (see aiResponse.validator.ts -> triStateSchema transform).
 */
export function formatTriState(value: TriState): string {
  if (value === "uncertain") return "Uncertain";
  return value ? "Yes" : "No";
}

export function triStateTone(value: TriState): "positive" | "negative" | "neutral" {
  if (value === "uncertain") return "neutral";
  return value ? "positive" : "negative";
}
