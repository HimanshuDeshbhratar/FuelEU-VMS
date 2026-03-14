/**
 * Compliance API Client
 * Implements IComplianceApiClient interface
 */

import { IComplianceApiClient } from '../../../../core/ports/outbound/IComplianceApiClient';
import { ComplianceBalance } from '../../../../core/domain/models/ComplianceBalance';
import { getApiBaseUrl } from '../../../../shared/constants/config';

export class ComplianceApiClient implements IComplianceApiClient {
  private baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || getApiBaseUrl();
  }

  async getComplianceBalance(companyId: string, period: string): Promise<ComplianceBalance | null> {
    const response = await fetch(`${this.baseUrl}/api/compliance/${companyId}/balance?period=${period}`);
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error('Failed to fetch compliance balance');
    }
    return response.json();
  }

  async getComplianceHistory(companyId: string): Promise<ComplianceBalance[]> {
    const response = await fetch(`${this.baseUrl}/api/compliance/${companyId}/history`);
    if (!response.ok) {
      throw new Error('Failed to fetch compliance history');
    }
    return response.json();
  }

  async checkComplianceStatus(companyId: string, period: string): Promise<ComplianceBalance> {
    const response = await fetch(`${this.baseUrl}/api/compliance/${companyId}/status?period=${period}`);
    if (!response.ok) {
      throw new Error('Failed to check compliance status');
    }
    return response.json();
  }

  async exportComplianceReport(companyId: string, period: string): Promise<Blob> {
    const response = await fetch(`${this.baseUrl}/api/compliance/${companyId}/report?period=${period}`, {
      method: 'POST',
    });
    if (!response.ok) {
      throw new Error('Failed to export compliance report');
    }
    return response.blob();
  }
}



