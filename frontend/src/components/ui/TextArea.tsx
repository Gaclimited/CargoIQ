import { forwardRef, type TextareaHTMLAttributes } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, hint, id, className = "", rows = 4, ...props }, ref) => {
    const textareaId = id ?? props.name;
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="mb-1.5 block text-sm font-medium text-ink-700"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          className={`w-full resize-none rounded-lg border px-3.5 py-2.5 text-sm text-ink-900 placeholder:text-ink-400 transition-colors focus:outline-none focus:ring-2 ${
            error
              ? "border-red-300 focus:border-red-500 focus:ring-red-100"
              : "border-ink-200 focus:border-brand-500 focus:ring-brand-100"
          } ${className}`}
          {...props}
        />
        {error ? (
          <p className="mt-1.5 text-xs text-red-600">{error}</p>
        ) : hint ? (
          <p className="mt-1.5 text-xs text-ink-400">{hint}</p>
        ) : null}
      </div>
    );
  }
);

TextArea.displayName = "TextArea";
