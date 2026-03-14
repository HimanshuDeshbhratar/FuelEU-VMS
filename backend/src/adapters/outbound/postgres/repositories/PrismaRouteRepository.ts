/**
 * Prisma Route Repository
 * Implementation of IRouteRepository using Prisma
 */

import { PrismaClient } from '@prisma/client';
import { IRouteRepository } from '../../../../core/ports/outbound/IRouteRepository';
import { RouteDTO } from '../../../../core/application/dto/RouteDTO';

export class PrismaRouteRepository implements IRouteRepository {
  constructor(private prisma: PrismaClient) {}

  async save(route: RouteDTO): Promise<RouteDTO> {
    const created = await this.prisma.routes.create({
      data: {
        route_id: route.routeId,
        ship_id: route.shipId,
        vessel_type: route.vesselType,
        fuel_type: route.fuelType,
        year: route.year,
        ghg_intensity: route.ghgIntensity,
        fuel_consumption: route.fuelConsumption,
        distance: route.distance,
        total_emissions: route.totalEmissions,
        is_baseline: route.isBaseline,
      },
    });

    return this.toDTO(created);
  }

  async findByRouteId(routeId: string): Promise<RouteDTO | null> {
    const route = await this.prisma.routes.findFirst({
      where: { route_id: routeId },
    });

    return route ? this.toDTO(route) : null;
  }

  async findByShipId(shipId: string): Promise<RouteDTO[]> {
    const routes = await this.prisma.routes.findMany({
      where: { ship_id: shipId },
    });

    return routes.map((r) => this.toDTO(r));
  }

  async findByYear(year: number): Promise<RouteDTO[]> {
    const routes = await this.prisma.routes.findMany({
      where: { year },
    });

    return routes.map((r) => this.toDTO(r));
  }

  async findByFilters(filters: {
    vesselType?: string;
    fuelType?: string;
    year?: number;
  }): Promise<RouteDTO[]> {
    const routes = await this.prisma.routes.findMany({
      where: {
        ...(filters.vesselType && { vessel_type: filters.vesselType }),
        ...(filters.fuelType && { fuel_type: filters.fuelType }),
        ...(filters.year && { year: filters.year }),
      },
    });

    return routes.map((r) => this.toDTO(r));
  }

  async findAll(): Promise<RouteDTO[]> {
    const routes = await this.prisma.routes.findMany();
    return routes.map((r) => this.toDTO(r));
  }

  async update(routeId: string, route: Partial<RouteDTO>): Promise<RouteDTO> {
    const updated = await this.prisma.routes.updateMany({
      where: { route_id: routeId },
      data: {
        ...(route.vesselType && { vessel_type: route.vesselType }),
        ...(route.fuelType && { fuel_type: route.fuelType }),
        ...(route.year && { year: route.year }),
        ...(route.ghgIntensity !== undefined && { ghg_intensity: route.ghgIntensity }),
        ...(route.fuelConsumption !== undefined && { fuel_consumption: route.fuelConsumption }),
        ...(route.distance !== undefined && { distance: route.distance }),
        ...(route.totalEmissions !== undefined && { total_emissions: route.totalEmissions }),
        ...(route.isBaseline !== undefined && { is_baseline: route.isBaseline }),
      },
    });

    const updatedRoute = await this.findByRouteId(routeId);
    if (!updatedRoute) {
      throw new Error(`Route ${routeId} not found after update`);
    }

    return updatedRoute;
  }

  async setBaseline(routeId: string): Promise<RouteDTO> {
    return await this.update(routeId, { isBaseline: true });
  }

  async getBaselineRoute(year?: number): Promise<RouteDTO | null> {
    const route = await this.prisma.routes.findFirst({
      where: {
        is_baseline: true,
        ...(year && { year }),
      },
    });

    return route ? this.toDTO(route) : null;
  }

  private toDTO(route: any): RouteDTO {
    return {
      id: route.id,
      routeId: route.route_id,
      shipId: route.ship_id,
      vesselType: route.vessel_type,
      fuelType: route.fuel_type,
      year: route.year,
      ghgIntensity: route.ghg_intensity,
      fuelConsumption: route.fuel_consumption,
      distance: route.distance,
      totalEmissions: route.total_emissions,
      isBaseline: route.is_baseline,
    };
  }
}

