/**
 * Date Utilities
 * Utility functions for date operations
 */

export class DateUtils {
  static formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  static parseDate(dateString: string): Date {
    return new Date(dateString);
  }

  static getCurrentPeriod(): string {
    const now = new Date();
    const year = now.getFullYear();
    const quarter = Math.floor(now.getMonth() / 3) + 1;
    return `Q${quarter}-${year}`;
  }

  static parsePeriod(period: string): { year: number; quarter: number } {
    const match = period.match(/Q(\d)-(\d{4})/);
    if (!match) {
      throw new Error(`Invalid period format: ${period}`);
    }
    return {
      quarter: parseInt(match[1], 10),
      year: parseInt(match[2], 10),
    };
  }

  static isValidPeriod(period: string): boolean {
    try {
      this.parsePeriod(period);
      return true;
    } catch {
      return false;
    }
  }
}



