/**
 * Validators
 * Validation utility functions
 */

export function isEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isUUID(uuid: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}

export function isPositiveNumber(value: number): boolean {
  return value > 0;
}

export function isNonNegativeNumber(value: number): boolean {
  return value >= 0;
}

export function isValidPeriod(period: string): boolean {
  const periodRegex = /^Q[1-4]-\d{4}$/;
  return periodRegex.test(period);
}

export function validateRequired(value: any): boolean {
  return value !== null && value !== undefined && value !== '';
}

export function validateMinLength(value: string, minLength: number): boolean {
  return value.length >= minLength;
}

export function validateMaxLength(value: string, maxLength: number): boolean {
  return value.length <= maxLength;
}



