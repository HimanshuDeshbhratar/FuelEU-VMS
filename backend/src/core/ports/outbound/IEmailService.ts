/**
 * Email Service Interface
 * Outbound port for email operations
 */

export interface IEmailService {
  sendEmail(to: string, subject: string, body: string): Promise<void>;
  sendComplianceReport(to: string, reportData: any): Promise<void>;
  sendNotification(to: string, message: string): Promise<void>;
}



