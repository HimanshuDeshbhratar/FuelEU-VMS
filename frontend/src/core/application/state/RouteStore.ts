/**
 * Route Store
 * State management for routes (Zustand/Redux)
 */

import { Route } from '../../domain/models/Route';

export interface RouteStore {
  routes: Route[];
  loading: boolean;
  error: string | null;
  selectedRoute: Route | null;
  setRoutes: (routes: Route[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSelectedRoute: (route: Route | null) => void;
  addRoute: (route: Route) => void;
  updateRoute: (route: Route) => void;
  removeRoute: (routeId: string) => void;
  clearError: () => void;
}

// TODO: Implement with Zustand or Redux
// Example with Zustand:
// import { create } from 'zustand';
// 
// export const useRouteStore = create<RouteStore>((set) => ({
//   routes: [],
//   loading: false,
//   error: null,
//   selectedRoute: null,
//   setRoutes: (routes) => set({ routes }),
//   setLoading: (loading) => set({ loading }),
//   setError: (error) => set({ error }),
//   setSelectedRoute: (route) => set({ selectedRoute: route }),
//   addRoute: (route) => set((state) => ({ routes: [...state.routes, route] })),
//   updateRoute: (route) => set((state) => ({
//     routes: state.routes.map((r) => r.id === route.id ? route : r)
//   })),
//   removeRoute: (routeId) => set((state) => ({
//     routes: state.routes.filter((r) => r.id !== routeId)
//   })),
//   clearError: () => set({ error: null }),
// }));



