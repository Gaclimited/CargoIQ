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
        <Link
          to={isAuthenticated ? "/dashboard" : "/"}
          className="flex items-center gap-2 font-bold text-ink-900"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white font-bold">
            C
          </span>
          <span className="text-lg tracking-tight">CargoIQ</span>
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
              <Link
                to="/account"
                className="hidden items-center gap-3 transition-opacity hover:opacity-80 md:flex"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white shadow-md">
                  {user?.name
                    ?.split(" ")
                    .map((part) => part[0])
                    .join("")
                    .toUpperCase()}
                </div>

                <span className="text-sm font-medium text-ink-700">
                  {user?.name}
                </span>
              </Link>
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
