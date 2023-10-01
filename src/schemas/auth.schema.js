import { z } from "zod";

export const signupSchema = z.object({
  username: z
    .string({
      required_error: "Username is required",
    })
    .min(3, {
      message: "Username must be at least 3 characters long",
    })
    .max(255),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email()
    .min(6, {
      message: "Email must be at least 6 characters long",
    })
    .max(255),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, {
      message: "Password must be at least 6 characters long",
    })
    .max(255),
});

export const signinSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email(),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, {
      message: "Password must be at least 6 characters long",
    })
    .max(255),
});
