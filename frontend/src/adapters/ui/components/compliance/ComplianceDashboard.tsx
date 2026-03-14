/**
 * Compliance Dashboard Component
 * React component for compliance dashboard
 */

import React from 'react';
import { ComplianceBalance } from '../../../../core/domain/models/ComplianceBalance';

interface ComplianceDashboardProps {
  complianceData: ComplianceBalance[];
  loading?: boolean;
}

export const ComplianceDashboard: React.FC<ComplianceDashboardProps> = ({ complianceData, loading }) => {
  if (loading) {
    return <div>Loading compliance data...</div>;
  }

  return (
    <div className="compliance-dashboard">
      <h2>Compliance Dashboard</h2>
      <div className="compliance-summary">
        {complianceData.map((balance) => (
          <div key={balance.id} className="compliance-card">
            <h3>Period: {balance.period}</h3>
            <div>Status: {balance.status}</div>
            <div>Compliance Balance: {balance.complianceBalance}</div>
            <div>Required: {balance.requiredCompliance}</div>
            <div>Surplus: {balance.surplus}</div>
            <div>Deficit: {balance.deficit}</div>
          </div>
        ))}
      </div>
    </div>
  );
};



