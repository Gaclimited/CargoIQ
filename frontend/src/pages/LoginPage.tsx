import { useState, type FormEvent } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { Alert } from "../components/ui/Alert";
import { useAuth } from "../hooks/useAuth";
import type { NormalizedApiError } from "../types/api.types";

interface FormState {
  email: string;
  password: string;
}

function validate(form: FormState): Partial<Record<keyof FormState, string>> {
  const errors: Partial<Record<keyof FormState, string>> = {};
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = "Please provide a valid email address";
  }
  if (!form.password) {
    errors.password = "Password is required";
  }
  return errors;
}

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from ?? "/dashboard";

  const [form, setForm] = useState<FormState>({ email: "", password: "" });
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
      await login({
        email: form.email.trim().toLowerCase(),
        password: form.password,
      });
      navigate(from, { replace: true });
    } catch (err) {
      setServerError(err as NormalizedApiError);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="container-page flex min-h-[calc(100vh-4rem)] items-center justify-center py-12">
      <Card className="w-full max-w-md animate-slide-up">
        <h1 className="text-2xl font-bold text-ink-900">Welcome back</h1>
        <p className="mt-1 text-sm text-ink-500">
          Log in to access your trade analyses.
        </p>

        <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
          {serverError && (
            <Alert tone="error" title="Login failed">
              {serverError.message}
            </Alert>
          )}

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
            autoComplete="current-password"
            placeholder="Your password"
            value={form.password}
            onChange={(e) =>
              setForm((p) => ({ ...p, password: e.target.value }))
            }
            error={fieldErrors.password}
          />

          <Button type="submit" fullWidth size="lg" isLoading={isSubmitting}>
            Log in
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-ink-500">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="font-medium text-brand-600 hover:text-brand-700">
            Create one
          </Link>
        </p>
      </Card>
    </div>
  );
}
