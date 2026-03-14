/**
 * Route Detail Component
 * React component for displaying route details
 */

import React from 'react';
import { Route } from '../../../../core/domain/models/Route';

interface RouteDetailProps {
  route: Route;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const RouteDetail: React.FC<RouteDetailProps> = ({ route, onEdit, onDelete }) => {
  return (
    <div className="route-detail">
      <h2>Route Details</h2>
      <div>
        <strong>ID:</strong> {route.id}
      </div>
      <div>
        <strong>Vessel ID:</strong> {route.vesselId}
      </div>
      <div>
        <strong>Origin:</strong> {route.origin}
      </div>
      <div>
        <strong>Destination:</strong> {route.destination}
      </div>
      <div>
        <strong>Distance:</strong> {route.distance} nm
      </div>
      <div>
        <strong>Fuel Type:</strong> {route.fuelType}
      </div>
      <div>
        <strong>GHG Intensity:</strong> {route.ghgIntensity}
      </div>
      <div>
        <strong>Fuel Consumption:</strong> {route.fuelConsumption} tons
      </div>
      <div>
        <strong>Voyage Date:</strong> {route.voyageDate.toLocaleDateString()}
      </div>
      {onEdit && <button onClick={onEdit}>Edit</button>}
      {onDelete && <button onClick={onDelete}>Delete</button>}
    </div>
  );
};



