/**
 * Banking API Client
 * Backend API client for banking operations
 */

import { getApiBaseUrl } from '../../../../shared/constants/config';

export class BankingApiClient {
  private baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || getApiBaseUrl();
  }

  async getBankingBalance(companyId: string): Promise<number> {
    const response = await fetch(`${this.baseUrl}/api/banking/${companyId}/balance`);
    if (!response.ok) {
      throw new Error('Failed to fetch banking balance');
    }
    const data = await response.json();
    return data.balance;
  }

  async createBankingEntry(request: any): Promise<void> {
    const response = await fetch(`${this.baseUrl}/api/banking/entries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });
    if (!response.ok) {
      throw new Error('Failed to create banking entry');
    }
  }

  async withdrawBankedSurplus(request: any): Promise<void> {
    const response = await fetch(`${this.baseUrl}/api/banking/withdraw`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });
    if (!response.ok) {
      throw new Error('Failed to withdraw banked surplus');
    }
  }

  async getBankingHistory(companyId: string): Promise<any> {
    const response = await fetch(`${this.baseUrl}/api/banking/${companyId}/history`);
    if (!response.ok) {
      throw new Error('Failed to fetch banking history');
    }
    return response.json();
  }
}



