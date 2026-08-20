import { loginSchema } from "@/features/auth/schemas";
import {
  BackendApiError,
  getCurrentUser,
  issueToken,
} from "@/features/auth/server/auth-api";
import { setSessionCookies } from "@/features/auth/server/session-cookies";

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
    tokens = await issueToken(credentials.data);
  } catch (error) {
    if (error instanceof BackendApiError) {
      if (error.status === 400 || error.status === 401) {
        return errorResponse("نام کاربری یا رمز عبور نادرست است.", 401);
      }
      if (error.status === 429) {
        return errorResponse("تعداد تلاش‌ها بیش از حد مجاز است. کمی بعد دوباره تلاش کنید.", 429);
      }
    }

    console.error("Authentication token request failed:", safeErrorMessage(error));
    return errorResponse("سرویس احراز هویت در دسترس نیست. کمی بعد دوباره تلاش کنید.", 502);
  }

  try {
    const user = await getCurrentUser(tokens.access);

    await setSessionCookies(tokens);

    return Response.json({ user }, { headers: NO_STORE_HEADERS });
  } catch (error) {
    console.error("Authenticated user request failed:", safeErrorMessage(error));
    return errorResponse("دریافت اطلاعات حساب کاربری انجام نشد.", 502);
  }
}
