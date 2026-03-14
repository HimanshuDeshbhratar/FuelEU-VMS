/**
 * Compliance Report Aggregate
 * Aggregates compliance data for reporting
 */

import { ComplianceBalance } from '../entities/ComplianceBalance';
import { BankingAccount } from '../entities/BankingAccount';
import { CompliancePeriod } from '../value-objects/CompliancePeriod';

export class ComplianceReport {
  private constructor(
    private readonly id: string,
    private readonly companyId: string,
    private readonly period: CompliancePeriod,
    private readonly complianceBalance: ComplianceBalance,
    private readonly bankingAccount: BankingAccount | null,
    private readonly routes: any[], // TODO: Import Route entity
    private readonly generatedAt: Date
  ) {}

  static create(
    id: string,
    companyId: string,
    period: CompliancePeriod,
    complianceBalance: ComplianceBalance,
    bankingAccount: BankingAccount | null,
    routes: any[]
  ): ComplianceReport {
    return new ComplianceReport(
      id,
      companyId,
      period,
      complianceBalance,
      bankingAccount,
      routes,
      new Date()
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

  getComplianceBalance(): ComplianceBalance {
    return this.complianceBalance;
  }

  getBankingAccount(): BankingAccount | null {
    return this.bankingAccount;
  }

  getRoutes(): any[] {
    return [...this.routes];
  }

  getGeneratedAt(): Date {
    return this.generatedAt;
  }

  getTotalEmissions(): number {
    // TODO: Calculate total emissions from routes
    return this.routes.reduce((sum, route) => sum + (route.calculateEmissions?.() || 0), 0);
  }

  isCompliant(): boolean {
    return this.complianceBalance.isCompliant();
  }

  getAvailableBankingBalance(): number {
    return this.bankingAccount?.getBalance() || 0;
  }
}



