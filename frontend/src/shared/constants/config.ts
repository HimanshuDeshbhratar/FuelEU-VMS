/**
 * Configuration Constants
 * Application configuration
 */

export function getApiBaseUrl(): string {
  return process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000';
}

export function getAppName(): string {
  return process.env.REACT_APP_NAME || 'Fuel EU Compliance';
}

export function getAppVersion(): string {
  return process.env.REACT_APP_VERSION || '1.0.0';
}

export const CONFIG = {
  API_BASE_URL: getApiBaseUrl(),
  APP_NAME: getAppName(),
  APP_VERSION: getAppVersion(),
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
} as const;



