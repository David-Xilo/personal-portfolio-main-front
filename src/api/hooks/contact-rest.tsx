import {useState, useEffect} from 'react'
import apiClient, {ApiError} from '../client'
import {handleApiError, handleUnexpectedError} from './shared/error-handler'

interface ContactRest {
  name: string
  email: string
  linkedin: string
  github: string
  credly: string
}

interface ContactResponse {
  status: string
  message: ContactRest | null
  error: string | null
}

const useContactGetApi = (endpoint: string): ContactResponse => {
  const [data, setData] = useState<ContactResponse>({
    status: '',
    message: null,
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
        const response = await apiClient.get<{message: ContactRest}>(endpoint)

        // Normalize the response
        const normalizedData: ContactResponse = {
          status: 'success',
          message: response.message || null,
          error: null,
        }
        setData(normalizedData)
      } catch (err) {
        const {errorMessage, shouldReturn} = handleApiError(err)
        if (shouldReturn) return

        const errorData: ContactResponse = {
          status: 'error',
          message: null,
          error: errorMessage,
        }
        setData(errorData)
      }
    }

    fetchData().catch(err => {
      const errorData: ContactResponse = {
        status: 'error',
        message: null,
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

export {useContactGetApi}
export type {ContactRest}
