/**
 * Route Data Transfer Object
 * Data transfer object for route information
 */

export interface RouteDTO {
  id?: number;
  routeId: string;
  shipId: string;
  vesselType: string;
  fuelType: string;
  year: number;
  ghgIntensity: number; // gCO2e/MJ
  fuelConsumption: number; // tons
  distance: number; // nautical miles
  totalEmissions: number; // gCO2e
  isBaseline: boolean;
}
