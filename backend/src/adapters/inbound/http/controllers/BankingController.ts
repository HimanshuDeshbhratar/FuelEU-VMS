/**
 * Banking Controller
 * REST endpoints for banking operations
 */

import { Request, Response } from 'express';
import { IComplianceRepository } from '../../../../core/ports/outbound/IComplianceRepository';
import { IBankingRepository } from '../../../../core/ports/outbound/IBankingRepository';
import { BankSurplus } from '../../../../core/application/use-cases/banking/BankSurplus';
import { ApplyBanked } from '../../../../core/application/use-cases/banking/ApplyBanked';

export class BankingController {
  private bankSurplus: BankSurplus;
  private applyBanked: ApplyBanked;

  constructor(
    private complianceRepository: IComplianceRepository,
    private bankingRepository: IBankingRepository
  ) {
    this.bankSurplus = new BankSurplus(complianceRepository, bankingRepository);
    this.applyBanked = new ApplyBanked(complianceRepository, bankingRepository);
  }

  async bank(req: Request, res: Response): Promise<void> {
    try {
      const { shipId, year } = req.body;

      if (!shipId || !year) {
        res.status(400).json({ error: 'shipId and year are required' });
        return;
      }

      const bankingEntry = await this.bankSurplus.execute(shipId, year);
      res.status(201).json(bankingEntry);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async apply(req: Request, res: Response): Promise<void> {
    try {
      const { shipId, year, amount } = req.body;

      if (!shipId || !year || !amount) {
        res.status(400).json({ error: 'shipId, year, and amount are required' });
        return;
      }

      await this.applyBanked.execute(shipId, year, amount);
      res.status(200).json({ message: 'Banked amount applied successfully' });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getBankingBalance(req: Request, res: Response): Promise<void> {
    try {
      const { shipId, year } = req.query;

      if (!shipId || !year) {
        res.status(400).json({ error: 'shipId and year are required' });
        return;
      }

      const totalBanked = await this.bankingRepository.getTotalBanked(
        shipId as string,
        parseInt(year as string, 10)
      );

      res.status(200).json({ totalBanked });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
