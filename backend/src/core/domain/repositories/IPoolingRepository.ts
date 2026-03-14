/**
 * Pooling Repository Interface
 * Domain repository interface for pooling
 */

import { PoolingAgreement } from '../entities/PoolingAgreement';

export interface IPoolingRepository {
  save(agreement: PoolingAgreement): Promise<PoolingAgreement>;
  findById(id: string): Promise<PoolingAgreement | null>;
  findByParticipant(companyId: string): Promise<PoolingAgreement[]>;
  findByPeriod(period: string): Promise<PoolingAgreement[]>;
  findByStatus(status: string): Promise<PoolingAgreement[]>;
  delete(id: string): Promise<void>;
}



