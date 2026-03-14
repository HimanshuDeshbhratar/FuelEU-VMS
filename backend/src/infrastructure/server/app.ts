/**
 * Express App Configuration
 * Main Express application setup
 */

import express, { Express } from 'express';
import cors from 'cors';
import { ErrorHandler } from '../../adapters/inbound/http/middleware/ErrorHandler';
import { createRoutes } from '../../adapters/inbound/http/routes/index';

export function createApp(
  routeController: any,
  complianceController: any,
  bankingController: any,
  poolingController: any
): Express {
  const app = express();

  // CORS middleware - allow requests from frontend
  app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));

  // Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Routes
  app.use('/api', createRoutes(
    routeController,
    complianceController,
    bankingController,
    poolingController
  ));

  // Error handling
  app.use(ErrorHandler.handle);

  // Health check
  app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  return app;
}


