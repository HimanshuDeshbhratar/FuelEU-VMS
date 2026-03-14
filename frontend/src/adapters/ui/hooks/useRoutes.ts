/**
 * useRoutes Hook
 * Custom React hook for route operations
 */

import { useState, useEffect } from 'react';
import { Route, CreateRouteRequest } from '../../../core/domain/models/Route';
import { LoadRoutes } from '../../../core/application/use-cases/routes/LoadRoutes';
import { CreateRoute } from '../../../core/application/use-cases/routes/CreateRoute';
import { UpdateRoute } from '../../../core/application/use-cases/routes/UpdateRoute';

export function useRoutes() {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // TODO: Initialize use cases with proper dependencies
  const loadRoutes = new LoadRoutes({} as any);
  const createRoute = new CreateRoute({} as any);
  const updateRoute = new UpdateRoute({} as any);

  useEffect(() => {
    loadRoutesData();
  }, []);

  const loadRoutesData = async () => {
    setLoading(true);
    try {
      const data = await loadRoutes.execute();
      setRoutes(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load routes');
    } finally {
      setLoading(false);
    }
  };

  const createRouteHandler = async (request: CreateRouteRequest) => {
    setLoading(true);
    try {
      const newRoute = await createRoute.execute(request);
      setRoutes([...routes, newRoute]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create route');
    } finally {
      setLoading(false);
    }
  };

  const updateRouteHandler = async (routeId: string, request: any) => {
    setLoading(true);
    try {
      const updatedRoute = await updateRoute.execute(routeId, request);
      setRoutes(routes.map((r) => (r.id === routeId ? updatedRoute : r)));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update route');
    } finally {
      setLoading(false);
    }
  };

  const deleteRoute = async (routeId: string) => {
    setLoading(true);
    try {
      // TODO: Implement delete route use case
      setRoutes(routes.filter((r) => r.id !== routeId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete route');
    } finally {
      setLoading(false);
    }
  };

  return {
    routes,
    loading,
    error,
    createRoute: createRouteHandler,
    updateRoute: updateRouteHandler,
    deleteRoute,
    refreshRoutes: loadRoutesData,
  };
}



