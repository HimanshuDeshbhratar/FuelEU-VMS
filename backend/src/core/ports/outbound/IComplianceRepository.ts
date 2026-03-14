/**
 * Compliance Repository Interface
 * Outbound port for compliance persistence operations
 */

import { ComplianceBalanceDTO } from '../../application/dto/ComplianceBalanceDTO';

export interface IComplianceRepository {
  save(compliance: ComplianceBalanceDTO): Promise<ComplianceBalanceDTO>;
  findByShipId(shipId: string): Promise<ComplianceBalanceDTO | null>;
  findByShipIdAndYear(shipId: string, year: number): Promise<ComplianceBalanceDTO | null>;
  update(shipId: string, compliance: Partial<ComplianceBalanceDTO>): Promise<ComplianceBalanceDTO>;
  findAllByYear(year: number): Promise<ComplianceBalanceDTO[]>;
}
