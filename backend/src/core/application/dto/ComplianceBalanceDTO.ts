/**
 * Compliance Balance Data Transfer Object
 * Data transfer object for compliance balance information
 */

export interface ComplianceBalanceDTO {
  shipId: string;
  year: number;
  cbGco2eq: number; // Compliance Balance in gCO2eq
}
