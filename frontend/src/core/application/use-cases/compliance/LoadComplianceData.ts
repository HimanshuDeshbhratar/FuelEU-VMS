/**
 * Load Compliance Data Use Case
 * Application-level orchestration for loading compliance data
 */

import { ComplianceBalance } from '../../../domain/models/ComplianceBalance';
import { IComplianceApiClient } from '../../../ports/outbound/IComplianceApiClient';

export class LoadComplianceData {
  constructor(private complianceApiClient: IComplianceApiClient) {}

  async execute(companyId: string, period?: string): Promise<ComplianceBalance[]> {
    if (period) {
      const balance = await this.complianceApiClient.getComplianceBalance(companyId, period);
      return balance ? [balance] : [];
    }
    return await this.complianceApiClient.getComplianceHistory(companyId);
  }
}



