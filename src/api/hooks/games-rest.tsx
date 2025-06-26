import {useEffect, useState} from 'react'
import apiClient, {ApiError} from '../client'
import {handleApiError, handleUnexpectedError} from './shared/error-handler'

interface GamesPlayed {
  title: string
  genre: string
  rating: number
  description: string
}

interface GamesPlayedResponse {
  status: string
  message: GamesPlayed[]
  error: string | null
}

const useGamesPlayedGetApi = (endpoint: string): GamesPlayedResponse => {
  const [data, setData] = useState<GamesPlayedResponse>({
    status: '',
    message: [],
    error: null,
  })

  useEffect(() => {
    const controller = new AbortController()

    const fetchData = async () => {
      try {
        // Simple online check
        if (!navigator.onLine) {
          throw new ApiError('No internet connection', 0, 'OFFLINE')
        }

        // Set loading state
        setData(prev => ({...prev, status: 'loading'}))

        // Use the secure API client
        const response = await apiClient.get<{message: GamesPlayed[]}>(endpoint)

        // Normalize the response
        const normalizedData: GamesPlayedResponse = {
          status: 'success',
          message: Array.isArray(response.message) ? response.message : [],
          error: null,
        }
        setData(normalizedData)
      } catch (err) {
        const {errorMessage, shouldReturn} = handleApiError(err)
        if (shouldReturn) return

        const errorData: GamesPlayedResponse = {
          status: 'error',
          message: [],
          error: errorMessage,
        }
        setData(errorData)
      }
    }

    fetchData().catch(err => {
      const errorData: GamesPlayedResponse = {
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

export {useGamesPlayedGetApi}
export type {GamesPlayed}
