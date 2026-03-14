/**
 * Pooling Store
 * State management for pooling agreements
 */

import { PoolingAgreement } from '../../domain/models/PoolingAgreement';

export interface PoolingStore {
  agreements: PoolingAgreement[];
  selectedAgreement: PoolingAgreement | null;
  loading: boolean;
  error: string | null;
  setAgreements: (agreements: PoolingAgreement[]) => void;
  setSelectedAgreement: (agreement: PoolingAgreement | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  addAgreement: (agreement: PoolingAgreement) => void;
  updateAgreement: (agreement: PoolingAgreement) => void;
  removeAgreement: (agreementId: string) => void;
  clearError: () => void;
}

// TODO: Implement with Zustand or Redux



