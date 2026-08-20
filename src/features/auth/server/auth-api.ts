import "server-only";

import { normalizeApiBaseUrl } from "@/lib/api/base-url";
import { getServerEnv } from "@/lib/env/server-env";

import {
  accessTokenSchema,
  authUserSchema,
  tokenPairSchema,
  type AuthUser,
  type LoginFormValues,
  type TokenPair,
} from "../schemas";

type BackendRequest = {
  method: "GET" | "POST";
  body?: unknown;
  accessToken?: string;
};

export class BackendApiError extends Error {
  constructor(public readonly status: number) {
    super(`Backend API responded with status ${status}`);
    this.name = "BackendApiError";
  }
}

function backendUrl(path: string): URL {
  const { apiUrl } = getServerEnv();
  return new URL(path, normalizeApiBaseUrl(apiUrl));
}

async function requestBackendJson(path: string, request: BackendRequest): Promise<unknown> {
  const headers = new Headers({
    Accept: "application/json",
  });

  if (request.body !== undefined) {
    headers.set("Content-Type", "application/json");
  }
  if (request.accessToken) {
    headers.set("Authorization", `Bearer ${request.accessToken}`);
  }

  const response = await fetch(backendUrl(path), {
    method: request.method,
    headers,
    body: request.body === undefined ? undefined : JSON.stringify(request.body),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new BackendApiError(response.status);
  }

  return response.json();
}

export async function issueToken(credentials: LoginFormValues): Promise<TokenPair> {
  const payload = await requestBackendJson("auth/token", {
    method: "POST",
    body: credentials,
  });

  return tokenPairSchema.parse(payload);
}

export async function getCurrentUser(accessToken: string): Promise<AuthUser> {
  const payload = await requestBackendJson("me", {
    method: "GET",
    accessToken,
  });

  return authUserSchema.parse(payload);
}

export async function refreshAccessToken(refreshToken: string): Promise<string> {
  const payload = await requestBackendJson("auth/refresh", {
    method: "POST",
    body: { refresh: refreshToken },
  });

  return accessTokenSchema.parse(payload).access;
}
