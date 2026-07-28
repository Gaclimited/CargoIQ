import { type ButtonHTMLAttributes, type ReactNode } from "react";
import { Spinner } from "./Spinner";

type Variant = "primary" | "secondary" | "outline" | "danger" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
  fullWidth?: boolean;
  children: ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-brand-600 text-white hover:bg-brand-700 focus-visible:ring-brand-500 disabled:bg-brand-300",
  secondary:
    "bg-ink-900 text-white hover:bg-ink-800 focus-visible:ring-ink-700 disabled:bg-ink-400",
  outline:
    "border border-ink-300 text-ink-700 bg-white hover:bg-ink-50 focus-visible:ring-ink-400 disabled:text-ink-300",
  danger:
    "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500 disabled:bg-red-300",
  ghost:
    "text-ink-600 hover:bg-ink-100 focus-visible:ring-ink-300 disabled:text-ink-300",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-3 py-1.5 text-sm rounded-md gap-1.5",
  md: "px-4 py-2.5 text-sm rounded-lg gap-2",
  lg: "px-6 py-3 text-base rounded-lg gap-2",
};

export function Button({
  variant = "primary",
  size = "md",
  isLoading = false,
  fullWidth = false,
  disabled,
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || isLoading}
      className={`inline-flex items-center justify-center font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed ${variantClasses[variant]} ${sizeClasses[size]} ${fullWidth ? "w-full" : ""} ${className}`}
      {...props}
    >
      {isLoading && <Spinner size="sm" className="text-current" />}
      {children}
    </button>
  );
}
