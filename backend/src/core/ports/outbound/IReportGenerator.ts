/**
 * Report Generator Interface
 * Outbound port for report generation operations
 */

export interface IReportGenerator {
  generateComplianceReport(data: any): Promise<Buffer>;
  generateBankingReport(data: any): Promise<Buffer>;
  generatePoolingReport(data: any): Promise<Buffer>;
}



