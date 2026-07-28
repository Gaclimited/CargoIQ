/**
 * Centralized localStorage access for the JWT issued by
 * POST /register and POST /login (see auth.service.ts -> signToken).
 *
 * Kept as plain functions (not a class) so it can be imported both by
 * the Axios client (for attaching the Authorization header) and by
 * AuthContext (for restoring session on load) without any circular
 * dependency risk.
 */

const TOKEN_KEY = "CargoIQ_token";
const USER_KEY = "CargoIQ_user";

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function removeToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

export function getStoredUser<T>(): T | null {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function setStoredUser<T>(user: T): void {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function removeStoredUser(): void {
  localStorage.removeItem(USER_KEY);
}

export function clearAuthStorage(): void {
  removeToken();
  removeStoredUser();
}
