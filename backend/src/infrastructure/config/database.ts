/**
 * Database Configuration
 * Database-specific configuration
 */

import { getConfig } from './index';

export function getDatabaseConfig() {
  const config = getConfig();
  return config.database;
}



