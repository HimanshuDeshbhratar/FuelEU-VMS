/**
 * Banking Page
 * Page-level component for banking
 */

import React from 'react';
import { BankingOverview } from '../components/banking/BankingOverview';
import { BankingTransactions } from '../components/banking/BankingTransactions';
import { useBanking } from '../hooks/useBanking';

export const BankingPage: React.FC = () => {
  const { account, loading, transactions } = useBanking();

  return (
    <div className="banking-page">
      <h1>Banking Management</h1>
      <BankingOverview account={account} loading={loading} />
      <BankingTransactions transactions={transactions} loading={loading} />
    </div>
  );
};



