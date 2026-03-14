/**
 * Not Found Error
 * Error for resource not found
 */

import { DomainError } from './DomainError';

export class NotFoundError extends DomainError {
  constructor(resource: string, id?: string) {
    const message = id 
      ? `${resource} with id ${id} not found`
      : `${resource} not found`;
    super(message);
    this.name = 'NotFoundError';
  }
}



