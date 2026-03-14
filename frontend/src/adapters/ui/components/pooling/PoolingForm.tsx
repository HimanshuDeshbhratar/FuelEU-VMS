/**
 * Pooling Form Component
 * React component for creating pooling agreements
 */

import React, { useState } from 'react';
import { CreatePoolingAgreementRequest } from '../../../../core/domain/models/PoolingAgreement';

interface PoolingFormProps {
  onSubmit: (request: CreatePoolingAgreementRequest) => void;
  onCancel: () => void;
}

export const PoolingForm: React.FC<PoolingFormProps> = ({ onSubmit, onCancel }) => {
  const [period, setPeriod] = useState('');
  const [participants, setParticipants] = useState<string[]>([]);
  const [allocationPercentages, setAllocationPercentages] = useState<number[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ period, participants, allocationPercentages });
  };

  const addParticipant = () => {
    setParticipants([...participants, '']);
    setAllocationPercentages([...allocationPercentages, 0]);
  };

  return (
    <form onSubmit={handleSubmit} className="pooling-form">
      <h2>Create Pooling Agreement</h2>
      
      <div>
        <label>Period:</label>
        <input
          type="text"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          placeholder="Q1-2024"
          required
        />
      </div>

      <div>
        <label>Participants:</label>
        {participants.map((participant, index) => (
          <div key={index}>
            <input
              type="text"
              value={participant}
              onChange={(e) => {
                const newParticipants = [...participants];
                newParticipants[index] = e.target.value;
                setParticipants(newParticipants);
              }}
              placeholder="Company ID"
            />
            <input
              type="number"
              value={allocationPercentages[index]}
              onChange={(e) => {
                const newPercentages = [...allocationPercentages];
                newPercentages[index] = parseFloat(e.target.value);
                setAllocationPercentages(newPercentages);
              }}
              placeholder="Allocation %"
              min="0"
              max="100"
            />
          </div>
        ))}
        <button type="button" onClick={addParticipant}>Add Participant</button>
      </div>

      <div>
        <button type="submit">Create Agreement</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};



