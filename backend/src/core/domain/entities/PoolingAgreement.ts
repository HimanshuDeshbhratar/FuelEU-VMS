/**
 * Pooling Agreement Entity
 * Represents a pooling agreement between multiple fuel suppliers
 */

import { CompliancePeriod } from '../value-objects/CompliancePeriod';

export enum PoolingAgreementStatus {
  ACTIVE = 'ACTIVE',
  DISSOLVED = 'DISSOLVED',
}

export class PoolingAgreement {
  private constructor(
    private readonly id: string,
    private readonly period: CompliancePeriod,
    private status: PoolingAgreementStatus,
    private participants: PoolingParticipant[],
    private totalCompliance: number,
    private readonly createdAt: Date
  ) {
    if (!id || id.trim().length === 0) {
      throw new Error('Pooling agreement ID is required');
    }
    if (participants.length < 2) {
      throw new Error('Pooling agreement must have at least 2 participants');
    }
    const totalAllocation = participants.reduce((sum, p) => sum + p.getAllocationPercentage(), 0);
    if (Math.abs(totalAllocation - 100) > 0.01) {
      throw new Error('Total allocation percentage must equal 100%');
    }
  }

  static create(
    id: string,
    period: CompliancePeriod,
    participants: PoolingParticipant[]
  ): PoolingAgreement {
    return new PoolingAgreement(
      id,
      period,
      PoolingAgreementStatus.ACTIVE,
      participants,
      0,
      new Date()
    );
  }

  getId(): string {
    return this.id;
  }

  getPeriod(): CompliancePeriod {
    return this.period;
  }

  getStatus(): PoolingAgreementStatus {
    return this.status;
  }

  getParticipants(): PoolingParticipant[] {
    return [...this.participants];
  }

  getTotalCompliance(): number {
    return this.totalCompliance;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  addCompliance(amount: number): void {
    if (amount < 0) {
      throw new Error('Compliance amount cannot be negative');
    }
    this.totalCompliance += amount;
  }

  allocateCompliance(): void {
    if (this.status !== PoolingAgreementStatus.ACTIVE) {
      throw new Error('Cannot allocate compliance for dissolved agreement');
    }

    this.participants.forEach((participant) => {
      const allocation = (this.totalCompliance * participant.getAllocationPercentage()) / 100;
      participant.setAllocatedCompliance(allocation);
    });
  }

  dissolve(): void {
    if (this.status === PoolingAgreementStatus.DISSOLVED) {
      throw new Error('Agreement is already dissolved');
    }
    this.status = PoolingAgreementStatus.DISSOLVED;
  }

  isActive(): boolean {
    return this.status === PoolingAgreementStatus.ACTIVE;
  }

  equals(other: PoolingAgreement): boolean {
    return this.id === other.id;
  }
}

export class PoolingParticipant {
  private constructor(
    private readonly companyId: string,
    private allocationPercentage: number,
    private allocatedCompliance: number = 0
  ) {
    if (allocationPercentage < 0 || allocationPercentage > 100) {
      throw new Error('Allocation percentage must be between 0 and 100');
    }
  }

  static create(companyId: string, allocationPercentage: number): PoolingParticipant {
    return new PoolingParticipant(companyId, allocationPercentage);
  }

  getCompanyId(): string {
    return this.companyId;
  }

  getAllocationPercentage(): number {
    return this.allocationPercentage;
  }

  getAllocatedCompliance(): number {
    return this.allocatedCompliance;
  }

  setAllocatedCompliance(amount: number): void {
    this.allocatedCompliance = amount;
  }

  setAllocationPercentage(percentage: number): void {
    if (percentage < 0 || percentage > 100) {
      throw new Error('Allocation percentage must be between 0 and 100');
    }
    this.allocationPercentage = percentage;
  }
}



