/**
 * Shared Common Types
 * Common type definitions
 */

export type ID = string;

export type Status = 'ACTIVE' | 'INACTIVE' | 'PENDING' | 'COMPLETED' | 'DISSOLVED';

export interface DateRange {
  startDate: Date;
  endDate: Date;
}

export interface SelectOption {
  value: string;
  label: string;
}



