import {config} from '../config'

class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string,
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

class ApiClient {
  private readonly baseURL: string

  constructor() {
    this.baseURL = config.apiUrl
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      let errorMessage = `HTTP ${response.status}: ${response.statusText}`

      try {
        const errorData = await response.json()
        errorMessage = errorData.error || errorData.message || errorMessage
      } catch {
        // Response is not JSON
      }

      switch (response.status) {
        case 403:
          throw new ApiError('Access denied by server', 403, 'FORBIDDEN')
        case 429:
          throw new ApiError('Too many requests', 429, 'RATE_LIMITED')
        case 500:
          throw new ApiError('Server error', 500, 'SERVER_ERROR')
        default:
          throw new ApiError(errorMessage, response.status, 'API_ERROR')
      }
    }

    const contentType = response.headers.get('content-type')
    if (!contentType || !contentType.includes('application/json')) {
      return {} as T
    }

    return await response.json()
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`

    const requestOptions: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'X-Client-Version': config.appVersion,
        ...options.headers,
      },
      credentials: 'include',
      mode: 'cors',
    }

    if (config.isDevelopment) {
      console.log(`API: ${options.method || 'GET'} ${endpoint}`)
    }

    try {
      const response = await fetchWithAuth(url, requestOptions)
      return await this.handleResponse<T>(response)
    } catch (error) {
      if (config.isDevelopment) {
        console.error(`❌ API Error: ${endpoint}`, error)
      }

      throw error instanceof ApiError
        ? error
        : new ApiError('Network error', 0, 'NETWORK_ERROR')
    }
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.makeRequest<T>(endpoint, {method: 'GET'})
  }

  async post<T, B = unknown>(endpoint: string, body: B): Promise<T> {
    return this.makeRequest<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

async function refreshToken(): Promise<string> {
  const res = await fetch('/auth/token', {
    method: 'POST',
    credentials: 'include', // sends httponly cookie refresh token
  });
  if (!res.ok) throw new Error('Refresh failed');
  const { token } = await res.json();
  return token;
}

let accessToken: string | null = null;

type RequestOptions = {
  retry?: boolean
  headers?: RequestInit['headers']
} & Omit<RequestInit, 'headers'>

export async function fetchWithAuth(
  input: RequestInfo,
  options: RequestOptions = {}
): Promise<Response> {
  // Split out retry and headers, keep rest valid for fetch
  const { retry, headers: optionsHeaders, ...rest } = options

  // Ensure accessToken...
  if (!accessToken) {
    try {
      accessToken = await refreshToken()
    } catch {
      return Promise.reject(new Error('Not authenticated'))
    }
  }

  // Build a proper Headers object
  const headers = new Headers(optionsHeaders)
  headers.set('Authorization', `Bearer ${accessToken}`)

  // Perform the initial fetch with clean options
  let res = await fetch(input, {
    ...rest,
    headers,
    credentials: 'include',
  })

  // On 401: try refresh and retry
  if (res.status === 401 && !retry) {
    try {
      accessToken = await refreshToken()
      headers.set('Authorization', `Bearer ${accessToken}`)
      res = await fetch(input, {
        ...rest,
        headers,
        credentials: 'include',
        // Don't pass retry in fetch options
      })
    } catch {
      window.location.href = '/login'
      return Promise.reject(new Error('Session expired'))
    }
  }

  return res
}



export const apiClient = new ApiClient()
export default apiClient
export {ApiError}
