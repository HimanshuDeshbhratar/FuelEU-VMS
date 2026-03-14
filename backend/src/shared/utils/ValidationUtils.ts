/**
 * Validation Utilities
 * Utility functions for validation
 */

export class ValidationUtils {
  static isEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static isUUID(uuid: string): boolean {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
  }

  static isPositiveNumber(value: number): boolean {
    return value > 0;
  }

  static isNonNegativeNumber(value: number): boolean {
    return value >= 0;
  }

  static isValidPeriod(period: string): boolean {
    const periodRegex = /^Q[1-4]-\d{4}$/;
    return periodRegex.test(period);
  }
}



