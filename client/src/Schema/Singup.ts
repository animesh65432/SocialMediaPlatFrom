import { z } from "zod";

const SignupSchema = z
  .object({
    Name: z
      .string()
      .min(8, { message: "Name must be at least 8 characters long" })
      .max(256, { message: "Name must be at most 256 characters long" }),

    Password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(256, { message: "Password must be at most 256 characters long" }),

    Email: z.string().email({ message: "It must be a valid email" }),

    ConfirmPassword: z
      .string()
      .min(8, {
        message: "Confirm Password must be at least 8 characters long",
      })
      .max(256, {
        message: "Confirm Password must be at most 256 characters long",
      }),
  })
  .refine((data) => data.Password === data.ConfirmPassword, {
    message: "Passwords do not match",
    path: ["ConfirmPassword"],
  });

export default SignupSchema;
