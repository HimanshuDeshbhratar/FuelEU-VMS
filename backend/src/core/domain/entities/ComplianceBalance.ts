/**
 * Compliance Balance Entity
 * Represents compliance balance for a company in a period
 */

import { CompliancePeriod } from '../value-objects/CompliancePeriod';

export class ComplianceBalance {
  private constructor(
    private readonly id: string,
    private readonly companyId: string,
    private readonly period: CompliancePeriod,
    private readonly complianceBalance: number,
    private readonly requiredCompliance: number,
    private readonly surplus: number,
    private readonly deficit: number
  ) {
    if (complianceBalance < 0 && deficit === 0) {
      throw new Error('Invalid compliance balance state');
    }
  }

  static create(
    id: string,
    companyId: string,
    period: CompliancePeriod,
    complianceBalance: number,
    requiredCompliance: number
  ): ComplianceBalance {
    const surplus = Math.max(0, complianceBalance - requiredCompliance);
    const deficit = Math.max(0, requiredCompliance - complianceBalance);

    return new ComplianceBalance(
      id,
      companyId,
      period,
      complianceBalance,
      requiredCompliance,
      surplus,
      deficit
    );
  }

  getId(): string {
    return this.id;
  }

  getCompanyId(): string {
    return this.companyId;
  }

  getPeriod(): CompliancePeriod {
    return this.period;
  }

  getComplianceBalance(): number {
    return this.complianceBalance;
  }

  getRequiredCompliance(): number {
    return this.requiredCompliance;
  }

  getSurplus(): number {
    return this.surplus;
  }

  getDeficit(): number {
    return this.deficit;
  }

  isCompliant(): boolean {
    return this.deficit === 0;
  }

  canBank(): boolean {
    return this.surplus > 0;
  }

  equals(other: ComplianceBalance): boolean {
    return this.id === other.id;
  }
}



