/**
 * Vessel Entity
 * Vessel specifications
 */

export class Vessel {
  private constructor(
    private readonly id: string,
    private readonly name: string,
    private readonly imoNumber: string,
    private readonly companyId: string,
    private readonly grossTonnage: number,
    private readonly vesselType: string
  ) {
    if (!id || id.trim().length === 0) {
      throw new Error('Vessel ID is required');
    }
    if (!imoNumber || imoNumber.trim().length === 0) {
      throw new Error('IMO number is required');
    }
    if (grossTonnage <= 0) {
      throw new Error('Gross tonnage must be positive');
    }
  }

  static create(
    id: string,
    name: string,
    imoNumber: string,
    companyId: string,
    grossTonnage: number,
    vesselType: string
  ): Vessel {
    return new Vessel(id, name, imoNumber, companyId, grossTonnage, vesselType);
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getImoNumber(): string {
    return this.imoNumber;
  }

  getCompanyId(): string {
    return this.companyId;
  }

  getGrossTonnage(): number {
    return this.grossTonnage;
  }

  getVesselType(): string {
    return this.vesselType;
  }

  equals(other: Vessel): boolean {
    return this.id === other.id;
  }
}



