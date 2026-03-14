/**
 * Auth Interceptor
 * Intercepts HTTP requests to add authentication
 */

export class AuthInterceptor {
  private getToken: () => string | null;

  constructor(getToken: () => string | null) {
    this.getToken = getToken;
  }

  interceptRequest(request: Request): Request {
    const token = this.getToken();
    if (token) {
      request.headers.set('Authorization', `Bearer ${token}`);
    }
    return request;
  }

  interceptResponse(response: Response): Response {
    if (response.status === 401) {
      // Handle unauthorized - redirect to login or refresh token
      console.error('Unauthorized request');
    }
    return response;
  }
}



