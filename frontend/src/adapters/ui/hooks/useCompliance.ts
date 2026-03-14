/**
 * useCompliance Hook
 * Custom React hook for compliance operations
 */

import { useState, useEffect } from 'react';
import { ComplianceBalance } from '../../../core/domain/models/ComplianceBalance';
import { LoadComplianceData } from '../../../core/application/use-cases/compliance/LoadComplianceData';
import { ExportComplianceReport } from '../../../core/application/use-cases/compliance/ExportComplianceReport';

export function useCompliance(companyId?: string) {
  const [complianceData, setComplianceData] = useState<ComplianceBalance[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // TODO: Initialize use cases with proper dependencies
  const loadComplianceData = new LoadComplianceData({} as any);
  const exportComplianceReport = new ExportComplianceReport({} as any);

  useEffect(() => {
    if (companyId) {
      loadData(companyId);
    }
  }, [companyId]);

  const loadData = async (companyId: string, period?: string) => {
    setLoading(true);
    try {
      const data = await loadComplianceData.execute(companyId, period);
      setComplianceData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load compliance data');
    } finally {
      setLoading(false);
    }
  };

  const exportReport = async (companyId: string, period: string) => {
    try {
      const blob = await exportComplianceReport.execute(companyId, period);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `compliance-report-${companyId}-${period}.pdf`;
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to export report');
    }
  };

  return {
    complianceData,
    loading,
    error,
    loadData,
    exportReport,
  };
}



