/**
 * Banking Account Model
 * Frontend domain model for banking account
 */

export interface BankingAccount {
  id: string;
  companyId: string;
  balance: number;
  transactions: BankingTransaction[];
}

export interface BankingTransaction {
  id: string;
  companyId: string;
  period: string;
  amount: number;
  type: 'DEPOSIT' | 'WITHDRAWAL';
  balance: number;
  createdAt: Date;
}

export interface CreateBankingEntryRequest {
  companyId: string;
  period: string;
  amount: number;
}

export interface WithdrawBankedSurplusRequest {
  companyId: string;
  amount: number;
}



