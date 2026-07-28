/**
 * Matches src/utils/validators/auth.validator.ts -> registerSchema.body
 * name: string min(2), email: string email(), password: string min(6)
 */
export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

/**
 * Matches src/utils/validators/auth.validator.ts -> loginSchema.body
 */
export interface LoginRequest {
  email: string;
  password: string;
}

/**
 * Matches the `user` object returned by src/services/auth.service.ts
 * (registerUser / loginUser) — password is intentionally never included.
 */
export interface AuthUser {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

/**
 * Matches the `data` field of the response from POST /register and POST /login
 * (see auth.controller.ts -> register / login)
 */
export interface AuthResponseData {
  user: AuthUser;
  token: string;
}
