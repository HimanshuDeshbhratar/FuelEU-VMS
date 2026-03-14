/**
 * Route Repository Interface
 * Domain repository interface for routes
 */

import { Route } from '../entities/Route';

export interface IRouteRepository {
  save(route: Route): Promise<Route>;
  findById(id: string): Promise<Route | null>;
  findByVesselId(vesselId: string): Promise<Route[]>;
  findByPeriod(period: string): Promise<Route[]>;
  findAll(): Promise<Route[]>;
  delete(id: string): Promise<void>;
}

