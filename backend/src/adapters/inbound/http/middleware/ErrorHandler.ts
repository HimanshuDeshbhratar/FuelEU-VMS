/**
 * Error Handler Middleware
 * Handles errors and sends appropriate responses
 */

import { Request, Response, NextFunction } from 'express';
import { DomainError } from '../../../../shared/errors/DomainError';
import { ValidationError } from '../../../../shared/errors/ValidationError';
import { NotFoundError } from '../../../../shared/errors/NotFoundError';

export class ErrorHandler {
  static handle(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    if (err instanceof ValidationError) {
      res.status(400).json({
        error: 'Validation Error',
        message: err.message,
      });
      return;
    }

    if (err instanceof NotFoundError) {
      res.status(404).json({
        error: 'Not Found',
        message: err.message,
      });
      return;
    }

    if (err instanceof DomainError) {
      res.status(400).json({
        error: 'Domain Error',
        message: err.message,
      });
      return;
    }

    // Default error handler
    res.status(500).json({
      error: 'Internal Server Error',
      message: err.message || 'An unexpected error occurred',
    });
  }
}



