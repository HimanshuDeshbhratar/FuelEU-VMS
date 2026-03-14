/**
 * Route Presenter Interface
 * UI interaction interface for routes
 */

import { Route } from '../../domain/models/Route';

export interface IRoutePresenter {
  presentRoutes(routes: Route[]): void;
  presentRoute(route: Route): void;
  presentError(error: string): void;
  presentLoading(loading: boolean): void;
}



