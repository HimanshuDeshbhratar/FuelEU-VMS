/**
 * Date Range Value Object
 * Represents a date range for filtering
 */

export class DateRange {
  private constructor(
    private readonly startDate: Date,
    private readonly endDate: Date
  ) {
    if (startDate > endDate) {
      throw new Error('Start date must be before end date');
    }
  }

  static create(startDate: Date, endDate: Date): DateRange {
    return new DateRange(startDate, endDate);
  }

  static createFromPeriod(period: string): DateRange {
    const match = period.match(/Q([1-4])-(\d{4})/);
    if (!match) {
      throw new Error(`Invalid period format: ${period}`);
    }

    const quarter = parseInt(match[1], 10);
    const year = parseInt(match[2], 10);
    const startMonth = (quarter - 1) * 3;
    const endMonth = quarter * 3 - 1;

    const startDate = new Date(year, startMonth, 1);
    const endDate = new Date(year, endMonth + 1, 0);

    return new DateRange(startDate, endDate);
  }

  getStartDate(): Date {
    return this.startDate;
  }

  getEndDate(): Date {
    return this.endDate;
  }

  getDays(): number {
    const diffTime = Math.abs(this.endDate.getTime() - this.startDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  contains(date: Date): boolean {
    return date >= this.startDate && date <= this.endDate;
  }

  equals(other: DateRange): boolean {
    return (
      this.startDate.getTime() === other.startDate.getTime() &&
      this.endDate.getTime() === other.endDate.getTime()
    );
  }
}



