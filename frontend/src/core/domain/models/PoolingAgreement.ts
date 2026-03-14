/**
 * Pooling Agreement Model
 * Frontend domain model for pooling agreements
 */

export interface PoolingAgreement {
  id: string;
  period: string;
  status: 'ACTIVE' | 'DISSOLVED';
  participants: PoolingParticipant[];
  totalCompliance: number;
  createdAt: Date;
  updatedAt?: Date;
}

export interface PoolingParticipant {
  id: string;
  companyId: string;
  companyName: string;
  allocationPercentage: number;
  allocatedCompliance: number;
}

export interface CreatePoolingAgreementRequest {
  period: string;
  participants: string[];
  allocationPercentages: number[];
}



