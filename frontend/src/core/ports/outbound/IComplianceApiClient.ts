/**
 * Compliance API Client Interface
 * Backend API interface for compliance
 */

import { ComplianceBalance } from '../../domain/models/ComplianceBalance';

export interface IComplianceApiClient {
  getComplianceBalance(companyId: string, period: string): Promise<ComplianceBalance | null>;
  getComplianceHistory(companyId: string): Promise<ComplianceBalance[]>;
  checkComplianceStatus(companyId: string, period: string): Promise<ComplianceBalance>;
  exportComplianceReport(companyId: string, period: string): Promise<Blob>;
}



