/**
 * Banking Overview Component
 * React component for banking account overview
 */

import React from 'react';
import { BankingAccount } from '../../../../core/domain/models/BankingAccount';

interface BankingOverviewProps {
  account: BankingAccount | null;
  loading?: boolean;
}

export const BankingOverview: React.FC<BankingOverviewProps> = ({ account, loading }) => {
  if (loading) {
    return <div>Loading banking data...</div>;
  }

  if (!account) {
    return <div>No banking account found</div>;
  }

  return (
    <div className="banking-overview">
      <h2>Banking Overview</h2>
      <div className="balance-card">
        <h3>Current Balance</h3>
        <div className="balance-amount">{account.balance}</div>
      </div>
      <div className="recent-transactions">
        <h3>Recent Transactions</h3>
        <ul>
          {account.transactions.slice(0, 5).map((transaction) => (
            <li key={transaction.id}>
              <div>
                <strong>{transaction.type}</strong>
              </div>
              <div>Amount: {transaction.amount}</div>
              <div>Balance: {transaction.balance}</div>
              <div>Date: {transaction.createdAt.toLocaleDateString()}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};



