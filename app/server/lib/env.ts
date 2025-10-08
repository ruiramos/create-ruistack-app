import { z } from "zod";
import "dotenv/config";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string().optional(),
  LOG_LEVEL: z.enum(["error", "warn", "info", "debug"]).default("info"),
});
const envResult = envSchema.safeParse(process.env);

if (envResult.error) {
  console.error("Error parsing environment variables: ", envResult.error);
  throw new Error(`Error parsing environment variables`);
}

export default envResult.data;
