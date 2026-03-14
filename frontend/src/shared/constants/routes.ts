/**
 * Route Paths
 * Application route constants
 */

export const APP_ROUTES = {
  DASHBOARD: '/dashboard',
  ROUTES: '/routes',
  COMPLIANCE: '/compliance',
  BANKING: '/banking',
  POOLING: '/pooling',
} as const;

export type AppRoute = typeof APP_ROUTES[keyof typeof APP_ROUTES];



