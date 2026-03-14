/**
 * Route Entity
 * Represents a voyage route for FuelEU compliance
 */

export class Route {
  private constructor(
    private readonly routeId: string,
    private readonly shipId: string,
    private readonly vesselType: string,
    private readonly fuelType: string,
    private readonly year: number,
    private readonly ghgIntensity: number, // gCO2e/MJ
    private readonly fuelConsumption: number, // tons
    private readonly distance: number, // nautical miles
    private readonly totalEmissions: number, // gCO2e
    private readonly isBaseline: boolean
  ) {
    if (!routeId || routeId.trim().length === 0) {
      throw new Error('Route ID is required');
    }
    if (!shipId || shipId.trim().length === 0) {
      throw new Error('Ship ID is required');
    }
    if (year < 2020 || year > 2100) {
      throw new Error('Year must be between 2020 and 2100');
    }
    if (ghgIntensity < 0) {
      throw new Error('GHG intensity cannot be negative');
    }
    if (fuelConsumption <= 0) {
      throw new Error('Fuel consumption must be positive');
    }
    if (distance <= 0) {
      throw new Error('Distance must be positive');
    }
    if (totalEmissions < 0) {
      throw new Error('Total emissions cannot be negative');
    }
  }

  static create(
    routeId: string,
    shipId: string,
    vesselType: string,
    fuelType: string,
    year: number,
    ghgIntensity: number,
    fuelConsumption: number,
    distance: number,
    totalEmissions: number,
    isBaseline: boolean = false
  ): Route {
    return new Route(
      routeId,
      shipId,
      vesselType,
      fuelType,
      year,
      ghgIntensity,
      fuelConsumption,
      distance,
      totalEmissions,
      isBaseline
    );
  }

  getRouteId(): string {
    return this.routeId;
  }

  getShipId(): string {
    return this.shipId;
  }

  getVesselType(): string {
    return this.vesselType;
  }

  getFuelType(): string {
    return this.fuelType;
  }

  getYear(): number {
    return this.year;
  }

  getGHGIntensity(): number {
    return this.ghgIntensity;
  }

  getFuelConsumption(): number {
    return this.fuelConsumption;
  }

  getDistance(): number {
    return this.distance;
  }

  getTotalEmissions(): number {
    return this.totalEmissions;
  }

  getIsBaseline(): boolean {
    return this.isBaseline;
  }

  setAsBaseline(): Route {
    return new Route(
      this.routeId,
      this.shipId,
      this.vesselType,
      this.fuelType,
      this.year,
      this.ghgIntensity,
      this.fuelConsumption,
      this.distance,
      this.totalEmissions,
      true
    );
  }

  equals(other: Route): boolean {
    return this.routeId === other.routeId;
  }
}
