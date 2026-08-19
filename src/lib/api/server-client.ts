import "server-only";

import ky from "ky";

import { getServerEnv } from "@/lib/env/server-env";

import { normalizeApiBaseUrl } from "./base-url";

/**
 * Server-side HTTP client for RSC, route handlers, and Auth.js.
 * Uses API_URL inside Docker (e.g. http://backend:8000/api/v1).
 */
export function createServerApiClient(accessToken?: string) {
  const { apiUrl } = getServerEnv();

  return ky.create({
    baseUrl: normalizeApiBaseUrl(apiUrl),
    timeout: 30_000,
    headers: {
      Accept: "application/json",
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
  });
}

export type ServerApiClient = ReturnType<typeof createServerApiClient>;
