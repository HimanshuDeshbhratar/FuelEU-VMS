/**
 * Compliance Presenter Interface
 * UI interaction interface for compliance
 */

import { ComplianceBalance } from '../../domain/models/ComplianceBalance';

export interface ICompliancePresenter {
  presentComplianceData(data: ComplianceBalance[]): void;
  presentError(error: string): void;
  presentLoading(loading: boolean): void;
  presentExportSuccess(): void;
}



