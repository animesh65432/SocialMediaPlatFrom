import { z } from "zod";

const SinginSchema = z.object({
  Email: z
    .string()
    .email({ message: "Invalid email format" })
    .transform((val) => (val === "" ? "test@gmail.com" : val))
    .default("test@gmail.com"),
  Password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(256, { message: "Password must be at most 255 characters long" })
    .transform((val) => (val === "" ? "testPassword" : val))
    .default("testPassword"),
});


export default SinginSchema;
