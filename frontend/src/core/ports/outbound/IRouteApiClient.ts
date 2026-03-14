/**
 * Route API Client Interface
 * Backend API interface for routes
 */

import { Route, CreateRouteRequest, UpdateRouteRequest } from '../../domain/models/Route';

export interface IRouteApiClient {
  getAllRoutes(): Promise<Route[]>;
  getRouteById(id: string): Promise<Route>;
  getRoutesByVesselId(vesselId: string): Promise<Route[]>;
  createRoute(request: CreateRouteRequest): Promise<Route>;
  updateRoute(id: string, request: UpdateRouteRequest): Promise<Route>;
  deleteRoute(id: string): Promise<void>;
}



