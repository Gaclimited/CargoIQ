import { apiClient } from "./client";
import type { ApiSuccess } from "../types/api.types";
import type {
  RegisterRequest,
  LoginRequest,
  AuthResponseData,
} from "../types/auth.types";

/**
 * POST /register
 * (src/routes/auth.routes.ts -> router.post("/register", validate(registerSchema), register))
 */
export async function registerRequest(
  body: RegisterRequest
): Promise<AuthResponseData> {
  const res = await apiClient.post<ApiSuccess<AuthResponseData>>(
    "/register",
    body
  );
  return res.data.data;
}

/**
 * POST /login
 * (src/routes/auth.routes.ts -> router.post("/login", validate(loginSchema), login))
 */
export async function loginRequest(
  body: LoginRequest
): Promise<AuthResponseData> {
  const res = await apiClient.post<ApiSuccess<AuthResponseData>>(
    "/login",
    body
  );
  return res.data.data;
}
