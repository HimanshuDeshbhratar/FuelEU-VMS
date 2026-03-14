/**
 * Banking Repository Interface
 * Outbound port for banking persistence operations
 */

import { BankingDTO } from '../../application/dto/BankingDTO';

export interface IBankingRepository {
  save(banking: BankingDTO): Promise<BankingDTO>;
  findByShipId(shipId: string): Promise<BankingDTO[]>;
  findByShipIdAndYear(shipId: string, year: number): Promise<BankingDTO[]>;
  getTotalBanked(shipId: string, year: number): Promise<number>;
}
