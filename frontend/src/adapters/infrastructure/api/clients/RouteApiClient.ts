/**
 * Route API Client
 * Implements IRouteApiClient interface
 */

import { IRouteApiClient } from '../../../../core/ports/outbound/IRouteApiClient';
import { Route, CreateRouteRequest, UpdateRouteRequest } from '../../../../core/domain/models/Route';
import { getApiBaseUrl } from '../../../../shared/constants/config';

export class RouteApiClient implements IRouteApiClient {
  private baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || getApiBaseUrl();
  }

  async getAllRoutes(): Promise<Route[]> {
    const response = await fetch(`${this.baseUrl}/api/routes`);
    if (!response.ok) {
      throw new Error('Failed to fetch routes');
    }
    return response.json();
  }

  async getRouteById(id: string): Promise<Route> {
    const response = await fetch(`${this.baseUrl}/api/routes/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch route');
    }
    return response.json();
  }

  async getRoutesByVesselId(vesselId: string): Promise<Route[]> {
    const response = await fetch(`${this.baseUrl}/api/vessels/${vesselId}/routes`);
    if (!response.ok) {
      throw new Error('Failed to fetch routes by vessel');
    }
    return response.json();
  }

  async createRoute(request: CreateRouteRequest): Promise<Route> {
    const response = await fetch(`${this.baseUrl}/api/routes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });
    if (!response.ok) {
      throw new Error('Failed to create route');
    }
    return response.json();
  }

  async updateRoute(id: string, request: UpdateRouteRequest): Promise<Route> {
    const response = await fetch(`${this.baseUrl}/api/routes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });
    if (!response.ok) {
      throw new Error('Failed to update route');
    }
    return response.json();
  }

  async deleteRoute(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/api/routes/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete route');
    }
  }
}



