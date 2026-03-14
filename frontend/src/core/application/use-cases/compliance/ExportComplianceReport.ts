/**
 * Export Compliance Report Use Case
 * Application-level orchestration for exporting compliance reports
 */

import { IComplianceApiClient } from '../../../ports/outbound/IComplianceApiClient';

export class ExportComplianceReport {
  constructor(private complianceApiClient: IComplianceApiClient) {}

  async execute(companyId: string, period: string): Promise<Blob> {
    return await this.complianceApiClient.exportComplianceReport(companyId, period);
  }
}



