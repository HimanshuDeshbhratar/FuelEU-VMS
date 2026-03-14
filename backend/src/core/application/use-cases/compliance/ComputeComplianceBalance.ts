/**
 * Compute Compliance Balance Use Case
 * Calculates CB = (Target - Actual) × (fuelConsumption × 41000)
 * Target = 89.3368 gCO2e/MJ
 */

import { IRouteRepository } from '../../../ports/outbound/IRouteRepository';
import { IComplianceRepository } from '../../../ports/outbound/IComplianceRepository';
import { ComplianceBalanceDTO } from '../../dto/ComplianceBalanceDTO';

const TARGET_GHG_INTENSITY = 89.3368; // gCO2e/MJ
const ENERGY_CONTENT = 41000; // MJ per ton of fuel

export class ComputeComplianceBalance {
  constructor(
    private routeRepository: IRouteRepository,
    private complianceRepository: IComplianceRepository
  ) {}

  async execute(shipId: string, year: number): Promise<ComplianceBalanceDTO> {
    // Get all routes for the ship in the given year
    const routes = await this.routeRepository.findByFilters({
      year,
    });

    const shipRoutes = routes.filter((r) => r.shipId === shipId);

    if (shipRoutes.length === 0) {
      throw new Error(`No routes found for ship ${shipId} in year ${year}`);
    }

    // Calculate total compliance balance
    // CB = Σ((Target - Actual) × (fuelConsumption × 41000))
    let totalCB = 0;

    for (const route of shipRoutes) {
      const actualGHG = route.ghgIntensity;
      const fuelConsumption = route.fuelConsumption;
      
      const routeCB = (TARGET_GHG_INTENSITY - actualGHG) * (fuelConsumption * ENERGY_CONTENT);
      totalCB += routeCB;
    }

    // Save or update compliance balance
    const existing = await this.complianceRepository.findByShipIdAndYear(shipId, year);
    
    const complianceBalance: ComplianceBalanceDTO = {
      shipId,
      year,
      cbGco2eq: totalCB,
    };

    if (existing) {
      return await this.complianceRepository.update(shipId, complianceBalance);
    } else {
      return await this.complianceRepository.save(complianceBalance);
    }
  }
}

