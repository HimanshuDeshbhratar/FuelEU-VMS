/**
 * Shared Type Definitions
 * Common type definitions used across the application
 */

export type ID = string;

export type Period = string; // Format: Q1-2024, Q2-2024, etc.

export type Status = 'ACTIVE' | 'INACTIVE' | 'PENDING' | 'COMPLETED' | 'DISSOLVED';

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}



