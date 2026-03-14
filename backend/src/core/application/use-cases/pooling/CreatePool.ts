/**
 * Create Pool Use Case
 * Creates a pooling agreement with greedy allocation
 * Rules:
 * - Sum(adjustedCB) ≥ 0
 * - Deficit ship cannot exit worse
 * - Surplus ship cannot exit negative
 * - Greedy allocation: surplus distributed to deficits
 */

import { IPoolingRepository } from '../../../ports/outbound/IPoolingRepository';
import { IComplianceRepository } from '../../../ports/outbound/IComplianceRepository';
import { PoolingDTO, PoolMemberDTO } from '../../dto/PoolingDTO';

export class CreatePool {
  constructor(
    private poolingRepository: IPoolingRepository,
    private complianceRepository: IComplianceRepository
  ) {}

  async execute(year: number, shipIds: string[]): Promise<PoolingDTO> {
    if (shipIds.length < 2) {
      throw new Error('Pool must have at least 2 ships');
    }

    // Get compliance balances for all ships
    const members: PoolMemberDTO[] = [];
    let totalCB = 0;

    for (const shipId of shipIds) {
      const compliance = await this.complianceRepository.findByShipIdAndYear(shipId, year);
      
      if (!compliance) {
        throw new Error(`No compliance balance found for ship ${shipId} in year ${year}`);
      }

      const cbBefore = compliance.cbGco2eq;
      totalCB += cbBefore;

      members.push({
        shipId,
        cbBefore,
        cbAfter: cbBefore, // Will be updated after allocation
      });
    }

    // Rule: Sum(adjustedCB) ≥ 0
    if (totalCB < 0) {
      throw new Error('Pool cannot be created: total compliance balance is negative');
    }

    // Greedy allocation: distribute surplus to deficits
    const surplusShips = members.filter((m) => m.cbBefore > 0);
    const deficitShips = members.filter((m) => m.cbBefore < 0);

    // Sort surplus ships (largest first) and deficit ships (smallest first)
    surplusShips.sort((a, b) => b.cbBefore - a.cbBefore);
    deficitShips.sort((a, b) => a.cbBefore - b.cbBefore);

    let surplusIndex = 0;
    let deficitIndex = 0;

    while (surplusIndex < surplusShips.length && deficitIndex < deficitShips.length) {
      const surplus = surplusShips[surplusIndex];
      const deficit = deficitShips[deficitIndex];

      const availableSurplus = surplus.cbBefore - surplus.cbAfter;
      const neededDeficit = Math.abs(deficit.cbBefore - deficit.cbAfter);

      if (availableSurplus > 0 && neededDeficit > 0) {
        const transfer = Math.min(availableSurplus, neededDeficit);
        
        surplus.cbAfter -= transfer;
        deficit.cbAfter += transfer;

        // Rule: Surplus ship cannot exit negative
        if (surplus.cbAfter < 0) {
          deficit.cbAfter += surplus.cbAfter;
          surplus.cbAfter = 0;
        }

        // Rule: Deficit ship cannot exit worse
        if (deficit.cbAfter < deficit.cbBefore) {
          deficit.cbAfter = deficit.cbBefore;
        }
      }

      if (surplus.cbAfter >= surplus.cbBefore) {
        surplusIndex++;
      }
      if (deficit.cbAfter >= 0) {
        deficitIndex++;
      } else if (surplus.cbAfter <= 0) {
        surplusIndex++;
      }
    }

    // Update compliance balances
    for (const member of members) {
      await this.complianceRepository.update(member.shipId, {
        cbGco2eq: member.cbAfter,
      });
    }

    // Create pool
    const pool: PoolingDTO = {
      year,
      members,
    };

    return await this.poolingRepository.createPool(pool);
  }
}

