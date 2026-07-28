import type { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hoverable?: boolean;
}

export function Card({
  children,
  hoverable = false,
  className = "",
  ...props
}: CardProps) {
  return (
    <div
      className={`rounded-xl border border-ink-200 bg-white p-6 shadow-card ${
        hoverable ? "transition-shadow hover:shadow-card-hover" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
