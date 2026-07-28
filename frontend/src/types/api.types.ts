/**
 * Generic wrapper types matching the backend's response envelope exactly.
 *
 * Success shape (from controllers, e.g. auth.controller.ts / tradeAnalysis.controller.ts):
 *   { success: true, message?: string, data: T }
 *
 * Error shape (from middleware/errorHandler.ts):
 *   { success: false, message: string, errors?: { field: string; message: string }[] }
 */

export interface ApiSuccess<T> {
  success: true;
  message?: string;
  data: T;
}

export interface ApiFieldError {
  field: string;
  message: string;
}

export interface ApiErrorPayload {
  success: false;
  message: string;
  errors?: ApiFieldError[];
}

/**
 * Normalized shape used throughout the frontend once an Axios error
 * has been unwrapped by the API client's interceptor.
 */
export interface NormalizedApiError {
  message: string;
  status?: number;
  fieldErrors?: ApiFieldError[];
}
