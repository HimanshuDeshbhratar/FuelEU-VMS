/**
 * Route DTO
 * Frontend DTO matching backend structure
 */

export interface RouteDTO {
  id?: string;
  vesselId: string;
  origin: string;
  destination: string;
  distance: number;
  fuelType: string;
  ghgIntensity: number;
  createdAt?: Date;
  updatedAt?: Date;
}



