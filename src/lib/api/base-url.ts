export function normalizeApiBaseUrl(value: string): string {
  const url = new URL(value);

  if (!url.pathname.endsWith("/")) {
    url.pathname = `${url.pathname}/`;
  }

  return url.toString();
}
