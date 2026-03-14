/**
 * Compliance Repository Interface
 * Domain repository interface for compliance
 */

import { ComplianceBalance } from '../entities/ComplianceBalance';

export interface IComplianceRepository {
  save(compliance: ComplianceBalance): Promise<ComplianceBalance>;
  findById(id: string): Promise<ComplianceBalance | null>;
  findByCompanyIdAndPeriod(companyId: string, period: string): Promise<ComplianceBalance | null>;
  findByCompanyId(companyId: string): Promise<ComplianceBalance[]>;
  delete(id: string): Promise<void>;
}



