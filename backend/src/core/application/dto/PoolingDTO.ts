/**
 * Pooling Data Transfer Object
 * Data transfer object for pooling operations
 */

export interface PoolingDTO {
  poolId?: number;
  year: number;
  members: PoolMemberDTO[];
}

export interface PoolMemberDTO {
  shipId: string;
  cbBefore: number;
  cbAfter: number;
}

export interface AdjustedCBDTO {
  shipId: string;
  year: number;
  adjustedCB: number; // Adjusted Compliance Balance
}

