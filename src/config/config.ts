import dotenv from 'dotenv';
import { z } from 'zod';

const envFile = process.env.NODE_ENV === 'production' ? '.env.prod' : '.env.dev';
dotenv.config({ path: envFile });

const configSchema = z.object({
  PORT: z.string().transform(Number),
  DB_HOST: z.string(),
  DB_USER: z.string(),
  DB_PASS: z.string(),
});

const parsedConfig = configSchema.safeParse(process.env);

if (!parsedConfig.success) {
  console.error('Invalid environment variables:', parsedConfig.error.format());
  process.exit(1);
}

const config = parsedConfig.data;

export default config;
