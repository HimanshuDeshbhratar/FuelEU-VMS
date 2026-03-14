/**
 * Dashboard Page
 * Main dashboard page
 */

import React from 'react';
import { ComplianceDashboard } from '../components/compliance/ComplianceDashboard';
import { BankingOverview } from '../components/banking/BankingOverview';

export const DashboardPage: React.FC = () => {
  return (
    <div className="dashboard-page">
      <h1>Dashboard</h1>
      <div className="dashboard-grid">
        <div className="dashboard-section">
          <h2>Compliance Overview</h2>
          <ComplianceDashboard complianceData={[]} />
        </div>
        <div className="dashboard-section">
          <h2>Banking Overview</h2>
          <BankingOverview account={null} />
        </div>
      </div>
    </div>
  );
};



