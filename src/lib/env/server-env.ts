import "server-only";

import { z } from "zod";

import { getPublicEnv } from "./public-env";

const serverEnvSchema = z
  .object({
    NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
    API_URL: z.url().optional(),
    AUTH_SECRET: z.string().min(1).optional(),
    AUTH_URL: z.url().optional(),
    PORT: z.coerce.number().int().positive().default(3000),
  })
  .superRefine((env, ctx) => {
    if (env.NODE_ENV === "production" && !env.AUTH_SECRET) {
      ctx.addIssue({
        code: "custom",
        message: "AUTH_SECRET is required in production",
        path: ["AUTH_SECRET"],
      });
    }
  });

export type ServerEnv = z.infer<typeof serverEnvSchema> & {
  apiUrl: string;
};

let cachedServerEnv: ServerEnv | undefined;

/** Server-only — do not import in client components. */
export function getServerEnv(): ServerEnv {
  if (cachedServerEnv) {
    return cachedServerEnv;
  }

  const parsed = serverEnvSchema.parse({
    NODE_ENV: process.env.NODE_ENV,
    API_URL: process.env.API_URL,
    AUTH_SECRET: process.env.AUTH_SECRET,
    AUTH_URL: process.env.AUTH_URL,
    PORT: process.env.PORT,
  });

  const publicEnv = getPublicEnv();

  cachedServerEnv = {
    ...parsed,
    apiUrl: parsed.API_URL ?? publicEnv.NEXT_PUBLIC_API_URL,
    AUTH_URL: parsed.AUTH_URL ?? publicEnv.NEXT_PUBLIC_APP_URL,
  };

  return cachedServerEnv;
}
