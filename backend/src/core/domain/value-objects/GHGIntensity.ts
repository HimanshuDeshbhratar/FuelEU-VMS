/**
 * GHG Intensity Value Object
 * Type-safe GHG intensity value with validation
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

  equals(other: GHGIntensity): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value.toFixed(4);
  }
}



