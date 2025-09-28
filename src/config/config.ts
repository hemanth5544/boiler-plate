import dotenv from 'dotenv';
import { z } from 'zod';

const envFile = process.env.NODE_ENV === 'production' ? '.env.prod' : '.env.dev';
dotenv.config({ path: envFile });

const configSchema = z.object({


  SERVER_PORT: z.string().transform((val) => parseInt(val, 10)).default('8080'),
  SERVER_READ_TIMEOUT: z.string().transform((val) => parseInt(val, 10)).default('30'),
  SERVER_WRITE_TIMEOUT: z.string().transform((val) => parseInt(val, 10)).default('30'),
  SERVER_IDLE_TIMEOUT: z.string().transform((val) => parseInt(val, 10)).default('60'),
  SERVER_CORS_ALLOWED_ORIGINS: z.string().default('http://localhost:3000'),

  DATABASE_HOST: z.string().default('localhost'),
  DATABASE_PORT: z.string().transform((val) => parseInt(val, 10)).default('5432'),
  DATABASE_USER: z.string().default('postgres'),
  DATABASE_PASSWORD: z.string().default(''),
  DATABASE_NAME: z.string().default('tasker'),
  DATABASE_SSL_MODE: z.string().default('disable'),
  DATABASE_MAX_OPEN_CONNS: z.string().transform((val) => parseInt(val, 10)).default('25'),
  DATABASE_MAX_IDLE_CONNS: z.string().transform((val) => parseInt(val, 10)).default('25'),
  DATABASE_CONN_MAX_LIFETIME: z.string().transform((val) => parseInt(val, 10)).default('300'),
  DATABASE_CONN_MAX_IDLE_TIME: z.string().transform((val) => parseInt(val, 10)).default('300'),

  AUTH_SECRET_KEY: z.string().default('secret'),

  INTEGRATION_RESEND_API_KEY: z.string().default('resend_key'),

  REDIS_ADDRESS: z.string().default('redis://localhost:6379'),
  REDIS_PASSWORD: z.string().optional(),

  AWS_REGION: z.string().default('apac'),
  AWS_ACCESS_KEY_ID: z.string().default(''),
  AWS_SECRET_ACCESS_KEY: z.string().default(''),
  AWS_UPLOAD_BUCKET: z.string().default('tasker-bucket'),
  AWS_ENDPOINT_URL: z.string().default(''),

  OBSERVABILITY_SERVICE_NAME: z.string().default('tasker'),
  OBSERVABILITY_ENVIRONMENT: z.string().default('development'),

  OBSERVABILITY_LOGGING_LEVEL: z.string().default('debug'),
  OBSERVABILITY_LOGGING_FORMAT: z.string().default('console'),
  OBSERVABILITY_LOGGING_SLOW_QUERY_THRESHOLD: z.string().default('100ms'),

  OBSERVABILITY_NEW_RELIC_LICENSE_KEY: z.string().default('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'),
  OBSERVABILITY_NEW_RELIC_APP_LOG_FORWARDING_ENABLED: z.string().default('true'),
  OBSERVABILITY_NEW_RELIC_DISTRIBUTED_TRACING_ENABLED: z.string().default('true'),
  OBSERVABILITY_NEW_RELIC_DEBUG_LOGGING: z.string().default('false'),

  OBSERVABILITY_HEALTH_CHECKS_ENABLED: z.string().default('true'),
  OBSERVABILITY_HEALTH_CHECKS_INTERVAL: z.string().default('30s'),
  OBSERVABILITY_HEALTH_CHECKS_TIMEOUT: z.string().default('5s'),
  OBSERVABILITY_HEALTH_CHECKS_CHECKS: z.string().default('database,redis'),
});

const parsedConfig = configSchema.safeParse(process.env);

if (!parsedConfig.success) {
  console.error('Invalid environment variables:', parsedConfig.error.format());
  process.exit(1);
}

const config = parsedConfig.data;

export default config;
