/**
 * Banking Service Interface
 * Inbound port for banking operations
 */

import { BankingDTO } from '../../application/dto/BankingDTO';

export interface IBankingService {
  createBankingEntry(banking: BankingDTO): Promise<BankingDTO>;
  withdrawBankedSurplus(companyId: string, amount: number): Promise<BankingDTO>;
  getBankingBalance(companyId: string): Promise<number>;
  getBankingHistory(companyId: string): Promise<BankingDTO[]>;
}



