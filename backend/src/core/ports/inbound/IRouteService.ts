/**
 * Route Service Interface
 * Inbound port for route operations
 */

import { RouteDTO } from '../../application/dto/RouteDTO';

export interface IRouteService {
  createRoute(route: RouteDTO): Promise<RouteDTO>;
  getRouteById(id: string): Promise<RouteDTO | null>;
  getRoutesByVesselId(vesselId: string): Promise<RouteDTO[]>;
  updateRoute(id: string, route: Partial<RouteDTO>): Promise<RouteDTO>;
  deleteRoute(id: string): Promise<void>;
}



