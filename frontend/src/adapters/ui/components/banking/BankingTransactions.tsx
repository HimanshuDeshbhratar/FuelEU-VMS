/**
 * Banking Transactions Component
 * React component for banking transactions list
 */

import React from 'react';
import { BankingTransaction } from '../../../../core/domain/models/BankingAccount';

interface BankingTransactionsProps {
  transactions: BankingTransaction[];
  loading?: boolean;
}

export const BankingTransactions: React.FC<BankingTransactionsProps> = ({ transactions, loading }) => {
  if (loading) {
    return <div>Loading transactions...</div>;
  }

  return (
    <div className="banking-transactions">
      <h2>Banking Transactions</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Balance</th>
            <th>Period</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.createdAt.toLocaleDateString()}</td>
              <td>{transaction.type}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.balance}</td>
              <td>{transaction.period}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};



