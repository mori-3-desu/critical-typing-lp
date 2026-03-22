import { z } from "zod";

const envSchema = z.object({
  GOOGLE_FORM_URL: z.string().url("Invalid Google Form URL"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error(" Environment variable error:", parsed.error.format());
  throw new Error("Missing or invalid environment variables");
}

export const env = parsed.data;
