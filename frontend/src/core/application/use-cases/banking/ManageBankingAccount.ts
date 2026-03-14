/**
 * Manage Banking Account Use Case
 * Application-level orchestration for banking operations
 */

import { BankingAccount, CreateBankingEntryRequest, WithdrawBankedSurplusRequest } from '../../../domain/models/BankingAccount';
import { IRouteApiClient } from '../../../ports/outbound/IRouteApiClient';

export class ManageBankingAccount {
  constructor(private bankingApiClient: any) {} // TODO: Create IBankingApiClient interface

  async getBalance(companyId: string): Promise<number> {
    return await this.bankingApiClient.getBankingBalance(companyId);
  }

  async createEntry(request: CreateBankingEntryRequest): Promise<void> {
    await this.bankingApiClient.createBankingEntry(request);
  }

  async withdraw(request: WithdrawBankedSurplusRequest): Promise<void> {
    await this.bankingApiClient.withdrawBankedSurplus(request);
  }

  async getHistory(companyId: string): Promise<BankingAccount> {
    return await this.bankingApiClient.getBankingHistory(companyId);
  }
}



