import {
  authErrorResponseSchema,
  authSuccessResponseSchema,
  type AuthUser,
  type LoginFormValues,
} from "./schemas";

const FALLBACK_LOGIN_ERROR = "ورود انجام نشد. لطفاً دوباره تلاش کنید.";

export async function login(values: LoginFormValues): Promise<AuthUser> {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
    cache: "no-store",
    credentials: "same-origin",
  });

  const payload: unknown = await response.json().catch(() => null);

  if (!response.ok) {
    const errorPayload = authErrorResponseSchema.safeParse(payload);
    throw new Error(errorPayload.success ? errorPayload.data.message : FALLBACK_LOGIN_ERROR);
  }

  const loginPayload = authSuccessResponseSchema.safeParse(payload);
  if (!loginPayload.success) {
    throw new Error(FALLBACK_LOGIN_ERROR);
  }

  return loginPayload.data.user;
}
