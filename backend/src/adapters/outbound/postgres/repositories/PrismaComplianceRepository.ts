/**
 * Prisma Compliance Repository
 * Implementation of IComplianceRepository using Prisma
 */

import { PrismaClient } from '@prisma/client';
import { IComplianceRepository } from '../../../../core/ports/outbound/IComplianceRepository';
import { ComplianceBalanceDTO } from '../../../../core/application/dto/ComplianceBalanceDTO';

export class PrismaComplianceRepository implements IComplianceRepository {
  constructor(private prisma: PrismaClient) {}

  async save(compliance: ComplianceBalanceDTO): Promise<ComplianceBalanceDTO> {
    await this.prisma.shipCompliance.upsert({
      where: { ship_id: compliance.shipId },
      update: {
        year: compliance.year,
        cb_gco2eq: compliance.cbGco2eq,
      },
      create: {
        ship_id: compliance.shipId,
        year: compliance.year,
        cb_gco2eq: compliance.cbGco2eq,
      },
    });

    return compliance;
  }

  async findByShipId(shipId: string): Promise<ComplianceBalanceDTO | null> {
    const compliance = await this.prisma.shipCompliance.findUnique({
      where: { ship_id: shipId },
    });

    return compliance ? this.toDTO(compliance) : null;
  }

  async findByShipIdAndYear(shipId: string, year: number): Promise<ComplianceBalanceDTO | null> {
    const compliance = await this.prisma.shipCompliance.findFirst({
      where: {
        ship_id: shipId,
        year,
      },
    });

    return compliance ? this.toDTO(compliance) : null;
  }

  async update(shipId: string, compliance: Partial<ComplianceBalanceDTO>): Promise<ComplianceBalanceDTO> {
    await this.prisma.shipCompliance.update({
      where: { ship_id: shipId },
      data: {
        ...(compliance.year !== undefined && { year: compliance.year }),
        ...(compliance.cbGco2eq !== undefined && { cb_gco2eq: compliance.cbGco2eq }),
      },
    });

    const updated = await this.findByShipId(shipId);
    if (!updated) {
      throw new Error(`Compliance for ship ${shipId} not found after update`);
    }

    return updated;
  }

  async findAllByYear(year: number): Promise<ComplianceBalanceDTO[]> {
    const compliances = await this.prisma.shipCompliance.findMany({
      where: { year },
    });

    return compliances.map((c) => this.toDTO(c));
  }

  private toDTO(compliance: any): ComplianceBalanceDTO {
    return {
      shipId: compliance.ship_id,
      year: compliance.year,
      cbGco2eq: compliance.cb_gco2eq ?? 0,
    };
  }
}

