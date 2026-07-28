import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "../ui/Button";

export function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header className="sticky top-0 z-40 border-b border-ink-200 bg-white/80 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-ink-900">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white">
            T
          </span>
          <span className="text-lg tracking-tight">TradeIQ</span>
        </Link>

        <nav className="flex items-center gap-2">
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className="hidden rounded-lg px-3 py-2 text-sm font-medium text-ink-600 hover:bg-ink-100 sm:inline-block"
              >
                Dashboard
              </Link>
              <Link
                to="/analysis/new"
                className="hidden rounded-lg px-3 py-2 text-sm font-medium text-ink-600 hover:bg-ink-100 sm:inline-block"
              >
                New Analysis
              </Link>
              <span className="hidden pr-2 text-sm text-ink-400 md:inline-block">
                {user?.name}
              </span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Log in
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="primary" size="sm">
                  Get started
                </Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
