/**
 * Pooling Repository Interface
 * Outbound port for pooling persistence operations
 */

import { PoolingDTO, AdjustedCBDTO } from '../../application/dto/PoolingDTO';

export interface IPoolingRepository {
  createPool(pool: PoolingDTO): Promise<PoolingDTO>;
  getPoolById(poolId: number): Promise<PoolingDTO | null>;
  getAdjustedCB(shipId: string, year: number): Promise<number>;
  getAllAdjustedCB(year: number): Promise<AdjustedCBDTO[]>;
}
