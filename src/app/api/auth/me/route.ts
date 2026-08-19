import { HTTPError } from "ky";

import { accessTokenSchema, authUserSchema } from "@/features/auth/schemas";
import {
  clearSessionCookies,
  getSessionTokens,
  setAccessTokenCookie,
} from "@/features/auth/server/session-cookies";
import { createServerApiClient } from "@/lib/api";

const NO_STORE_HEADERS = {
  "Cache-Control": "no-store",
};

function errorResponse(message: string, status: number): Response {
  return Response.json({ message }, { status, headers: NO_STORE_HEADERS });
}

async function getCurrentUser(accessToken: string) {
  const payload: unknown = await createServerApiClient(accessToken).get("me").json();
  return authUserSchema.parse(payload);
}

function isUnauthorized(error: unknown): boolean {
  return error instanceof HTTPError && (error.response.status === 400 || error.response.status === 401);
}

function safeErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "Unknown session error";
}

export async function GET(): Promise<Response> {
  const { accessToken, refreshToken } = await getSessionTokens();

  if (accessToken) {
    try {
      const user = await getCurrentUser(accessToken);
      return Response.json({ user }, { headers: NO_STORE_HEADERS });
    } catch (error) {
      if (!isUnauthorized(error)) {
        console.error("Session lookup failed:", safeErrorMessage(error));
        return errorResponse("سرویس حساب کاربری در دسترس نیست.", 502);
      }
    }
  }

  if (!refreshToken) {
    await clearSessionCookies();
    return errorResponse("نشست شما منقضی شده است. دوباره وارد شوید.", 401);
  }

  try {
    const refreshPayload: unknown = await createServerApiClient()
      .post("auth/refresh", { json: { refresh: refreshToken } })
      .json();
    const { access } = accessTokenSchema.parse(refreshPayload);
    const user = await getCurrentUser(access);

    await setAccessTokenCookie(access);

    return Response.json({ user }, { headers: NO_STORE_HEADERS });
  } catch (error) {
    if (isUnauthorized(error)) {
      await clearSessionCookies();
      return errorResponse("نشست شما منقضی شده است. دوباره وارد شوید.", 401);
    }

    console.error("Session refresh failed:", safeErrorMessage(error));
    return errorResponse("سرویس حساب کاربری در دسترس نیست.", 502);
  }
}
