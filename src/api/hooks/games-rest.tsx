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
    status: 'loading',
    message: [],
    error: null,
  })

  useEffect(() => {
    const controller = new AbortController()

    const fetchData = async () => {
      try {

        if (!navigator.onLine) {
          throw new ApiError('No internet connection', 0, 'OFFLINE')
        }

        const response = await apiClient.get<{message: GamesPlayed[]}>(endpoint)

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

    return () => {
      controller.abort()
    }
  }, [endpoint])

  return data
}

export {useGamesPlayedGetApi}
export type {GamesPlayed}
