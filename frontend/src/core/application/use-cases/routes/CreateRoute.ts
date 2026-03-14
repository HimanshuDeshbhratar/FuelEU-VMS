/**
 * Create Route Use Case
 * Application-level orchestration for creating routes
 */

import { Route, CreateRouteRequest } from '../../../domain/models/Route';
import { IRouteApiClient } from '../../../ports/outbound/IRouteApiClient';

export class CreateRoute {
  constructor(private routeApiClient: IRouteApiClient) {}

  async execute(request: CreateRouteRequest): Promise<Route> {
    return await this.routeApiClient.createRoute(request);
  }
}



