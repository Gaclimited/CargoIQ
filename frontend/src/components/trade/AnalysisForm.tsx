import { useState, type FormEvent } from "react";
import { Input } from "../ui/Input";
import { TextArea } from "../ui/TextArea";
import { Button } from "../ui/Button";
import { Alert } from "../ui/Alert";
import type { CreateTradeAnalysisRequest } from "../../types/tradeAnalysis.types";
import type { NormalizedApiError } from "../../types/api.types";

interface FormState {
  originCountry: string;
  destinationCountry: string;
  productName: string;
  category: string;
  value: string;
  weight: string;
  description: string;
}

const initialState: FormState = {
  originCountry: "",
  destinationCountry: "",
  productName: "",
  category: "",
  value: "",
  weight: "",
  description: "",
};

interface AnalysisFormProps {
  onSubmit: (body: CreateTradeAnalysisRequest) => Promise<void>;
  isSubmitting: boolean;
  submitError: NormalizedApiError | null;
}

/**
 * Field-level validation mirrors src/utils/validators/tradeAnalysis.validator.ts
 * (createTradeAnalysisSchema) exactly, so the user sees the same rules
 * client-side before ever hitting the backend.
 */
function validate(form: FormState): Partial<Record<keyof FormState, string>> {
  const errors: Partial<Record<keyof FormState, string>> = {};

  if (form.originCountry.trim().length < 2) {
    errors.originCountry = "Origin country must be at least 2 characters long";
  }
  if (form.destinationCountry.trim().length < 2) {
    errors.destinationCountry =
      "Destination country must be at least 2 characters long";
  }
  if (form.productName.trim().length < 2) {
    errors.productName = "Product name must be at least 2 characters long";
  }
  if (form.category.trim().length < 2) {
    errors.category = "Category must be at least 2 characters long";
  }

  const value = Number(form.value);
  if (!form.value || Number.isNaN(value) || value <= 0) {
    errors.value = "Product value must be greater than 0";
  }

  const weight = Number(form.weight);
  if (!form.weight || Number.isNaN(weight) || weight <= 0) {
    errors.weight = "Weight must be greater than 0";
  }

  if (form.description.trim().length < 10) {
    errors.description =
      "Please provide a more detailed product description (min 10 characters)";
  }

  return errors;
}

export function AnalysisForm({
  onSubmit,
  isSubmitting,
  submitError,
}: AnalysisFormProps) {
  const [form, setForm] = useState<FormState>(initialState);
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof FormState, string>>
  >({});

  function handleChange(field: keyof FormState, val: string) {
    setForm((prev) => ({ ...prev, [field]: val }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const errors = validate(form);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    await onSubmit({
      originCountry: form.originCountry.trim(),
      destinationCountry: form.destinationCountry.trim(),
      productName: form.productName.trim(),
      category: form.category.trim(),
      value: Number(form.value),
      weight: Number(form.weight),
      description: form.description.trim(),
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {submitError && (
        <Alert tone="error" title="Analysis failed">
          {submitError.message}
        </Alert>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Input
          label="Origin country"
          name="originCountry"
          placeholder="e.g. India"
          value={form.originCountry}
          onChange={(e) => handleChange("originCountry", e.target.value)}
          error={fieldErrors.originCountry}
        />
        <Input
          label="Destination country"
          name="destinationCountry"
          placeholder="e.g. Germany"
          value={form.destinationCountry}
          onChange={(e) => handleChange("destinationCountry", e.target.value)}
          error={fieldErrors.destinationCountry}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Input
          label="Product name"
          name="productName"
          placeholder="e.g. Wireless Bluetooth Earbuds"
          value={form.productName}
          onChange={(e) => handleChange("productName", e.target.value)}
          error={fieldErrors.productName}
        />
        <Input
          label="Category"
          name="category"
          placeholder="e.g. Consumer Electronics"
          value={form.category}
          onChange={(e) => handleChange("category", e.target.value)}
          error={fieldErrors.category}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Input
          label="Declared value (USD)"
          name="value"
          type="number"
          step="0.01"
          min="0"
          placeholder="e.g. 25.00"
          value={form.value}
          onChange={(e) => handleChange("value", e.target.value)}
          error={fieldErrors.value}
        />
        <Input
          label="Weight (kg)"
          name="weight"
          type="number"
          step="0.01"
          min="0"
          placeholder="e.g. 0.2"
          value={form.weight}
          onChange={(e) => handleChange("weight", e.target.value)}
          error={fieldErrors.weight}
        />
      </div>

      <TextArea
        label="Product description"
        name="description"
        placeholder="Describe materials, function, packaging, and anything customs-relevant..."
        value={form.description}
        onChange={(e) => handleChange("description", e.target.value)}
        error={fieldErrors.description}
        hint="Minimum 10 characters. The more detail you provide, the more accurate the AI analysis."
        rows={5}
      />

      <Button type="submit" size="lg" fullWidth isLoading={isSubmitting}>
        {isSubmitting ? "Analyzing with AI..." : "Run AI Trade Analysis"}
      </Button>
    </form>
  );
}
