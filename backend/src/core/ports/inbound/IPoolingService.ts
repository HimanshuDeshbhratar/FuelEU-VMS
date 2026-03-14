/**
 * Pooling Service Interface
 * Inbound port for pooling operations
 */

export interface IPoolingService {
  createPoolingAgreement(participants: string[], period: string): Promise<string>;
  allocatePooledCompliance(agreementId: string): Promise<void>;
  dissolvePoolingAgreement(agreementId: string): Promise<void>;
  getPoolingAgreement(agreementId: string): Promise<any>;
}



