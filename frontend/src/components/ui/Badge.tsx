import type { ReactNode } from "react";

type Tone = "positive" | "negative" | "neutral" | "brand";

interface BadgeProps {
  tone?: Tone;
  children: ReactNode;
  className?: string;
}

const toneClasses: Record<Tone, string> = {
  positive: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  negative: "bg-red-50 text-red-700 ring-red-200",
  neutral: "bg-ink-100 text-ink-600 ring-ink-200",
  brand: "bg-brand-50 text-brand-700 ring-brand-200",
};

export function Badge({ tone = "neutral", children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${toneClasses[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
