import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().trim().min(1, "نام کاربری الزامی است"),
  password: z.string().min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const authUserSchema = z.object({
  id: z.number().int().positive(),
  username: z.string(),
  email: z.string(),
  mobile: z.string().nullable(),
  is_mfa_enabled: z.boolean(),
});

export type AuthUser = z.infer<typeof authUserSchema>;

export const tokenPairSchema = z.object({
  access: z.string().min(1),
  refresh: z.string().min(1),
});

export type TokenPair = z.infer<typeof tokenPairSchema>;

export const accessTokenSchema = z.object({
  access: z.string().min(1),
});

export const authSuccessResponseSchema = z.object({
  user: authUserSchema,
});

export type AuthSuccessResponse = z.infer<typeof authSuccessResponseSchema>;

export const authErrorResponseSchema = z.object({
  message: z.string().min(1),
});
