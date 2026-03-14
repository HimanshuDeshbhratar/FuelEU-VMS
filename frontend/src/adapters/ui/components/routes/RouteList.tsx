/**
 * Route List Component
 * React component for displaying a list of routes
 */

import React from 'react';
import { Route } from '../../../../core/domain/models/Route';

interface RouteListProps {
  routes: Route[];
  onRouteSelect: (route: Route) => void;
  loading?: boolean;
}

export const RouteList: React.FC<RouteListProps> = ({ routes, onRouteSelect, loading }) => {
  if (loading) {
    return <div>Loading routes...</div>;
  }

  return (
    <div className="route-list">
      <h2>Routes</h2>
      {routes.length === 0 ? (
        <p>No routes found</p>
      ) : (
        <ul>
          {routes.map((route) => (
            <li key={route.id} onClick={() => onRouteSelect(route)}>
              <div>
                <strong>{route.origin} → {route.destination}</strong>
              </div>
              <div>Distance: {route.distance} nm</div>
              <div>Fuel Type: {route.fuelType}</div>
              <div>GHG Intensity: {route.ghgIntensity}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};



