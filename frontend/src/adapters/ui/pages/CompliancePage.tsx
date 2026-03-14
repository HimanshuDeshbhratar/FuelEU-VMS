/**
 * Compliance Page
 * Page-level component for compliance
 */

import React from 'react';
import { ComplianceDashboard } from '../components/compliance/ComplianceDashboard';
import { ComplianceChart } from '../components/compliance/ComplianceChart';
import { ComplianceTable } from '../components/compliance/ComplianceTable';
import { useCompliance } from '../hooks/useCompliance';

export const CompliancePage: React.FC = () => {
  const { complianceData, loading, exportReport } = useCompliance();

  const handleExport = async (companyId: string, period: string) => {
    await exportReport(companyId, period);
  };

  return (
    <div className="compliance-page">
      <h1>Compliance Management</h1>
      <ComplianceDashboard complianceData={complianceData} loading={loading} />
      <ComplianceChart data={complianceData} />
      <ComplianceTable data={complianceData} />
    </div>
  );
};



