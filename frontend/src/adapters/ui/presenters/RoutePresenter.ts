/**
 * Route Presenter
 * Implements IRoutePresenter interface
 */

import { IRoutePresenter } from '../../../core/ports/inbound/IRoutePresenter';
import { Route } from '../../../core/domain/models/Route';

export class RoutePresenter implements IRoutePresenter {
  private onRoutesUpdate?: (routes: Route[]) => void;
  private onRouteUpdate?: (route: Route) => void;
  private onError?: (error: string) => void;
  private onLoadingChange?: (loading: boolean) => void;

  setRoutesCallback(callback: (routes: Route[]) => void): void {
    this.onRoutesUpdate = callback;
  }

  setRouteCallback(callback: (route: Route) => void): void {
    this.onRouteUpdate = callback;
  }

  setErrorCallback(callback: (error: string) => void): void {
    this.onError = callback;
  }

  setLoadingCallback(callback: (loading: boolean) => void): void {
    this.onLoadingChange = callback;
  }

  presentRoutes(routes: Route[]): void {
    this.onRoutesUpdate?.(routes);
  }

  presentRoute(route: Route): void {
    this.onRouteUpdate?.(route);
  }

  presentError(error: string): void {
    this.onError?.(error);
  }

  presentLoading(loading: boolean): void {
    this.onLoadingChange?.(loading);
  }
}



