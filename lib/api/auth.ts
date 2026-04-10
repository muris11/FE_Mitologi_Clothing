import { ENDPOINTS } from "./endpoints";
import { ApiError, apiFetch, resolveBackendBaseUrl } from "./index";
import { User } from "./types";

/** Standard authentication response shape from /auth/login and /auth/register */
export interface AuthResponse {
  token: string;
  user: User;
  cartId?: string;
}

function getBackendBaseUrl(): string {
  return resolveBackendBaseUrl();
}

export async function ensureSanctumCsrfCookie(): Promise<void> {
  const backendUrl = getBackendBaseUrl();
  const res = await fetch(`${backendUrl}/sanctum/csrf-cookie`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    throw new ApiError(
      `Gagal mengambil CSRF cookie (${res.status}).`,
      res.status,
    );
  }
}

/**
 * Login with email and password via Sanctum cookie auth.
 * Performs CSRF pre-flight before sending credentials.
 */
export async function login(
  email: string,
  password: string,
  cartId?: string,
): Promise<AuthResponse> {
  await ensureSanctumCsrfCookie();

  const response = await apiFetch<AuthResponse>(ENDPOINTS.AUTH_LOGIN, {
    method: "POST",
    body: JSON.stringify({ email, password, cart_session_id: cartId }),
  });

  return response;
}

/**
 * Register a new user via Sanctum cookie auth.
 * Performs CSRF pre-flight before sending credentials.
 */
export async function register(
  name: string,
  email: string,
  password: string,
  passwordConfirmation: string,
  cartId?: string,
): Promise<AuthResponse> {
  await ensureSanctumCsrfCookie();

  const response = await apiFetch<AuthResponse>(ENDPOINTS.AUTH_REGISTER, {
    method: "POST",
    body: JSON.stringify({
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
      cart_session_id: cartId,
    }),
  });

  return response;
}

/** Logout the current session */
export async function logout(): Promise<void> {
  return apiFetch<void>(ENDPOINTS.AUTH_LOGOUT, { method: "POST" });
}

/** Request a password reset link via email */
export async function forgotPassword(
  email: string,
): Promise<{ message: string }> {
  return apiFetch<{ message: string }>(ENDPOINTS.AUTH_FORGOT_PASSWORD, {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

/** Reset password using a token from the email link */
export async function resetPassword(
  token: string,
  email: string,
  password: string,
  passwordConfirmation: string,
): Promise<{ message: string }> {
  return apiFetch<{ message: string }>(ENDPOINTS.AUTH_RESET_PASSWORD, {
    method: "POST",
    body: JSON.stringify({
      token,
      email,
      password,
      password_confirmation: passwordConfirmation,
    }),
  });
}
