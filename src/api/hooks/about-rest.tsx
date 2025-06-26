import {useEffect, useState} from 'react'
import {config} from '../../config'
import apiClient, {ApiError} from '../client'

interface AboutReviews {
  author: string
  rating: number
  description: string
}

interface AboutReviewsResponse {
  status: string
  message: AboutReviews[]
  error: string | null
}

const useAboutReviewsGetApi = (endpoint: string): AboutReviewsResponse => {
  const [data, setData] = useState<AboutReviewsResponse>({
    status: '',
    message: [],
    error: null,
  })

  useEffect(() => {
    const controller = new AbortController()

    const fetchData = async () => {
      try {
        // Simple online check (since we removed isOnline() method)
        if (!navigator.onLine) {
          throw new ApiError('No internet connection', 0, 'OFFLINE')
        }

        // Set loading state
        setData(prev => ({...prev, status: 'loading'}))

        // Use the simplified API client
        const response = await apiClient.get<{message: AboutReviews[]}>(
          endpoint,
        )

        // Normalize the response
        const normalizedData: AboutReviewsResponse = {
          status: 'success',
          message: Array.isArray(response.message) ? response.message : [],
          error: null,
        }
        setData(normalizedData)
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') {
          return
        }

        let errorMessage = 'An error occurred'

        if (err instanceof ApiError) {
          switch (err.code) {
            case 'FORBIDDEN':
              errorMessage = 'Access denied - please refresh the page'
              break
            case 'RATE_LIMITED':
              errorMessage = 'Too many requests - please wait a moment'
              break
            case 'OFFLINE':
              errorMessage = 'No internet connection'
              break
            case 'SERVER_ERROR':
              errorMessage = 'Server error - please try again later'
              break
            case 'NETWORK_ERROR':
              errorMessage = 'Network error - check your connection'
              break
            default:
              errorMessage = config.isDevelopment
                ? err.message
                : 'Something went wrong'
          }
        } else if (err instanceof Error) {
          errorMessage = config.isDevelopment
            ? err.message
            : 'Something went wrong'
        }

        const errorData: AboutReviewsResponse = {
          status: 'error',
          message: [],
          error: errorMessage,
        }
        setData(errorData)
      }
    }

    fetchData().catch(err => {
      // Handle any errors that escape the try-catch block
      console.error('Unhandled error in fetchData:', err)

      const errorData: AboutReviewsResponse = {
        status: 'error',
        message: [],
        error: config.isDevelopment
          ? 'Unexpected error occurred'
          : 'Something went wrong',
      }
      setData(errorData)
    })

    // Cleanup function - abort any ongoing requests
    return () => {
      controller.abort()
    }
  }, [endpoint])

  return data
}

export {useAboutReviewsGetApi}
export type {AboutReviews}
