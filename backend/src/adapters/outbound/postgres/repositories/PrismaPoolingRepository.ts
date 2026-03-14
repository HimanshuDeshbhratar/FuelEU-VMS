/**
 * Prisma Pooling Repository
 * Implementation of IPoolingRepository using Prisma
 */

import { PrismaClient } from '@prisma/client';
import { IPoolingRepository } from '../../../../core/ports/outbound/IPoolingRepository';
import { PoolingDTO, PoolMemberDTO, AdjustedCBDTO } from '../../../../core/application/dto/PoolingDTO';

export class PrismaPoolingRepository implements IPoolingRepository {
  constructor(private prisma: PrismaClient) {}

  async createPool(pool: PoolingDTO): Promise<PoolingDTO> {
    const created = await this.prisma.pools.create({
      data: {
        year: pool.year,
        PoolMembers: {
          create: pool.members.map((m) => ({
            ship_id: m.shipId,
            cb_before: m.cbBefore,
            cb_after: m.cbAfter,
          })),
        },
      },
      include: {
        PoolMembers: true,
      },
    });

    return {
      poolId: created.id,
      year: created.year,
      members: created.PoolMembers.map((m) => ({
        shipId: m.ship_id,
        cbBefore: m.cb_before,
        cbAfter: m.cb_after,
      })),
    };
  }

  async getPoolById(poolId: number): Promise<PoolingDTO | null> {
    const pool = await this.prisma.pools.findUnique({
      where: { id: poolId },
      include: {
        PoolMembers: true,
      },
    });

    if (!pool) {
      return null;
    }

    return {
      poolId: pool.id,
      year: pool.year,
      members: pool.PoolMembers.map((m) => ({
        shipId: m.ship_id,
        cbBefore: m.cb_before,
        cbAfter: m.cb_after,
      })),
    };
  }

  async getAdjustedCB(shipId: string, year: number): Promise<number> {
    // Get the latest pool membership for this ship in this year
    const poolMember = await this.prisma.poolMembers.findFirst({
      where: {
        ship_id: shipId,
        Pools: {
          year,
        },
      },
      orderBy: {
        id: 'desc',
      },
      include: {
        Pools: true,
      },
    });

    if (poolMember) {
      return poolMember.cb_after;
    }

    // If not in a pool, return the original compliance balance
    const compliance = await this.prisma.shipCompliance.findFirst({
      where: {
        ship_id: shipId,
        year,
      },
    });

    return compliance?.cb_gco2eq ?? 0;
  }

  async getAllAdjustedCB(year: number): Promise<AdjustedCBDTO[]> {
    // Get all ships with compliance balances for this year
    const compliances = await this.prisma.shipCompliance.findMany({
      where: { year },
    });

    const result: AdjustedCBDTO[] = [];

    for (const compliance of compliances) {
      const adjustedCB = await this.getAdjustedCB(compliance.ship_id, year);
      result.push({
        shipId: compliance.ship_id,
        year,
        adjustedCB,
      });
    }

    return result;
  }
}

