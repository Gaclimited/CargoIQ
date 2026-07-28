import axios, { AxiosError } from "axios";
import { getToken, clearAuthStorage } from "../utils/tokenStorage";
import type { ApiErrorPayload, NormalizedApiError } from "../types/api.types";

/**
 * Base URL comes from VITE_API_BASE_URL (see .env). The backend mounts every
 * route at root (app.ts -> app.use("/", authRoutes) / app.use("/", tradeAnalysisRoutes)),
 * so no "/api" prefix is added here.
 */
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach "Authorization: Bearer <token>" on every request when a token exists.
// Matches src/middleware/auth.middleware.ts -> protect, which expects exactly this header format.
apiClient.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.set("Authorization", `Bearer ${token}`);
  }
  return config;
});

/**
 * Flag used to avoid redirect loops: if we're already on /login, don't force
 * another redirect from the 401 interceptor below.
 */
function isOnAuthPage(): boolean {
  const path = window.location.pathname;
  return path === "/login" || path === "/register";
}

// Normalize backend error envelope: { success:false, message, errors? }
// (see src/middleware/errorHandler.ts) into a consistent shape the UI can render.
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorPayload>) => {
    const status = error.response?.status;
    const payload = error.response?.data;

    const normalized: NormalizedApiError = {
      message:
        payload?.message ||
        error.message ||
        "Something went wrong. Please try again.",
      status,
      fieldErrors: payload?.errors,
    };

    // Token invalid/expired/missing -> matches errorHandler.ts JsonWebTokenError /
    // TokenExpiredError branches, and auth.middleware.ts's 401 for missing header.
    if (status === 401 && !isOnAuthPage()) {
      clearAuthStorage();
      window.location.href = "/login";
    }

    return Promise.reject(normalized);
  }
);
