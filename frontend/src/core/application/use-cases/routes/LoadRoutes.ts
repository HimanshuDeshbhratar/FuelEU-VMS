/**
 * Load Routes Use Case
 * Application-level orchestration for loading routes
 */

import { Route } from '../../../domain/models/Route';
import { IRouteApiClient } from '../../../ports/outbound/IRouteApiClient';

export class LoadRoutes {
  constructor(private routeApiClient: IRouteApiClient) {}

  async execute(vesselId?: string): Promise<Route[]> {
    if (vesselId) {
      return await this.routeApiClient.getRoutesByVesselId(vesselId);
    }
    return await this.routeApiClient.getAllRoutes();
  }
}



