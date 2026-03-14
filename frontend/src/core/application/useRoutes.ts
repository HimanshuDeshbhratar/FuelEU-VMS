/**
 * useRoutes Hook
 * Custom hook for route operations
 */

import { useState, useEffect } from 'react';
import apiClient from '../../adapters/infrastructure/api/apiClient';

export interface Route {
  id?: number;
  routeId: string;
  shipId: string;
  vesselType: string;
  fuelType: string;
  year: number;
  ghgIntensity: number;
  fuelConsumption: number;
  distance: number;
  totalEmissions: number;
  isBaseline: boolean;
}

export interface RouteFilters {
  vesselType?: string;
  fuelType?: string;
  year?: number;
}

export function useRoutes() {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRoutes = async (filters?: RouteFilters) => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (filters?.vesselType) params.append('vesselType', filters.vesselType);
      if (filters?.fuelType) params.append('fuelType', filters.fuelType);
      if (filters?.year) params.append('year', filters.year.toString());

      const response = await apiClient.get('/routes', { params });
      setRoutes(response.data);
    } catch (err: any) {
      setError(err.error || 'Failed to fetch routes');
    } finally {
      setLoading(false);
    }
  };

  const setBaseline = async (routeId: string) => {
    setLoading(true);
    setError(null);
    try {
      await apiClient.post(`/routes/${routeId}/baseline`);
      await fetchRoutes(); // Refresh routes
    } catch (err: any) {
      setError(err.error || 'Failed to set baseline route');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoutes();
  }, []);

  return {
    routes,
    loading,
    error,
    fetchRoutes,
    setBaseline,
  };
}

