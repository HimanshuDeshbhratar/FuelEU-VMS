/**
 * Event Publisher Interface
 * Outbound port for event publishing operations
 */

export interface IEventPublisher {
  publish(eventType: string, eventData: any): Promise<void>;
  publishComplianceEvent(eventData: any): Promise<void>;
  publishBankingEvent(eventData: any): Promise<void>;
  publishPoolingEvent(eventData: any): Promise<void>;
}



