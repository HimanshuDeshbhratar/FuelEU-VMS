/**
 * Route Validator
 * Request validation schemas for route operations
 */

export const RouteValidator = {
  createRoute: {
    body: {
      vesselId: 'required|string',
      origin: 'required|string',
      destination: 'required|string',
      distance: 'required|number|min:0',
      fuelType: 'required|string',
      ghgIntensity: 'required|number|min:0',
    },
  },
  updateRoute: {
    body: {
      origin: 'string',
      destination: 'string',
      distance: 'number|min:0',
      fuelType: 'string',
      ghgIntensity: 'number|min:0',
    },
    params: {
      id: 'required|string',
    },
  },
  getRoute: {
    params: {
      id: 'required|string',
    },
  },
  getRoutesByVessel: {
    params: {
      vesselId: 'required|string',
    },
  },
};



