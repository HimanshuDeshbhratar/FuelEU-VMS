/**
 * Pooling Controller
 * REST endpoints for pooling operations
 */

import { Request, Response } from 'express';
import { IPoolingRepository } from '../../../../core/ports/outbound/IPoolingRepository';
import { IComplianceRepository } from '../../../../core/ports/outbound/IComplianceRepository';
import { CreatePool } from '../../../../core/application/use-cases/pooling/CreatePool';

export class PoolingController {
  private createPool: CreatePool;

  constructor(
    private poolingRepository: IPoolingRepository,
    private complianceRepository: IComplianceRepository
  ) {
    this.createPool = new CreatePool(poolingRepository, complianceRepository);
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const { year, shipIds } = req.body;

      if (!year || !shipIds || !Array.isArray(shipIds) || shipIds.length < 2) {
        res.status(400).json({ 
          error: 'year and shipIds (array with at least 2 ships) are required' 
        });
        return;
      }

      const pool = await this.createPool.execute(year, shipIds);
      res.status(201).json(pool);
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

  async getPool(req: Request, res: Response): Promise<void> {
    try {
      const { poolId } = req.params;
      const pool = await this.poolingRepository.getPoolById(parseInt(poolId, 10));

      if (!pool) {
        res.status(404).json({ error: 'Pool not found' });
        return;
      }

      res.status(200).json(pool);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
