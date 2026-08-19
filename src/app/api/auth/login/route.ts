import { HTTPError } from "ky";

import {
  authUserSchema,
  loginSchema,
  tokenPairSchema,
} from "@/features/auth/schemas";
import { setSessionCookies } from "@/features/auth/server/session-cookies";
import { createServerApiClient } from "@/lib/api";

const NO_STORE_HEADERS = {
  "Cache-Control": "no-store",
};

function errorResponse(message: string, status: number): Response {
  return Response.json({ message }, { status, headers: NO_STORE_HEADERS });
}

function safeErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "Unknown authentication error";
}

export async function POST(request: Request): Promise<Response> {
  const body: unknown = await request.json().catch(() => null);
  const credentials = loginSchema.safeParse(body);

  if (!credentials.success) {
    return errorResponse("اطلاعات ورود معتبر نیست.", 400);
  }

  let tokens;
  try {
    const tokenPayload: unknown = await createServerApiClient()
      .post("auth/token", { json: credentials.data })
      .json();
    tokens = tokenPairSchema.parse(tokenPayload);
  } catch (error) {
    if (error instanceof HTTPError) {
      if (error.response.status === 400 || error.response.status === 401) {
        return errorResponse("نام کاربری یا رمز عبور نادرست است.", 401);
      }
      if (error.response.status === 429) {
        return errorResponse("تعداد تلاش‌ها بیش از حد مجاز است. کمی بعد دوباره تلاش کنید.", 429);
      }
    }

    console.error("Authentication token request failed:", safeErrorMessage(error));
    return errorResponse("سرویس احراز هویت در دسترس نیست. کمی بعد دوباره تلاش کنید.", 502);
  }

  try {
    const userPayload: unknown = await createServerApiClient(tokens.access).get("me").json();
    const user = authUserSchema.parse(userPayload);

    await setSessionCookies(tokens);

    return Response.json({ user }, { headers: NO_STORE_HEADERS });
  } catch (error) {
    console.error("Authenticated user request failed:", safeErrorMessage(error));
    return errorResponse("دریافت اطلاعات حساب کاربری انجام نشد.", 502);
  }
}
