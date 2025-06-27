import {config} from '../../../config'
import {ApiError} from '../../client'

export interface ErrorHandlerResult {
  errorMessage: string
  shouldReturn: boolean
}

export const handleApiError = (err: unknown): ErrorHandlerResult => {
  if (err instanceof Error && err.name === 'AbortError') {
    return {errorMessage: '', shouldReturn: true}
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
    errorMessage = config.isDevelopment ? err.message : 'Something went wrong'
  }

  return {errorMessage, shouldReturn: false}
}

export const handleUnexpectedError = (err: unknown): string => {
  console.error('Unhandled error in fetchData:', err)
  return config.isDevelopment
    ? 'Unexpected error occurred'
    : 'Something went wrong'
}
