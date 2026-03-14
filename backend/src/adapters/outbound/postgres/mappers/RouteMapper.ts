/**
 * Route Mapper
 * Domain ↔ DB entity mapping for routes
 */

import { RouteDTO } from '../../../../core/application/dto/RouteDTO';

export class RouteMapper {
  static toDomain(dbEntity: any): RouteDTO {
    // TODO: Map database entity to domain DTO
    return {
      id: dbEntity.id,
      vesselId: dbEntity.vessel_id,
      origin: dbEntity.origin,
      destination: dbEntity.destination,
      distance: dbEntity.distance,
      fuelType: dbEntity.fuel_type,
      ghgIntensity: dbEntity.ghg_intensity,
      createdAt: dbEntity.created_at,
      updatedAt: dbEntity.updated_at,
    };
  }

  static toDB(route: RouteDTO): any {
    // TODO: Map domain DTO to database entity
    return {
      id: route.id,
      vessel_id: route.vesselId,
      origin: route.origin,
      destination: route.destination,
      distance: route.distance,
      fuel_type: route.fuelType,
      ghg_intensity: route.ghgIntensity,
      created_at: route.createdAt,
      updated_at: route.updatedAt,
    };
  }
}



