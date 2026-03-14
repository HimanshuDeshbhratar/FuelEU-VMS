/**
 * Compliance Balance Model
 * Frontend domain model for compliance balance
 */

import { ComplianceStatus } from '../enums/ComplianceStatus';

export interface ComplianceBalance {
  id: string;
  companyId: string;
  period: string;
  complianceBalance: number;
  requiredCompliance: number;
  surplus: number;
  deficit: number;
  status: ComplianceStatus;
  updatedAt?: Date;
}



