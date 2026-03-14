/**
 * Error Interceptor
 * Intercepts HTTP responses to handle errors
 */

export class ErrorInterceptor {
  interceptResponse(response: Response): Response {
    if (!response.ok) {
      const error = new Error(`HTTP error! status: ${response.status}`);
      (error as any).status = response.status;
      (error as any).response = response;
      throw error;
    }
    return response;
  }

  async handleError(error: any): Promise<never> {
    if (error.response) {
      // Server responded with error status
      const message = await error.response.json().catch(() => ({ message: 'An error occurred' }));
      throw new Error(message.message || 'An error occurred');
    } else if (error.request) {
      // Request was made but no response received
      throw new Error('Network error: No response from server');
    } else {
      // Something else happened
      throw new Error(error.message || 'An unexpected error occurred');
    }
  }
}



