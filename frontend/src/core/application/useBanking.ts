/**
 * useBanking Hook
 * Custom hook for banking operations
 */

import { useState } from 'react';
import apiClient from '../../adapters/infrastructure/api/apiClient';

export interface ComplianceBalance {
  shipId: string;
  year: number;
  cbGco2eq: number;
}

export interface BankingBalance {
  totalBanked: number;
}

export function useBanking() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getComplianceBalance = async (shipId: string, year: number): Promise<ComplianceBalance> => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get('/compliance/cb', {
        params: { shipId, year },
      });
      return response.data;
    } catch (err: any) {
      const errorMsg = err.error || 'Failed to fetch compliance balance';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getAllComplianceBalances = async (year: number): Promise<ComplianceBalance[]> => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get('/compliance/cb', {
        params: { year },
      });
      return Array.isArray(response.data) ? response.data : [response.data];
    } catch (err: any) {
      const errorMsg = err.error || 'Failed to fetch compliance balances';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getBankingBalance = async (shipId: string, year: number): Promise<BankingBalance> => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get('/banking/balance', {
        params: { shipId, year },
      });
      return response.data;
    } catch (err: any) {
      const errorMsg = err.error || 'Failed to fetch banking balance';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const bankSurplus = async (shipId: string, year: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.post('/banking/bank', { shipId, year });
      return response.data;
    } catch (err: any) {
      const errorMsg = err.error || 'Failed to bank surplus';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const applyBanked = async (shipId: string, year: number, amount: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.post('/banking/apply', { shipId, year, amount });
      return response.data;
    } catch (err: any) {
      const errorMsg = err.error || 'Failed to apply banked amount';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    getComplianceBalance,
    getAllComplianceBalances,
    getBankingBalance,
    bankSurplus,
    applyBanked,
  };
}

