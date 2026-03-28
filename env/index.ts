import { z } from "zod";

const envSchema = z.object({
  GOOGLE_FORM_URL: z.string().url("Invalid Google Form URL"),
  GAME_URL: z.string().url("Invalid Game URL"),
  SITE_URL: z.string().url("Invalid Site URL"),
});

export const env = envSchema.parse({
  GOOGLE_FORM_URL: process.env.NEXT_PUBLIC_GOOGLE_FORM_URL,
  GAME_URL: process.env.NEXT_PUBLIC_GAME_URL,
  SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
});

