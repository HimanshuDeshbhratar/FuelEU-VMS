/**
 * Compliance Store
 * State management for compliance data
 */

import { ComplianceBalance } from '../../domain/models/ComplianceBalance';

export interface ComplianceStore {
  complianceData: ComplianceBalance[];
  loading: boolean;
  error: string | null;
  selectedPeriod: string | null;
  setComplianceData: (data: ComplianceBalance[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSelectedPeriod: (period: string | null) => void;
  clearError: () => void;
}

// TODO: Implement with Zustand or Redux



