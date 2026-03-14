/**
 * Compliance Controller
 * REST endpoints for compliance operations
 */

import { Request, Response } from 'express';
import { IComplianceRepository } from '../../../../core/ports/outbound/IComplianceRepository';
import { IRouteRepository } from '../../../../core/ports/outbound/IRouteRepository';
import { IPoolingRepository } from '../../../../core/ports/outbound/IPoolingRepository';
import { ComputeComplianceBalance } from '../../../../core/application/use-cases/compliance/ComputeComplianceBalance';

export class ComplianceController {
  private computeComplianceBalance: ComputeComplianceBalance;

  constructor(
    private routeRepository: IRouteRepository,
    private complianceRepository: IComplianceRepository,
    private poolingRepository: IPoolingRepository
  ) {
    this.computeComplianceBalance = new ComputeComplianceBalance(
      routeRepository,
      complianceRepository
    );
  }

  async getComplianceBalance(req: Request, res: Response): Promise<void> {
    try {
      const { shipId, year } = req.query;

      if (!shipId || !year) {
        res.status(400).json({ error: 'shipId and year are required' });
        return;
      }

      const cb = await this.computeComplianceBalance.execute(
        shipId as string,
        parseInt(year as string, 10)
      );

      res.status(200).json(cb);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getCB(req: Request, res: Response): Promise<void> {
    try {
      const { year } = req.query;

      if (!year) {
        res.status(400).json({ error: 'year is required' });
        return;
      }

      const yearNum = parseInt(year as string, 10);
      const compliances = await this.complianceRepository.findAllByYear(yearNum);

      res.status(200).json(compliances);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAdjustedCB(req: Request, res: Response): Promise<void> {
    try {
      const { year } = req.query;

      if (!year) {
        res.status(400).json({ error: 'year is required' });
        return;
      }

      const yearNum = parseInt(year as string, 10);
      const adjustedCBs = await this.poolingRepository.getAllAdjustedCB(yearNum);

      res.status(200).json(adjustedCBs);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
