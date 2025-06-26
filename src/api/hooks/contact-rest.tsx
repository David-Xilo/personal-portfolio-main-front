import { useState, useEffect } from 'react';
import { config } from '../../config';
import apiClient, { ApiError } from '../client';

interface ContactRest {
  name: string;
  email: string;
  linkedin: string;
  github: string;
  credly: string;
}

interface ContactResponse {
  status: string;
  message: ContactRest | null;
  error: string | null;
}

const useContactGetApi = (endpoint: string): ContactResponse => {
  const [data, setData] = useState<ContactResponse>({
    status: '',
    message: null,
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        // Simple online check
        if (!navigator.onLine) {
          throw new ApiError('No internet connection', 0, 'OFFLINE');
        }

        // Set loading state
        setData(prev => ({ ...prev, status: 'loading' }));

        // Use the secure API client
        const response = await apiClient.get<{ message: ContactRest }>(endpoint);

        // Normalize the response
        const normalizedData: ContactResponse = {
          status: 'success',
          message: response.message || null,
          error: null,
        };
        setData(normalizedData);

      } catch (err) {
        // Don't set error if request was aborted (component unmounted)
        if (err instanceof Error && err.name === 'AbortError') {
          return;
        }

        let errorMessage = 'An error occurred';

        if (err instanceof ApiError) {
          switch (err.code) {
            case 'FORBIDDEN':
              errorMessage = 'Access denied - please refresh the page';
              break;
            case 'RATE_LIMITED':
              errorMessage = 'Too many requests - please wait a moment';
              break;
            case 'OFFLINE':
              errorMessage = 'No internet connection';
              break;
            case 'SERVER_ERROR':
              errorMessage = 'Server error - please try again later';
              break;
            case 'NETWORK_ERROR':
              errorMessage = 'Network error - check your connection';
              break;
            default:
              errorMessage = config.isDevelopment ? err.message : 'Something went wrong';
          }
        } else if (err instanceof Error) {
          errorMessage = config.isDevelopment ? err.message : 'Something went wrong';
        }

        const errorData: ContactResponse = {
          status: 'error',
          message: null,
          error: errorMessage,
        };
        setData(errorData);
      }
    };

    fetchData().catch((err) => {
      // Handle any errors that escape the try-catch block
      console.error('Unhandled error in fetchData:', err);

      const errorData: ContactResponse = {
        status: 'error',
        message: null,
        error: config.isDevelopment ? 'Unexpected error occurred' : 'Something went wrong',
      };
      setData(errorData);
    });

    // Cleanup function - abort any ongoing requests
    return () => {
      controller.abort();
    };
  }, [endpoint]);

  return data;
};

export { useContactGetApi };
export type { ContactRest };
