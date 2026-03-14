/**
 * Set Baseline Route Use Case
 * Sets a route as the baseline for comparison
 */

import { IRouteRepository } from '../../../ports/outbound/IRouteRepository';

export class SetBaselineRoute {
  constructor(private routeRepository: IRouteRepository) {}

  async execute(routeId: string): Promise<void> {
    const route = await this.routeRepository.findByRouteId(routeId);
    
    if (!route) {
      throw new Error(`Route ${routeId} not found`);
    }

    // Unset all other baseline routes for the same year
    const routesInYear = await this.routeRepository.findByYear(route.year);
    for (const r of routesInYear) {
      if (r.isBaseline && r.routeId !== routeId) {
        await this.routeRepository.update(r.routeId, { isBaseline: false });
      }
    }

    // Set this route as baseline
    await this.routeRepository.setBaseline(routeId);
  }
}

