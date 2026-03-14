/**
 * Fuel Type Value Object
 * Well-to-wake fuel properties
 */

export enum FuelCategory {
  FOSSIL = 'FOSSIL',
  BIOFUEL = 'BIOFUEL',
  RENEWABLE = 'RENEWABLE',
  ELECTRIC = 'ELECTRIC',
}

export class FuelType {
  private constructor(
    private readonly name: string,
    private readonly category: FuelCategory,
    private readonly defaultGHGIntensity: number,
    private readonly wellToTankIntensity: number,
    private readonly tankToWakeIntensity: number
  ) {
    if (defaultGHGIntensity < 0) {
      throw new Error('Default GHG intensity cannot be negative');
    }
  }

  static create(
    name: string,
    category: FuelCategory,
    defaultGHGIntensity: number,
    wellToTankIntensity: number,
    tankToWakeIntensity: number
  ): FuelType {
    return new FuelType(
      name,
      category,
      defaultGHGIntensity,
      wellToTankIntensity,
      tankToWakeIntensity
    );
  }

  getName(): string {
    return this.name;
  }

  getCategory(): FuelCategory {
    return this.category;
  }

  getDefaultGHGIntensity(): number {
    return this.defaultGHGIntensity;
  }

  getWellToTankIntensity(): number {
    return this.wellToTankIntensity;
  }

  getTankToWakeIntensity(): number {
    return this.tankToWakeIntensity;
  }

  getTotalIntensity(): number {
    return this.wellToTankIntensity + this.tankToWakeIntensity;
  }

  equals(other: FuelType): boolean {
    return this.name === other.name;
  }

  isRenewable(): boolean {
    return this.category === FuelCategory.RENEWABLE || 
           this.category === FuelCategory.BIOFUEL ||
           this.category === FuelCategory.ELECTRIC;
  }
}



