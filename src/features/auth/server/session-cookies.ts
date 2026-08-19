import "server-only";

import { cookies } from "next/headers";

import { getServerEnv } from "@/lib/env/server-env";

import type { TokenPair } from "../schemas";

const ACCESS_TOKEN_COOKIE = "darafin_access_token";
const REFRESH_TOKEN_COOKIE = "darafin_refresh_token";
const ACCESS_TOKEN_FALLBACK_MAX_AGE = 10 * 60;
const REFRESH_TOKEN_FALLBACK_MAX_AGE = 24 * 60 * 60;

type JwtPayload = {
  exp?: unknown;
};

function shouldUseSecureCookies(): boolean {
  const { AUTH_URL } = getServerEnv();
  return AUTH_URL ? new URL(AUTH_URL).protocol === "https:" : false;
}

function tokenMaxAge(token: string, fallback: number): number {
  try {
    const encodedPayload = token.split(".")[1];
    if (!encodedPayload) {
      return fallback;
    }

    const payload = JSON.parse(Buffer.from(encodedPayload, "base64url").toString("utf8")) as JwtPayload;
    if (typeof payload.exp !== "number") {
      return fallback;
    }

    return Math.max(0, payload.exp - Math.floor(Date.now() / 1000));
  } catch {
    return fallback;
  }
}

function cookieOptions(maxAge: number, path: string) {
  return {
    httpOnly: true,
    secure: shouldUseSecureCookies(),
    sameSite: "lax" as const,
    priority: "high" as const,
    path,
    maxAge,
  };
}

export async function setSessionCookies(tokens: TokenPair): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.set(
    ACCESS_TOKEN_COOKIE,
    tokens.access,
    cookieOptions(tokenMaxAge(tokens.access, ACCESS_TOKEN_FALLBACK_MAX_AGE), "/"),
  );
  cookieStore.set(
    REFRESH_TOKEN_COOKIE,
    tokens.refresh,
    cookieOptions(tokenMaxAge(tokens.refresh, REFRESH_TOKEN_FALLBACK_MAX_AGE), "/api/auth"),
  );
}

export async function setAccessTokenCookie(accessToken: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(
    ACCESS_TOKEN_COOKIE,
    accessToken,
    cookieOptions(tokenMaxAge(accessToken, ACCESS_TOKEN_FALLBACK_MAX_AGE), "/"),
  );
}

export async function getSessionTokens(): Promise<{
  accessToken?: string;
  refreshToken?: string;
}> {
  const cookieStore = await cookies();

  return {
    accessToken: cookieStore.get(ACCESS_TOKEN_COOKIE)?.value,
    refreshToken: cookieStore.get(REFRESH_TOKEN_COOKIE)?.value,
  };
}

export async function clearSessionCookies(): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.set(ACCESS_TOKEN_COOKIE, "", cookieOptions(0, "/"));
  cookieStore.set(REFRESH_TOKEN_COOKIE, "", cookieOptions(0, "/api/auth"));
}
