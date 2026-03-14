/**
 * Routes Page
 * Page-level component for routes
 */

import React, { useState } from 'react';
import { RouteList } from '../components/routes/RouteList';
import { RouteForm } from '../components/routes/RouteForm';
import { RouteDetail } from '../components/routes/RouteDetail';
import { Route, CreateRouteRequest } from '../../../core/domain/models/Route';
import { useRoutes } from '../hooks/useRoutes';

export const RoutesPage: React.FC = () => {
  const { routes, loading, createRoute, updateRoute, deleteRoute } = useRoutes();
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingRoute, setEditingRoute] = useState<Route | null>(null);

  const handleCreateRoute = async (request: CreateRouteRequest) => {
    await createRoute(request);
    setShowForm(false);
  };

  const handleUpdateRoute = async (request: CreateRouteRequest) => {
    if (editingRoute) {
      await updateRoute(editingRoute.id, request as any);
      setEditingRoute(null);
      setShowForm(false);
    }
  };

  const handleDeleteRoute = async (routeId: string) => {
    await deleteRoute(routeId);
    setSelectedRoute(null);
  };

  return (
    <div className="routes-page">
      <h1>Routes Management</h1>
      <button onClick={() => { setShowForm(true); setEditingRoute(null); }}>
        Create New Route
      </button>

      {showForm && (
        <RouteForm
          route={editingRoute || undefined}
          onSubmit={editingRoute ? handleUpdateRoute : handleCreateRoute}
          onCancel={() => { setShowForm(false); setEditingRoute(null); }}
        />
      )}

      <RouteList
        routes={routes}
        onRouteSelect={setSelectedRoute}
        loading={loading}
      />

      {selectedRoute && (
        <RouteDetail
          route={selectedRoute}
          onEdit={() => { setEditingRoute(selectedRoute); setShowForm(true); }}
          onDelete={() => handleDeleteRoute(selectedRoute.id)}
        />
      )}
    </div>
  );
};



