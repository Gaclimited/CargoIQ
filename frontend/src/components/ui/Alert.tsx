import type { ReactNode } from "react";

type Tone = "error" | "success" | "info" | "warning";

interface AlertProps {
  tone?: Tone;
  title?: string;
  children: ReactNode;
  className?: string;
}

const toneClasses: Record<Tone, string> = {
  error: "bg-red-50 border-red-200 text-red-700",
  success: "bg-emerald-50 border-emerald-200 text-emerald-700",
  info: "bg-blue-50 border-blue-200 text-blue-700",
  warning: "bg-amber-50 border-amber-200 text-amber-700",
};

export function Alert({
  tone = "info",
  title,
  children,
  className = "",
}: AlertProps) {
  return (
    <div
      role="alert"
      className={`rounded-lg border px-4 py-3 text-sm ${toneClasses[tone]} ${className}`}
    >
      {title && <p className="mb-0.5 font-semibold">{title}</p>}
      <div>{children}</div>
    </div>
  );
}
