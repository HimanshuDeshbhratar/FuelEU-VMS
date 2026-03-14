/**
 * Banking Store
 * State management for banking data
 */

import { BankingAccount } from '../../domain/models/BankingAccount';

export interface BankingStore {
  bankingAccount: BankingAccount | null;
  balance: number;
  loading: boolean;
  error: string | null;
  setBankingAccount: (account: BankingAccount) => void;
  setBalance: (balance: number) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

// TODO: Implement with Zustand or Redux



