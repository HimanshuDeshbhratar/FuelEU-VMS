/**
 * Bank Surplus Use Case
 * Banks positive compliance balance (surplus)
 */

import { IComplianceRepository } from '../../../ports/outbound/IComplianceRepository';
import { IBankingRepository } from '../../../ports/outbound/IBankingRepository';
import { BankingDTO } from '../../dto/BankingDTO';

export class BankSurplus {
  constructor(
    private complianceRepository: IComplianceRepository,
    private bankingRepository: IBankingRepository
  ) {}

  async execute(shipId: string, year: number): Promise<BankingDTO> {
    // Get compliance balance
    const compliance = await this.complianceRepository.findByShipIdAndYear(shipId, year);
    
    if (!compliance) {
      throw new Error(`No compliance balance found for ship ${shipId} in year ${year}`);
    }

    const cb = compliance.cbGco2eq;

    // Can only bank positive CB (surplus)
    if (cb <= 0) {
      throw new Error('Cannot bank negative or zero compliance balance. Only surplus can be banked.');
    }

    // Create banking entry
    const bankingEntry: BankingDTO = {
      shipId,
      year,
      amountGco2eq: cb,
    };

    return await this.bankingRepository.save(bankingEntry);
  }
}

