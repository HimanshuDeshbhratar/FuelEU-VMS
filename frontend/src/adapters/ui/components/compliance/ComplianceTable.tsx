/**
 * Compliance Table Component
 * React component for compliance data table
 */

import React from 'react';
import { ComplianceBalance } from '../../../../core/domain/models/ComplianceBalance';

interface ComplianceTableProps {
  data: ComplianceBalance[];
  onRowClick?: (balance: ComplianceBalance) => void;
}

export const ComplianceTable: React.FC<ComplianceTableProps> = ({ data, onRowClick }) => {
  return (
    <table className="compliance-table">
      <thead>
        <tr>
          <th>Period</th>
          <th>Status</th>
          <th>Compliance Balance</th>
          <th>Required</th>
          <th>Surplus</th>
          <th>Deficit</th>
        </tr>
      </thead>
      <tbody>
        {data.map((balance) => (
          <tr key={balance.id} onClick={() => onRowClick?.(balance)}>
            <td>{balance.period}</td>
            <td>{balance.status}</td>
            <td>{balance.complianceBalance}</td>
            <td>{balance.requiredCompliance}</td>
            <td>{balance.surplus}</td>
            <td>{balance.deficit}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};



