import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { Alert } from "../components/ui/Alert";
import { useAuth } from "../hooks/useAuth";
import type { NormalizedApiError } from "../types/api.types";

interface FormState {
  name: string;
  email: string;
  password: string;
}

/**
 * Mirrors src/utils/validators/auth.validator.ts -> registerSchema.body
 */
function validate(form: FormState): Partial<Record<keyof FormState, string>> {
  const errors: Partial<Record<keyof FormState, string>> = {};
  if (form.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters long";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = "Please provide a valid email address";
  }
  if (form.password.length < 6) {
    errors.password = "Password must be at least 6 characters long";
  }
  return errors;
}

export function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    password: "",
  });
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof FormState, string>>
  >({});
  const [serverError, setServerError] = useState<NormalizedApiError | null>(
    null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setServerError(null);

    const errors = validate(form);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setIsSubmitting(true);
    try {
      await register({
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
      });
      navigate("/dashboard");
    } catch (err) {
      setServerError(err as NormalizedApiError);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="container-page flex min-h-[calc(100vh-4rem)] items-center justify-center py-12">
      <Card className="w-full max-w-md animate-slide-up">
        <h1 className="text-2xl font-bold text-ink-900">Create your account</h1>
        <p className="mt-1 text-sm text-ink-500">
          Start analyzing shipments with AI in minutes.
        </p>

        <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
          {serverError && (
            <Alert tone="error" title="Registration failed">
              {serverError.message}
            </Alert>
          )}

          <Input
            label="Full name"
            name="name"
            autoComplete="name"
            placeholder="Jane Doe"
            value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            error={fieldErrors.name}
          />
          <Input
            label="Email address"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            value={form.email}
            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
            error={fieldErrors.email}
          />
          <Input
            label="Password"
            name="password"
            type="password"
            autoComplete="new-password"
            placeholder="At least 6 characters"
            value={form.password}
            onChange={(e) =>
              setForm((p) => ({ ...p, password: e.target.value }))
            }
            error={fieldErrors.password}
          />

          <Button type="submit" fullWidth size="lg" isLoading={isSubmitting}>
            Create account
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-ink-500">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-brand-600 hover:text-brand-700">
            Log in
          </Link>
        </p>
      </Card>
    </div>
  );
}
