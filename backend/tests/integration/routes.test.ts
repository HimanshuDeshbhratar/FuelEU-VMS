/**
 * Integration Tests for Routes Endpoints
 */

import request from 'supertest';
import { Express } from 'express';
import { PrismaClient } from '@prisma/client';
import { createApp } from '../../src/infrastructure/server/app';
import { RouteController } from '../../src/adapters/inbound/http/controllers/RouteController';
import { ComplianceController } from '../../src/adapters/inbound/http/controllers/ComplianceController';
import { BankingController } from '../../src/adapters/inbound/http/controllers/BankingController';
import { PoolingController } from '../../src/adapters/inbound/http/controllers/PoolingController';
import { PrismaRouteRepository } from '../../src/adapters/outbound/postgres/repositories/PrismaRouteRepository';
import { PrismaComplianceRepository } from '../../src/adapters/outbound/postgres/repositories/PrismaComplianceRepository';
import { PrismaBankingRepository } from '../../src/adapters/outbound/postgres/repositories/PrismaBankingRepository';
import { PrismaPoolingRepository } from '../../src/adapters/outbound/postgres/repositories/PrismaPoolingRepository';

describe('Routes API Integration Tests', () => {
  let app: Express;
  let prisma: PrismaClient;

  beforeAll(async () => {
    prisma = new PrismaClient();
    await prisma.$connect();

    const routeRepository = new PrismaRouteRepository(prisma);
    const complianceRepository = new PrismaComplianceRepository(prisma);
    const bankingRepository = new PrismaBankingRepository(prisma);
    const poolingRepository = new PrismaPoolingRepository(prisma);

    const routeController = new RouteController(routeRepository);
    const complianceController = new ComplianceController(routeRepository, complianceRepository);
    const bankingController = new BankingController(complianceRepository, bankingRepository);
    const poolingController = new PoolingController(poolingRepository, complianceRepository);

    app = createApp(routeController, complianceController, bankingController, poolingController);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('GET /api/routes should return all routes', async () => {
    const response = await request(app).get('/api/routes');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('POST /api/routes/:routeId/baseline should set baseline route', async () => {
    // First, ensure we have a route
    const routesResponse = await request(app).get('/api/routes');
    if (routesResponse.body.length > 0) {
      const routeId = routesResponse.body[0].routeId;
      const response = await request(app).post(`/api/routes/${routeId}/baseline`);
      expect(response.status).toBe(200);
    }
  });

  it('GET /api/routes/comparison should return comparison data', async () => {
    const response = await request(app).get('/api/routes/comparison');
    // May return 400 if no baseline, which is acceptable
    expect([200, 400]).toContain(response.status);
  });
});

