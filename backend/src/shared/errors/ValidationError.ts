/**
 * Validation Error
 * Error for validation failures
 */

import { DomainError } from './DomainError';

export class ValidationError extends DomainError {
  constructor(message: string, public field?: string) {
    super(message);
    this.name = 'ValidationError';
  }
}



