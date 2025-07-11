import {renderHook, waitFor} from '@testing-library/react'
import {useContactGetApi} from '../../api/hooks/contact-rest'
import {ApiError} from '../../api/client'

// Mock the API client
jest.mock('../../api/client', () => {
  const originalModule = jest.requireActual('../../api/client')
  return {
    __esModule: true,
    default: {
      get: jest.fn(),
    },
    ApiError: originalModule.ApiError, // Use the real ApiError class
  }
})

import apiClient from '../../api/client'
const mockApiClient = apiClient as jest.Mocked<typeof apiClient>

describe('useContactGetApi', () => {
  const mockEndpoint = '/api/contact'
  const originalEnv = process.env

  beforeEach(() => {
    jest.clearAllMocks()
    process.env = {...originalEnv}
    process.env.REACT_APP_API_URL = 'http://localhost:4000'
  })

  afterEach(() => {
    process.env = originalEnv
  })

  test('fetches contact data successfully', async () => {
    const mockContact = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      linkedin: 'https://linkedin.com/in/johndoe',
      github: 'https://github.com/johndoe',
      credly: 'https://credly.com/johndoe',
    }

    mockApiClient.get.mockResolvedValueOnce({
      message: mockContact,
    })

    const {result} = renderHook(() => useContactGetApi(mockEndpoint))

    // Initial state (hook loads immediately, so we can't reliably catch the initial empty state)
    expect(result.current.message).toBe(null)
    expect(result.current.error).toBe(null)

    // Wait for the API call to complete
    await waitFor(() => {
      expect(result.current.status).toBe('success')
    })

    expect(result.current.message).toEqual(mockContact)
    expect(result.current.error).toBe(null)
    expect(mockApiClient.get).toHaveBeenCalledWith(mockEndpoint)
  })

  test('handles fetch error', async () => {
    const networkError = new ApiError('Network error', 0, 'NETWORK_ERROR')
    mockApiClient.get.mockRejectedValueOnce(networkError)

    const {result} = renderHook(() => useContactGetApi(mockEndpoint))

    await waitFor(() => {
      expect(result.current.status).toBe('error')
    })

    expect(result.current.message).toBe(null)
    expect(result.current.error).toBe('Network error - check your connection')
  })

  test('handles non-ok response', async () => {
    const apiError = new ApiError('Not found', 404, 'API_ERROR')
    mockApiClient.get.mockRejectedValueOnce(apiError)

    const {result} = renderHook(() => useContactGetApi(mockEndpoint))

    await waitFor(() => {
      expect(result.current.status).toBe('error')
    })

    expect(result.current.message).toBe(null)
    expect(result.current.error).toBe('Something went wrong')
  })

  test('handles null message response', async () => {
    const mockResponse = {message: null}

    mockApiClient.get.mockResolvedValueOnce(mockResponse)

    const {result} = renderHook(() => useContactGetApi(mockEndpoint))

    await waitFor(() => {
      expect(result.current.status).toBe('success')
    })

    expect(result.current.message).toBe(null)
    expect(result.current.error).toBe(null)
  })

  test('handles offline error', async () => {
    const offlineError = new ApiError('No internet connection', 0, 'OFFLINE')
    mockApiClient.get.mockRejectedValueOnce(offlineError)

    const {result} = renderHook(() => useContactGetApi(mockEndpoint))

    await waitFor(() => {
      expect(result.current.status).toBe('error')
    })

    expect(result.current.message).toBe(null)
    expect(result.current.error).toBe('No internet connection')
  })

  test('handles rate limiting error', async () => {
    const rateLimitError = new ApiError('Too many requests', 429, 'RATE_LIMITED')
    mockApiClient.get.mockRejectedValueOnce(rateLimitError)

    const {result} = renderHook(() => useContactGetApi(mockEndpoint))

    await waitFor(() => {
      expect(result.current.status).toBe('error')
    })

    expect(result.current.message).toBe(null)
    expect(result.current.error).toBe('Too many requests - please wait a moment')
  })

  test('validates contact object structure', async () => {
    const mockContact = {
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      linkedin: 'https://linkedin.com/in/janesmith',
      github: 'https://github.com/janesmith',
      credly: 'https://credly.com/janesmith',
    }

    mockApiClient.get.mockResolvedValueOnce({
      message: mockContact,
    })

    const {result} = renderHook(() => useContactGetApi(mockEndpoint))

    await waitFor(() => {
      expect(result.current.status).toBe('success')
    })

    expect(result.current.message).toHaveProperty('name')
    expect(result.current.message).toHaveProperty('email')
    expect(result.current.message).toHaveProperty('linkedin')
    expect(result.current.message).toHaveProperty('github')
    expect(result.current.message).toHaveProperty('credly')
    expect(typeof result.current.message?.name).toBe('string')
    expect(typeof result.current.message?.email).toBe('string')
  })
})
