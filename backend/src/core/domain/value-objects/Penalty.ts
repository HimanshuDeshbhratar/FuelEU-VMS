/**
 * Penalty Value Object
 * Represents a penalty for non-compliance
 */

export class Penalty {
  private constructor(
    private readonly amount: number,
    private readonly reason: string,
    private readonly period: string
  ) {
    if (amount < 0) {
      throw new Error('Penalty amount cannot be negative');
    }
    if (!reason || reason.trim().length === 0) {
      throw new Error('Penalty reason is required');
    }
  }

  static create(amount: number, reason: string, period: string): Penalty {
    return new Penalty(amount, reason, period);
  }

  getAmount(): number {
    return this.amount;
  }

  getReason(): string {
    return this.reason;
  }

  getPeriod(): string {
    return this.period;
  }

  equals(other: Penalty): boolean {
    return (
      this.amount === other.amount &&
      this.reason === other.reason &&
      this.period === other.period
    );
  }
}



