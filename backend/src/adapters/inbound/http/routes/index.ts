/**
 * API Routes
 * Express route definitions
 */

import { Router } from 'express';
import { RouteController } from '../controllers/RouteController';
import { ComplianceController } from '../controllers/ComplianceController';
import { BankingController } from '../controllers/BankingController';
import { PoolingController } from '../controllers/PoolingController';

export function createRoutes(
  routeController: RouteController,
  complianceController: ComplianceController,
  bankingController: BankingController,
  poolingController: PoolingController
): Router {
  const router = Router();

  // Routes endpoints
  router.get('/routes', (req, res) => routeController.getAllRoutes(req, res));
  router.get('/routes/comparison', (req, res) => routeController.getComparison(req, res));
  router.get('/routes/:routeId', (req, res) => routeController.getRouteById(req, res));
  router.post('/routes/:routeId/baseline', (req, res) => routeController.setBaseline(req, res));
  

  // Compliance endpoints
  router.get('/compliance/cb', (req, res) => complianceController.getCB(req, res));
  router.get('/compliance/balance', (req, res) => complianceController.getComplianceBalance(req, res));
  router.get('/compliance/adjusted-cb', (req, res) => complianceController.getAdjustedCB(req, res));

  // Banking endpoints
  router.post('/banking/bank', (req, res) => bankingController.bank(req, res));
  router.post('/banking/apply', (req, res) => bankingController.apply(req, res));
  router.get('/banking/balance', (req, res) => bankingController.getBankingBalance(req, res));

  // Pooling endpoints
  router.post('/pools', (req, res) => poolingController.create(req, res));
  router.get('/pools/:poolId', (req, res) => poolingController.getPool(req, res));
  router.get('/pools/adjusted-cb', (req, res) => poolingController.getAdjustedCB(req, res));

  return router;
}
