import dotenv from 'dotenv';

dotenv.config(); // load .env file if exists

export interface PrimaryConfig {
  env: string;
}

export interface ServerConfig {
  port: string;
  readTimeout: number;
  writeTimeout: number;
  idleTimeout: number;
  corsAllowedOrigins: string[];
}

export interface DatabaseConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  name: string;
  sslMode: string;
  maxOpenConns: number;
  maxIdleConns: number;
  connMaxLifetime: number;
  connMaxIdleTime: number;
}

export interface RedisConfig {
  address: string;
}

export interface AuthConfig {
  secretKey: string;
}

export interface IntegrationConfig {
  resendApiKey: string;
}

export interface ObservabilityConfig {
  serviceName: string;
  environment: string;
  logging: {
    level: string;
    format: string;
    slowQueryThreshold: string;
  };
  newRelic: {
    licenseKey: string;
    appLogForwardingEnabled: boolean;
    distributedTracingEnabled: boolean;
    debugLogging: boolean;
  };
  healthChecks: {
    enabled: boolean;
    interval: string;
    timeout: string;
    checks: string[];
  };
}

// Full Config
export interface AppConfig {
  primary: PrimaryConfig;
  server: ServerConfig;
  database: DatabaseConfig;
  redis: RedisConfig;
  auth: AuthConfig;
  integration: IntegrationConfig;
observability: ObservabilityConfig;

}

function getEnv(key: string, fallback?: string): string {
  const val = process.env[key];
  if (val === undefined || val === '') {
    if (fallback !== undefined) return fallback;
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return val;
}

function parseBool(value: string): boolean {
  return value.toLowerCase() === 'true';
}

const config: AppConfig = {
  primary: {
    env: getEnv('PRIMARY.ENV')
  },

  server: {
    port: getEnv('SERVER.PORT'),
    readTimeout: parseInt(getEnv('SERVER.READ_TIMEOUT')),
    writeTimeout: parseInt(getEnv('SERVER.WRITE_TIMEOUT')),
    idleTimeout: parseInt(getEnv('SERVER.IDLE_TIMEOUT')),
    corsAllowedOrigins: getEnv('SERVER.CORS_ALLOWED_ORIGINS').split(',')
  },

  database: {
    host: getEnv('DATABASE.HOST'),
    port: parseInt(getEnv('DATABASE.PORT')),
    user: getEnv('DATABASE.USER'),
    password: getEnv('DATABASE.PASSWORD', ''),
    name: getEnv('DATABASE.NAME'),
    sslMode: getEnv('DATABASE.SSL_MODE'),
    maxOpenConns: parseInt(getEnv('DATABASE.MAX_OPEN_CONNS')),
    maxIdleConns: parseInt(getEnv('DATABASE.MAX_IDLE_CONNS')),
    connMaxLifetime: parseInt(getEnv('DATABASE.CONN_MAX_LIFETIME')),
    connMaxIdleTime: parseInt(getEnv('DATABASE.CONN_MAX_IDLE_TIME')),
  },

  redis: {
    address: getEnv('REDIS.ADDRESS')
  },

  auth: {
    secretKey: getEnv('AUTH.SECRET_KEY')
  },

  integration: {
    resendApiKey: getEnv('INTEGRATION.RESEND_API_KEY')
  },
   observability: {
    serviceName: getEnv('OBSERVABILITY.SERVICE_NAME', 'tasker'),
    environment: getEnv('OBSERVABILITY.ENVIRONMENT', 'development'),
    logging: {
      level: getEnv('OBSERVABILITY.LOGGING.LEVEL', 'info'),
      format: getEnv('OBSERVABILITY.LOGGING.FORMAT', 'json'),
      slowQueryThreshold: getEnv('OBSERVABILITY.LOGGING.SLOW_QUERY_THRESHOLD', '100ms')
    },
    newRelic: {
      licenseKey: getEnv('OBSERVABILITY.NEW_RELIC.LICENSE_KEY'),
      appLogForwardingEnabled: parseBool(getEnv('OBSERVABILITY.NEW_RELIC.APP_LOG_FORWARDING_ENABLED', 'false')),
      distributedTracingEnabled: parseBool(getEnv('OBSERVABILITY.NEW_RELIC.DISTRIBUTED_TRACING_ENABLED', 'false')),
      debugLogging: parseBool(getEnv('OBSERVABILITY.NEW_RELIC.DEBUG_LOGGING', 'false'))
    },
    healthChecks: {
      enabled: parseBool(getEnv('OBSERVABILITY.HEALTH_CHECKS.ENABLED', 'true')),
      interval: getEnv('OBSERVABILITY.HEALTH_CHECKS.INTERVAL', '30s'),
      timeout: getEnv('OBSERVABILITY.HEALTH_CHECKS.TIMEOUT', '5s'),
      checks: getEnv('OBSERVABILITY.HEALTH_CHECKS.CHECKS', '').split(',').map(c => c.trim())
    }
}

};

export default config;
