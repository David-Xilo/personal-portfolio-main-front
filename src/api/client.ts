import { config } from '../config';

class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

class ApiClient {
  private readonly baseURL: string;

  constructor() {
    this.baseURL = config.apiUrl;
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      let errorMessage = `HTTP ${response.status}: ${response.statusText}`;

      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorData.message || errorMessage;
      } catch {
        // Response is not JSON
      }

      switch (response.status) {
        case 403:
          throw new ApiError('Access denied by server', 403, 'FORBIDDEN');
        case 429:
          throw new ApiError('Too many requests', 429, 'RATE_LIMITED');
        case 500:
          throw new ApiError('Server error', 500, 'SERVER_ERROR');
        default:
          throw new ApiError(errorMessage, response.status, 'API_ERROR');
      }
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return {} as T;
    }

    return await response.json();
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    const requestOptions: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'X-Client-Version': config.appVersion,
        ...options.headers,
      },
      credentials: 'include', // Important: Send cookies for CORS
      mode: 'cors',           // Important: Enable CORS
    };

    if (config.isDevelopment) {
      console.log(`🌐 API: ${options.method || 'GET'} ${endpoint}`);
    }

    try {
      const response = await fetch(url, requestOptions);
      return await this.handleResponse<T>(response);
    } catch (error) {
      if (config.isDevelopment) {
        console.error(`❌ API Error: ${endpoint}`, error);
      }

      throw error instanceof ApiError ? error :
        new ApiError('Network error', 0, 'NETWORK_ERROR');
    }
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.makeRequest<T>(endpoint, { method: 'GET' });
  }

}

export const apiClient = new ApiClient();
export default apiClient;
export { ApiError };
