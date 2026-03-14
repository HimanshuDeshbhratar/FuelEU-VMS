/**
 * Compliance Period Value Object
 * Represents a compliance period (e.g., Q1-2024)
 */

export class CompliancePeriod {
  private constructor(
    private readonly quarter: number,
    private readonly year: number
  ) {
    if (quarter < 1 || quarter > 4) {
      throw new Error('Quarter must be between 1 and 4');
    }
    if (year < 2020 || year > 2100) {
      throw new Error('Year must be between 2020 and 2100');
    }
  }

  static create(quarter: number, year: number): CompliancePeriod {
    return new CompliancePeriod(quarter, year);
  }

  static fromString(period: string): CompliancePeriod {
    const match = period.match(/Q([1-4])-(\d{4})/);
    if (!match) {
      throw new Error(`Invalid period format: ${period}. Expected format: Q1-2024`);
    }
    return new CompliancePeriod(parseInt(match[1], 10), parseInt(match[2], 10));
  }

  getQuarter(): number {
    return this.quarter;
  }

  getYear(): number {
    return this.year;
  }

  toString(): string {
    return `Q${this.quarter}-${this.year}`;
  }

  equals(other: CompliancePeriod): boolean {
    return this.quarter === other.quarter && this.year === other.year;
  }

  nextPeriod(): CompliancePeriod {
    if (this.quarter === 4) {
      return new CompliancePeriod(1, this.year + 1);
    }
    return new CompliancePeriod(this.quarter + 1, this.year);
  }

  previousPeriod(): CompliancePeriod {
    if (this.quarter === 1) {
      return new CompliancePeriod(4, this.year - 1);
    }
    return new CompliancePeriod(this.quarter - 1, this.year);
  }
}



