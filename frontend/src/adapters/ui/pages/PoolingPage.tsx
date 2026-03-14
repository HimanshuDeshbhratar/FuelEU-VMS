/**
 * Pooling Page
 * Page-level component for pooling
 */

import React, { useState } from 'react';
import { PoolingAgreements } from '../components/pooling/PoolingAgreements';
import { PoolingForm } from '../components/pooling/PoolingForm';
import { PoolingAgreement, CreatePoolingAgreementRequest } from '../../../core/domain/models/PoolingAgreement';

export const PoolingPage: React.FC = () => {
  const [agreements, setAgreements] = useState<PoolingAgreement[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedAgreement, setSelectedAgreement] = useState<PoolingAgreement | null>(null);

  const handleCreateAgreement = async (request: CreatePoolingAgreementRequest) => {
    // TODO: Implement agreement creation
    console.log('Creating agreement:', request);
    setShowForm(false);
  };

  return (
    <div className="pooling-page">
      <h1>Pooling Management</h1>
      <button onClick={() => setShowForm(true)}>Create New Agreement</button>

      {showForm && (
        <PoolingForm
          onSubmit={handleCreateAgreement}
          onCancel={() => setShowForm(false)}
        />
      )}

      <PoolingAgreements
        agreements={agreements}
        onAgreementSelect={setSelectedAgreement}
      />
    </div>
  );
};



