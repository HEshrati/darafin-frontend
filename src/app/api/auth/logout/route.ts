import { clearSessionCookies } from "@/features/auth/server/session-cookies";

export async function POST(): Promise<Response> {
  await clearSessionCookies();

  return new Response(null, {
    status: 204,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}
