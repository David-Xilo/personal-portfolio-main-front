import {useEffect, useState} from 'react'
import apiClient, {ApiError} from '../client'
import {handleApiError, handleUnexpectedError} from './shared/error-handler'

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
        const {errorMessage, shouldReturn} = handleApiError(err)
        if (shouldReturn) return

        const errorData: AboutReviewsResponse = {
          status: 'error',
          message: [],
          error: errorMessage,
        }
        setData(errorData)
      }
    }

    fetchData().catch(err => {
      const errorData: AboutReviewsResponse = {
        status: 'error',
        message: [],
        error: handleUnexpectedError(err),
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
