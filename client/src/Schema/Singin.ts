import { z } from "zod";

const SinginSchema = z.object({
  Email: z.string().email({ message: "Email is required" }),
  Password: z
    .string()
    .min(8, { message: "Password atleast 8 char" })
    .max(256, { message: "Password 256 must be at most 255 characters long " }),
});

export default SinginSchema;
