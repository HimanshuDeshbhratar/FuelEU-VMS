/**
 * GHG Intensity Value Object
 * Frontend representation of GHG intensity
 */

export class GHGIntensity {
  private constructor(private readonly value: number) {
    if (value < 0) {
      throw new Error('GHG intensity cannot be negative');
    }
  }

  static create(value: number): GHGIntensity {
    return new GHGIntensity(value);
  }

  getValue(): number {
    return this.value;
  }

  format(): string {
    return this.value.toFixed(4);
  }

  equals(other: GHGIntensity): boolean {
    return this.value === other.value;
  }
}



