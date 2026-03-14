/**
 * Route Repository Interface
 * Outbound port for route persistence operations
 */

import { RouteDTO } from '../../application/dto/RouteDTO';

export interface IRouteRepository {
  save(route: RouteDTO): Promise<RouteDTO>;
  findByRouteId(routeId: string): Promise<RouteDTO | null>;
  findByShipId(shipId: string): Promise<RouteDTO[]>;
  findByYear(year: number): Promise<RouteDTO[]>;
  findByFilters(filters: {
    vesselType?: string;
    fuelType?: string;
    year?: number;
  }): Promise<RouteDTO[]>;
  findAll(): Promise<RouteDTO[]>;
  update(routeId: string, route: Partial<RouteDTO>): Promise<RouteDTO>;
  setBaseline(routeId: string): Promise<RouteDTO>;
  getBaselineRoute(year?: number): Promise<RouteDTO | null>;
}
