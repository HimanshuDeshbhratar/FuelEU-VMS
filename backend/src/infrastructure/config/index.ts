/**
 * Environment Configuration
 * Main configuration file
 */

export interface Config {
  server: {
    port: number;
    env: string;
  };
  database: {
    host: string;
    port: number;
    name: string;
    user: string;
    password: string;
  };
  email: {
    host: string;
    port: number;
    user: string;
    password: string;
  };
}

let config: Config | null = null;

export function getConfig(): Config {
  if (config) {
    return config;
  }

  config = {
    server: {
      port: parseInt(process.env.PORT || '3000', 10),
      env: process.env.NODE_ENV || 'development',
    },
    database: {
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      name: process.env.DB_NAME || 'fuel_eu',
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
    },
    email: {
      host: process.env.EMAIL_HOST || 'localhost',
      port: parseInt(process.env.EMAIL_PORT || '587', 10),
      user: process.env.EMAIL_USER || '',
      password: process.env.EMAIL_PASSWORD || '',
    },
  };

  return config;
}



