/**
 * Prisma Banking Repository
 * Implementation of IBankingRepository using Prisma
 */

import { PrismaClient } from '@prisma/client';
import { IBankingRepository } from '../../../../core/ports/outbound/IBankingRepository';
import { BankingDTO } from '../../../../core/application/dto/BankingDTO';

export class PrismaBankingRepository implements IBankingRepository {
  constructor(private prisma: PrismaClient) {}

  async save(banking: BankingDTO): Promise<BankingDTO> {
    const created = await this.prisma.bankEntries.create({
      data: {
        ship_id: banking.shipId,
        year: banking.year,
        amount_gco2eq: banking.amountGco2eq,
      },
    });

    return this.toDTO(created);
  }

  async findByShipId(shipId: string): Promise<BankingDTO[]> {
    const entries = await this.prisma.bankEntries.findMany({
      where: { ship_id: shipId },
    });

    return entries.map((e) => this.toDTO(e));
  }

  async findByShipIdAndYear(shipId: string, year: number): Promise<BankingDTO[]> {
    const entries = await this.prisma.bankEntries.findMany({
      where: {
        ship_id: shipId,
        year,
      },
    });

    return entries.map((e) => this.toDTO(e));
  }

  async getTotalBanked(shipId: string, year: number): Promise<number> {
    const result = await this.prisma.bankEntries.aggregate({
      where: {
        ship_id: shipId,
        year,
      },
      _sum: {
        amount_gco2eq: true,
      },
    });

    return result._sum.amount_gco2eq ?? 0;
  }

  private toDTO(entry: any): BankingDTO {
    return {
      id: entry.id,
      shipId: entry.ship_id,
      year: entry.year,
      amountGco2eq: entry.amount_gco2eq,
    };
  }
}

