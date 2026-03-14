/**
 * Route Controller
 * REST endpoints for route operations
 */

import { Request, Response } from 'express';
import { IRouteRepository } from '../../../../core/ports/outbound/IRouteRepository';
import { SetBaselineRoute } from '../../../../core/application/use-cases/routes/SetBaselineRoute';
import { CompareRoutes } from '../../../../core/application/use-cases/routes/CompareRoutes';

export class RouteController {
  private setBaselineRoute: SetBaselineRoute;
  private compareRoutes: CompareRoutes;

  constructor(private routeRepository: IRouteRepository) {
    this.setBaselineRoute = new SetBaselineRoute(routeRepository);
    this.compareRoutes = new CompareRoutes(routeRepository);
  }

  async getAllRoutes(req: Request, res: Response): Promise<void> {
    try {
      const { vesselType, fuelType, year } = req.query;
      
      const filters: any = {};
      if (vesselType) filters.vesselType = vesselType as string;
      if (fuelType) filters.fuelType = fuelType as string;
      if (year) filters.year = parseInt(year as string, 10);

      const routes = Object.keys(filters).length > 0
        ? await this.routeRepository.findByFilters(filters)
        : await this.routeRepository.findAll();

      res.status(200).json(routes);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getRouteById(req: Request, res: Response): Promise<void> {
    try {
      const { routeId } = req.params;
      const route = await this.routeRepository.findByRouteId(routeId);
      
      if (!route) {
        res.status(404).json({ error: 'Route not found' });
        return;
      }

      res.status(200).json(route);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async setBaseline(req: Request, res: Response): Promise<void> {
    try {
      const { routeId } = req.params;
      await this.setBaselineRoute.execute(routeId);
      res.status(200).json({ message: 'Baseline route set successfully' });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getComparison(req: Request, res: Response): Promise<void> {
    try {
      const { year } = req.query;
      const yearNum = year ? parseInt(year as string, 10) : undefined;
      const comparison = await this.compareRoutes.execute(yearNum);
      res.status(200).json(comparison);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
