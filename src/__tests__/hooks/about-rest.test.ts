import {renderHook, waitFor} from '@testing-library/react'
import {useAboutReviewsGetApi} from '../../api/hooks/about-rest'
import {ApiError} from '../../api/client'

// Mock the API client
jest.mock('../../api/client', () => {
  const originalModule = jest.requireActual('../../api/client')
  return {
    __esModule: true,
    default: {
      get: jest.fn(),
    },
    ApiError: originalModule.ApiError,
  }
})

import apiClient from '../../api/client'
const mockApiClient = apiClient as jest.Mocked<typeof apiClient>

describe('useAboutReviewsGetApi', () => {
  const mockEndpoint = '/api/about/reviews'
  const originalEnv = process.env

  beforeEach(() => {
    jest.clearAllMocks()
    process.env = {...originalEnv}
    process.env.REACT_APP_API_URL = 'http://localhost:8080'
  })

  afterEach(() => {
    process.env = originalEnv
  })

  test('fetches about reviews successfully', async () => {
    const mockReviews = [
      {
        author: 'John Doe',
        rating: 5,
        description: 'Great work!',
      },
      {
        author: 'Jane Smith',
        rating: 4,
        description: 'Very professional',
      },
    ]

    mockApiClient.get.mockResolvedValueOnce({
      message: mockReviews,
    })

    const {result} = renderHook(() => useAboutReviewsGetApi(mockEndpoint))

    // Initial state (hook loads immediately)
    expect(result.current.message).toEqual([])
    expect(result.current.error).toBe(null)

    // Wait for the API call to complete
    await waitFor(() => {
      expect(result.current.status).toBe('success')
    })

    expect(result.current.message).toEqual(mockReviews)
    expect(result.current.error).toBe(null)
    expect(mockApiClient.get).toHaveBeenCalledWith(mockEndpoint)
  })

  test('handles fetch error', async () => {
    const networkError = new ApiError('Network error', 0, 'NETWORK_ERROR')
    mockApiClient.get.mockRejectedValueOnce(networkError)

    const {result} = renderHook(() => useAboutReviewsGetApi(mockEndpoint))

    await waitFor(() => {
      expect(result.current.status).toBe('error')
    })

    expect(result.current.message).toEqual([])
    expect(result.current.error).toBe('Network error - check your connection')
  })

  test('handles non-ok response', async () => {
    const apiError = new ApiError('Not found', 404, 'API_ERROR')
    mockApiClient.get.mockRejectedValueOnce(apiError)

    const {result} = renderHook(() => useAboutReviewsGetApi(mockEndpoint))

    await waitFor(() => {
      expect(result.current.status).toBe('error')
    })

    expect(result.current.message).toEqual([])
    expect(result.current.error).toBe('Something went wrong')
  })

  test('handles non-array message response', async () => {
    const mockResponse = {message: 'not an array'}

    mockApiClient.get.mockResolvedValueOnce(mockResponse)

    const {result} = renderHook(() => useAboutReviewsGetApi(mockEndpoint))

    await waitFor(() => {
      expect(result.current.status).toBe('success')
    })

    expect(result.current.message).toEqual([])
    expect(result.current.error).toBe(null)
  })

  test('re-fetches when endpoint changes', async () => {
    const firstEndpoint = '/api/about/reviews'
    const secondEndpoint = '/api/about/other-reviews'

    mockApiClient.get.mockResolvedValue({
      message: [],
    })

    const {result, rerender} = renderHook(
      ({endpoint}) => useAboutReviewsGetApi(endpoint),
      {initialProps: {endpoint: firstEndpoint}},
    )

    await waitFor(() => {
      expect(result.current.status).toBe('success')
    })

    expect(mockApiClient.get).toHaveBeenCalledWith(firstEndpoint)

    // Change endpoint
    rerender({endpoint: secondEndpoint})

    await waitFor(() => {
      expect(mockApiClient.get).toHaveBeenCalledWith(secondEndpoint)
    })

    expect(mockApiClient.get).toHaveBeenCalledTimes(2)
  })
})
