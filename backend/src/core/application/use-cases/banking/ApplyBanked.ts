/**
 * Apply Banked Surplus Use Case
 * Applies banked compliance balance to offset deficit
 */

import { IComplianceRepository } from '../../../ports/outbound/IComplianceRepository';
import { IBankingRepository } from '../../../ports/outbound/IBankingRepository';

export class ApplyBanked {
  constructor(
    private complianceRepository: IComplianceRepository,
    private bankingRepository: IBankingRepository
  ) {}

  async execute(shipId: string, year: number, amount: number): Promise<void> {
    // Get current compliance balance
    const compliance = await this.complianceRepository.findByShipIdAndYear(shipId, year);
    
    if (!compliance) {
      throw new Error(`No compliance balance found for ship ${shipId} in year ${year}`);
    }

    // Get total banked amount
    const totalBanked = await this.bankingRepository.getTotalBanked(shipId, year);
    
    if (amount > totalBanked) {
      throw new Error(`Insufficient banked amount. Available: ${totalBanked}, Requested: ${amount}`);
    }

    // Apply banked amount to compliance balance
    const newCB = compliance.cbGco2eq + amount;

    await this.complianceRepository.update(shipId, {
      cbGco2eq: newCB,
    });
  }
}

