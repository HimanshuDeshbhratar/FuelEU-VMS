/**
 * Banking Data Transfer Object
 * Data transfer object for banking operations
 */

export interface BankingDTO {
  id?: number;
  shipId: string;
  year: number;
  amountGco2eq: number;
}
