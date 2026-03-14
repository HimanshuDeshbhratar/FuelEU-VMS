/**
 * Manage Pooling Agreements Use Case
 * Application-level orchestration for pooling operations
 */

import { PoolingAgreement, CreatePoolingAgreementRequest } from '../../../domain/models/PoolingAgreement';

export class ManagePoolingAgreements {
  constructor(private poolingApiClient: any) {} // TODO: Create IPoolingApiClient interface

  async createAgreement(request: CreatePoolingAgreementRequest): Promise<PoolingAgreement> {
    return await this.poolingApiClient.createPoolingAgreement(request);
  }

  async getAllAgreements(): Promise<PoolingAgreement[]> {
    return await this.poolingApiClient.getAllPoolingAgreements();
  }

  async getAgreement(agreementId: string): Promise<PoolingAgreement> {
    return await this.poolingApiClient.getPoolingAgreement(agreementId);
  }

  async allocateCompliance(agreementId: string): Promise<void> {
    await this.poolingApiClient.allocatePooledCompliance(agreementId);
  }

  async dissolveAgreement(agreementId: string): Promise<void> {
    await this.poolingApiClient.dissolvePoolingAgreement(agreementId);
  }
}



