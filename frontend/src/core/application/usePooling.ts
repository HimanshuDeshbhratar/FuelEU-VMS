/**
 * usePooling Hook
 * Custom hook for pooling operations
 */

import { useState } from 'react';
import apiClient from '../../adapters/infrastructure/api/apiClient';

export interface AdjustedCB {
  shipId: string;
  year: number;
  adjustedCB: number;
}

export interface Pool {
  poolId?: number;
  year: number;
  members: PoolMember[];
}

export interface PoolMember {
  shipId: string;
  cbBefore: number;
  cbAfter: number;
}

export function usePooling() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAdjustedCB = async (year: number): Promise<AdjustedCB[]> => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get('/compliance/adjusted-cb', {
        params: { year },
      });
      return response.data;
    } catch (err: any) {
      const errorMsg = err.error || 'Failed to fetch adjusted compliance balances';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const createPool = async (year: number, shipIds: string[]): Promise<Pool> => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.post('/pools', { year, shipIds });
      return response.data;
    } catch (err: any) {
      const errorMsg = err.error || 'Failed to create pool';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    getAdjustedCB,
    createPool,
  };
}

