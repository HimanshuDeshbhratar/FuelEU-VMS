/**
 * Compare Routes Use Case
 * Compares baseline route with comparison route
 * Formula: percentDiff = ((comparison / baseline) - 1) * 100
 */

import { IRouteRepository } from '../../../ports/outbound/IRouteRepository';
import { ComparisonDTO } from '../../dto/ComparisonDTO';

const TARGET_GHG_INTENSITY = 89.3368; // gCO2e/MJ

export class CompareRoutes {
  constructor(private routeRepository: IRouteRepository) {}

  async execute(year?: number): Promise<ComparisonDTO> {
    // Get baseline route
    const baseline = await this.routeRepository.getBaselineRoute(year);
    
    if (!baseline) {
      throw new Error('No baseline route found');
    }

    // Get all non-baseline routes for comparison
    const allRoutes = year 
      ? await this.routeRepository.findByYear(year)
      : await this.routeRepository.findAll();
    
    const comparisonRoutes = allRoutes.filter((r) => !r.isBaseline && r.year === baseline.year);
    
    if (comparisonRoutes.length === 0) {
      throw new Error('No comparison routes found');
    }

    // For simplicity, compare with the first non-baseline route
    // In a real scenario, you might want to compare with a specific route
    const comparison = comparisonRoutes[0];

    // Calculate percent difference
    const percentDiff = ((comparison.ghgIntensity / baseline.ghgIntensity) - 1) * 100;

    // Check compliance
    const isCompliant = comparison.ghgIntensity <= TARGET_GHG_INTENSITY;

    return {
      baseline: {
        routeId: baseline.routeId,
        ghgIntensity: baseline.ghgIntensity,
      },
      comparison: {
        routeId: comparison.routeId,
        ghgIntensity: comparison.ghgIntensity,
      },
      percentDiff,
      isCompliant,
      target: TARGET_GHG_INTENSITY,
    };
  }
}

