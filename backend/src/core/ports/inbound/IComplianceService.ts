/**
 * Compliance Service Interface
 * Inbound port for compliance operations
 */

import { ComplianceBalanceDTO } from '../../application/dto/ComplianceBalanceDTO';

export interface IComplianceService {
  checkComplianceStatus(companyId: string, period: string): Promise<ComplianceBalanceDTO>;
  computeComplianceBalance(companyId: string, period: string): Promise<ComplianceBalanceDTO>;
  generateComplianceReport(companyId: string, period: string): Promise<void>;
}



