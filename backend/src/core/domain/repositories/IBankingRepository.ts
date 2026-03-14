/**
 * Banking Repository Interface
 * Domain repository interface for banking
 */

import { BankingAccount } from '../entities/BankingAccount';

export interface IBankingRepository {
  save(account: BankingAccount): Promise<BankingAccount>;
  findById(id: string): Promise<BankingAccount | null>;
  findByCompanyId(companyId: string): Promise<BankingAccount | null>;
  findOrCreateByCompanyId(companyId: string): Promise<BankingAccount>;
}



