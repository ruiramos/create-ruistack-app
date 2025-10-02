import { z } from "zod";
import "dotenv/config";

const envSchema = z.object({
  NODE_ENV: z.string(),
  LOLS: z.string(),
});

const envResult = envSchema.safeParse(process.env);

if (envResult.error) {
  console.error("Error parsing environment variables: ", envResult.error);
  throw new Error(`Error parsing environment variables`);
}

export default envResult.data;
