/**
 * Route Form Component
 * React component for creating/editing routes
 */

import React, { useState } from 'react';
import { Route, CreateRouteRequest } from '../../../../core/domain/models/Route';

interface RouteFormProps {
  route?: Route;
  onSubmit: (request: CreateRouteRequest) => void;
  onCancel: () => void;
}

export const RouteForm: React.FC<RouteFormProps> = ({ route, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<CreateRouteRequest>({
    vesselId: route?.vesselId || '',
    origin: route?.origin || '',
    destination: route?.destination || '',
    distance: route?.distance || 0,
    fuelType: route?.fuelType || '',
    ghgIntensity: route?.ghgIntensity || 0,
    fuelConsumption: route?.fuelConsumption || 0,
    voyageDate: route?.voyageDate || new Date(),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (field: keyof CreateRouteRequest, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="route-form">
      <h2>{route ? 'Edit Route' : 'Create Route'}</h2>
      
      <div>
        <label>Vessel ID:</label>
        <input
          type="text"
          value={formData.vesselId}
          onChange={(e) => handleChange('vesselId', e.target.value)}
          required
        />
      </div>

      <div>
        <label>Origin:</label>
        <input
          type="text"
          value={formData.origin}
          onChange={(e) => handleChange('origin', e.target.value)}
          required
        />
      </div>

      <div>
        <label>Destination:</label>
        <input
          type="text"
          value={formData.destination}
          onChange={(e) => handleChange('destination', e.target.value)}
          required
        />
      </div>

      <div>
        <label>Distance (nm):</label>
        <input
          type="number"
          value={formData.distance}
          onChange={(e) => handleChange('distance', parseFloat(e.target.value))}
          required
        />
      </div>

      <div>
        <label>Fuel Type:</label>
        <input
          type="text"
          value={formData.fuelType}
          onChange={(e) => handleChange('fuelType', e.target.value)}
          required
        />
      </div>

      <div>
        <label>GHG Intensity:</label>
        <input
          type="number"
          value={formData.ghgIntensity}
          onChange={(e) => handleChange('ghgIntensity', parseFloat(e.target.value))}
          required
        />
      </div>

      <div>
        <label>Fuel Consumption (tons):</label>
        <input
          type="number"
          value={formData.fuelConsumption}
          onChange={(e) => handleChange('fuelConsumption', parseFloat(e.target.value))}
          required
        />
      </div>

      <div>
        <label>Voyage Date:</label>
        <input
          type="date"
          value={formData.voyageDate.toISOString().split('T')[0]}
          onChange={(e) => handleChange('voyageDate', new Date(e.target.value))}
          required
        />
      </div>

      <div>
        <button type="submit">{route ? 'Update' : 'Create'}</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};



