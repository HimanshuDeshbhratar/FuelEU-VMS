/**
 * Compliance Status Enum
 * Status values for compliance
 */

export enum ComplianceStatus {
  COMPLIANT = 'COMPLIANT',
  NON_COMPLIANT = 'NON_COMPLIANT',
  PENDING = 'PENDING',
  UNDER_REVIEW = 'UNDER_REVIEW',
}

export const ComplianceStatusLabels: Record<ComplianceStatus, string> = {
  [ComplianceStatus.COMPLIANT]: 'Compliant',
  [ComplianceStatus.NON_COMPLIANT]: 'Non-Compliant',
  [ComplianceStatus.PENDING]: 'Pending',
  [ComplianceStatus.UNDER_REVIEW]: 'Under Review',
};

export const ComplianceStatusColors: Record<ComplianceStatus, string> = {
  [ComplianceStatus.COMPLIANT]: 'green',
  [ComplianceStatus.NON_COMPLIANT]: 'red',
  [ComplianceStatus.PENDING]: 'yellow',
  [ComplianceStatus.UNDER_REVIEW]: 'blue',
};



