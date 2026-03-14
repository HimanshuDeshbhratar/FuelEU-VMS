/**
 * Pooling Agreements Component
 * React component for pooling agreements list
 */

import React from 'react';
import { PoolingAgreement } from '../../../../core/domain/models/PoolingAgreement';

interface PoolingAgreementsProps {
  agreements: PoolingAgreement[];
  onAgreementSelect?: (agreement: PoolingAgreement) => void;
  loading?: boolean;
}

export const PoolingAgreements: React.FC<PoolingAgreementsProps> = ({
  agreements,
  onAgreementSelect,
  loading,
}) => {
  if (loading) {
    return <div>Loading pooling agreements...</div>;
  }

  return (
    <div className="pooling-agreements">
      <h2>Pooling Agreements</h2>
      {agreements.length === 0 ? (
        <p>No pooling agreements found</p>
      ) : (
        <ul>
          {agreements.map((agreement) => (
            <li key={agreement.id} onClick={() => onAgreementSelect?.(agreement)}>
              <div>
                <strong>Period: {agreement.period}</strong>
              </div>
              <div>Status: {agreement.status}</div>
              <div>Participants: {agreement.participants.length}</div>
              <div>Total Compliance: {agreement.totalCompliance}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};



