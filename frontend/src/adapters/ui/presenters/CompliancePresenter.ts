/**
 * Compliance Presenter
 * Implements ICompliancePresenter interface
 */

import { ICompliancePresenter } from '../../../core/ports/inbound/ICompliancePresenter';
import { ComplianceBalance } from '../../../core/domain/models/ComplianceBalance';

export class CompliancePresenter implements ICompliancePresenter {
  private onDataUpdate?: (data: ComplianceBalance[]) => void;
  private onError?: (error: string) => void;
  private onLoadingChange?: (loading: boolean) => void;
  private onExportSuccess?: () => void;

  setDataCallback(callback: (data: ComplianceBalance[]) => void): void {
    this.onDataUpdate = callback;
  }

  setErrorCallback(callback: (error: string) => void): void {
    this.onError = callback;
  }

  setLoadingCallback(callback: (loading: boolean) => void): void {
    this.onLoadingChange = callback;
  }

  setExportSuccessCallback(callback: () => void): void {
    this.onExportSuccess = callback;
  }

  presentComplianceData(data: ComplianceBalance[]): void {
    this.onDataUpdate?.(data);
  }

  presentError(error: string): void {
    this.onError?.(error);
  }

  presentLoading(loading: boolean): void {
    this.onLoadingChange?.(loading);
  }

  presentExportSuccess(): void {
    this.onExportSuccess?.();
  }
}



