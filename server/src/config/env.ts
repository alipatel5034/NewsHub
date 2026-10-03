import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.string().transform(Number).default("5000"),
  CLIENT_ORIGIN: z.string().default("http://localhost:5173"),
  GNEWS_API_KEY: z.string().default("YOUR_GNEWS_API_KEY_HERE"),
  GNEWS_BASE_URL: z.string().default("https://gnews.io/api/v4"),
  REQUEST_TIMEOUT_MS: z.string().transform(Number).default("10000"),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("❌ Invalid environment variables:", parsedEnv.error.format());
  process.exit(1);
}

export const env = parsedEnv.data;

export const isApiKeyConfigured = (): boolean => {
  return (
    !!env.GNEWS_API_KEY &&
    env.GNEWS_API_KEY !== "YOUR_GNEWS_API_KEY_HERE" &&
    env.GNEWS_API_KEY !== "replace_with_your_real_key" &&
    env.GNEWS_API_KEY.trim() !== ""
  );
};
