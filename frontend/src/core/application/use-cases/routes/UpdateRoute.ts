/**
 * Update Route Use Case
 * Application-level orchestration for updating routes
 */

import { Route, UpdateRouteRequest } from '../../../domain/models/Route';
import { IRouteApiClient } from '../../../ports/outbound/IRouteApiClient';

export class UpdateRoute {
  constructor(private routeApiClient: IRouteApiClient) {}

  async execute(routeId: string, request: UpdateRouteRequest): Promise<Route> {
    return await this.routeApiClient.updateRoute(routeId, request);
  }
}



