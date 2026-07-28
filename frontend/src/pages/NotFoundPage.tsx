import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";

export function NotFoundPage() {
  return (
    <div className="container-page flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center text-center">
      <p className="text-sm font-semibold text-brand-600">404</p>
      <h1 className="mt-2 text-3xl font-bold text-ink-900">Page not found</h1>
      <p className="mt-2 max-w-sm text-ink-500">
        The page you're looking for doesn't exist or may have been moved.
      </p>
      <Link to="/" className="mt-6">
        <Button>Back to home</Button>
      </Link>
    </div>
  );
}
