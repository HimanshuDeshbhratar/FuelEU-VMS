/**
 * Banking Account Entity
 * Represents a banking account for compliance surplus
 */

import { CompliancePeriod } from '../value-objects/CompliancePeriod';

export enum BankingTransactionType {
  DEPOSIT = 'DEPOSIT',
  WITHDRAWAL = 'WITHDRAWAL',
}

export class BankingAccount {
  private constructor(
    private readonly id: string,
    private readonly companyId: string,
    private balance: number,
    private transactions: BankingTransaction[] = []
  ) {
    if (!id || id.trim().length === 0) {
      throw new Error('Banking account ID is required');
    }
    if (balance < 0) {
      throw new Error('Banking account balance cannot be negative');
    }
  }

  static create(id: string, companyId: string, initialBalance: number = 0): BankingAccount {
    return new BankingAccount(id, companyId, initialBalance);
  }

  getId(): string {
    return this.id;
  }

  getCompanyId(): string {
    return this.companyId;
  }

  getBalance(): number {
    return this.balance;
  }

  getTransactions(): BankingTransaction[] {
    return [...this.transactions];
  }

  deposit(amount: number, period: CompliancePeriod): BankingTransaction {
    if (amount <= 0) {
      throw new Error('Deposit amount must be positive');
    }

    this.balance += amount;
    const transaction = BankingTransaction.create(
      this.companyId,
      period,
      amount,
      BankingTransactionType.DEPOSIT,
      this.balance
    );
    this.transactions.push(transaction);
    return transaction;
  }

  withdraw(amount: number, period: CompliancePeriod): BankingTransaction {
    if (amount <= 0) {
      throw new Error('Withdrawal amount must be positive');
    }
    if (amount > this.balance) {
      throw new Error('Insufficient balance for withdrawal');
    }

    this.balance -= amount;
    const transaction = BankingTransaction.create(
      this.companyId,
      period,
      amount,
      BankingTransactionType.WITHDRAWAL,
      this.balance
    );
    this.transactions.push(transaction);
    return transaction;
  }

  canWithdraw(amount: number): boolean {
    return amount > 0 && amount <= this.balance;
  }

  equals(other: BankingAccount): boolean {
    return this.id === other.id;
  }
}

export class BankingTransaction {
  private constructor(
    private readonly id: string,
    private readonly companyId: string,
    private readonly period: CompliancePeriod,
    private readonly amount: number,
    private readonly type: BankingTransactionType,
    private readonly balance: number,
    private readonly createdAt: Date
  ) {}

  static create(
    companyId: string,
    period: CompliancePeriod,
    amount: number,
    type: BankingTransactionType,
    balance: number
  ): BankingTransaction {
    return new BankingTransaction(
      crypto.randomUUID(),
      companyId,
      period,
      amount,
      type,
      balance,
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

  getAmount(): number {
    return this.amount;
  }

  getType(): BankingTransactionType {
    return this.type;
  }

  getBalance(): number {
    return this.balance;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }
}



