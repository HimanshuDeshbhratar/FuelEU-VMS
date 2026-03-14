/**
 * HTTP Server Startup
 * Server initialization and startup with dependency injection
 */

import { PrismaClient } from '@prisma/client';
import { createApp } from './app';
import { getConfig } from '../config';
import { RouteController } from '../../adapters/inbound/http/controllers/RouteController';
import { ComplianceController } from '../../adapters/inbound/http/controllers/ComplianceController';
import { BankingController } from '../../adapters/inbound/http/controllers/BankingController';
import { PoolingController } from '../../adapters/inbound/http/controllers/PoolingController';
import { PrismaRouteRepository } from '../../adapters/outbound/postgres/repositories/PrismaRouteRepository';
import { PrismaComplianceRepository } from '../../adapters/outbound/postgres/repositories/PrismaComplianceRepository';
import { PrismaBankingRepository } from '../../adapters/outbound/postgres/repositories/PrismaBankingRepository';
import { PrismaPoolingRepository } from '../../adapters/outbound/postgres/repositories/PrismaPoolingRepository';

export async function startServer(): Promise<void> {
  const config = getConfig();

  // Initialize Prisma Client
  const prisma = new PrismaClient();

  try {
    // Test database connection
    await prisma.$connect();
    console.log('Database connected successfully');

    // Initialize repositories (outbound adapters)
    const routeRepository = new PrismaRouteRepository(prisma);
    const complianceRepository = new PrismaComplianceRepository(prisma);
    const bankingRepository = new PrismaBankingRepository(prisma);
    const poolingRepository = new PrismaPoolingRepository(prisma);

    // Initialize controllers (inbound adapters)
    const routeController = new RouteController(routeRepository);
    const complianceController = new ComplianceController(
      routeRepository,
      complianceRepository,
      poolingRepository
    );
    const bankingController = new BankingController(
      complianceRepository,
      bankingRepository
    );
    const poolingController = new PoolingController(
      poolingRepository,
      complianceRepository
    );

    // Create Express app
    const app = createApp(
      routeController,
      complianceController,
      bankingController,
      poolingController
    );

    // Start server
    const port = config.server.port || 3000;
    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
      console.log(`📊 Health check: http://localhost:${port}/health`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    await prisma.$disconnect();
    process.exit(1);
  }
}
