import { z } from "zod";

export const loginFormSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .max(10, "Username must be 10 characters or less")
    .regex(/^[a-zA-Z0-9]+$/, "Username must be alphanumeric"),
  password: z
    .string()
    .min(1, "Password is required")
    .max(10, "Password must be 10 characters or less")
    .regex(/^[a-zA-Z0-9]+$/, "Password must be alphanumeric"),
});

export type LoginFormData = z.infer<typeof loginFormSchema>;
