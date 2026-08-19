import ky, { type KyInstance } from "ky";

import { getPublicEnv } from "@/lib/env/public-env";

import { normalizeApiBaseUrl } from "./base-url";

function createApiClient(): KyInstance {
  const { NEXT_PUBLIC_API_URL } = getPublicEnv();

  return ky.create({
    baseUrl: normalizeApiBaseUrl(NEXT_PUBLIC_API_URL),
    timeout: 30_000,
    retry: {
      limit: 2,
      methods: ["get", "put", "head", "delete", "options", "trace"],
      statusCodes: [408, 413, 429, 500, 502, 503, 504],
    },
    hooks: {
      beforeRequest: [
        ({ request }) => {
          request.headers.set("Accept", "application/json");
        },
      ],
    },
  });
}

let cachedClient: KyInstance | undefined;

/**
 * Browser and client-component HTTP client.
 * Uses NEXT_PUBLIC_API_URL — reachable from the user's machine, not Docker internal DNS.
 */
export function getApiClient(): KyInstance {
  cachedClient ??= createApiClient();
  return cachedClient;
}

/** Lazy singleton — use for client-side API calls (`apiClient.get(...)`, etc.). */
export const apiClient = new Proxy({} as KyInstance, {
  get(_target, prop) {
    const client = getApiClient();
    const value = client[prop as keyof KyInstance];
    return typeof value === "function" ? value.bind(client) : value;
  },
});

export type ApiClient = KyInstance;
