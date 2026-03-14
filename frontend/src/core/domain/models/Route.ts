/**
 * Route Model
 * Frontend domain model for routes
 */

export interface Route {
  id: string;
  vesselId: string;
  origin: string;
  destination: string;
  distance: number;
  fuelType: string;
  ghgIntensity: number;
  fuelConsumption: number;
  voyageDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateRouteRequest {
  vesselId: string;
  origin: string;
  destination: string;
  distance: number;
  fuelType: string;
  ghgIntensity: number;
  fuelConsumption: number;
  voyageDate: Date;
}

export interface UpdateRouteRequest {
  origin?: string;
  destination?: string;
  distance?: number;
  fuelType?: string;
  ghgIntensity?: number;
  fuelConsumption?: number;
  voyageDate?: Date;
}



