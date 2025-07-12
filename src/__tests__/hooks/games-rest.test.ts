import {renderHook, waitFor} from '@testing-library/react'
import {useGamesPlayedGetApi} from '../../api/hooks/games-rest'
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

describe('useGamesPlayedGetApi', () => {
  const mockEndpoint = '/api/games/played'
  const originalEnv = process.env

  beforeEach(() => {
    jest.clearAllMocks()
    process.env = {...originalEnv}
    process.env.REACT_APP_API_URL = 'http://localhost:8080'
  })

  afterEach(() => {
    process.env = originalEnv
  })

  test('fetches games played successfully', async () => {
    const mockGames = [
      {
        title: 'The Legend of Zelda',
        genre: 'Adventure',
        rating: 9,
        description: 'Epic adventure game',
      },
      {
        title: 'Mario Kart',
        genre: 'Racing',
        rating: 8,
        description: 'Fun racing game',
      },
    ]

    mockApiClient.get.mockResolvedValueOnce({
      message: mockGames,
    })

    const {result} = renderHook(() => useGamesPlayedGetApi(mockEndpoint))

    // Initial state (hook loads immediately)
    expect(result.current.message).toEqual([])
    expect(result.current.error).toBe(null)

    // Wait for the API call to complete
    await waitFor(() => {
      expect(result.current.status).toBe('success')
    })

    expect(result.current.message).toEqual(mockGames)
    expect(result.current.error).toBe(null)
    expect(mockApiClient.get).toHaveBeenCalledWith(mockEndpoint)
  })

  test('handles fetch error', async () => {
    const networkError = new ApiError('Network error', 0, 'NETWORK_ERROR')
    mockApiClient.get.mockRejectedValueOnce(networkError)

    const {result} = renderHook(() => useGamesPlayedGetApi(mockEndpoint))

    await waitFor(() => {
      expect(result.current.status).toBe('error')
    })

    expect(result.current.message).toEqual([])
    expect(result.current.error).toBe('Network error - check your connection')
  })

  test('handles non-ok response', async () => {
    const apiError = new ApiError('Server error', 500, 'SERVER_ERROR')
    mockApiClient.get.mockRejectedValueOnce(apiError)

    const {result} = renderHook(() => useGamesPlayedGetApi(mockEndpoint))

    await waitFor(() => {
      expect(result.current.status).toBe('error')
    })

    expect(result.current.message).toEqual([])
    expect(result.current.error).toBe('Server error - please try again later')
  })

  test('handles non-array message response', async () => {
    const mockResponse = {message: null}

    mockApiClient.get.mockResolvedValueOnce(mockResponse)

    const {result} = renderHook(() => useGamesPlayedGetApi(mockEndpoint))

    await waitFor(() => {
      expect(result.current.status).toBe('success')
    })

    expect(result.current.message).toEqual([])
    expect(result.current.error).toBe(null)
  })

  test('re-fetches when endpoint changes', async () => {
    const firstEndpoint = '/api/games/played'
    const secondEndpoint = '/api/games/favorite'

    mockApiClient.get.mockResolvedValue({
      message: [],
    })

    const {result, rerender} = renderHook(
      ({endpoint}) => useGamesPlayedGetApi(endpoint),
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

  test('validates game object structure', async () => {
    const mockGames = [
      {
        title: 'Valid Game',
        genre: 'Action',
        rating: 7,
        description: 'A valid game object',
      },
    ]

    mockApiClient.get.mockResolvedValueOnce({
      message: mockGames,
    })

    const {result} = renderHook(() => useGamesPlayedGetApi(mockEndpoint))

    await waitFor(() => {
      expect(result.current.status).toBe('success')
    })

    expect(result.current.message[0]).toHaveProperty('title')
    expect(result.current.message[0]).toHaveProperty('genre')
    expect(result.current.message[0]).toHaveProperty('rating')
    expect(result.current.message[0]).toHaveProperty('description')
    expect(typeof result.current.message[0].rating).toBe('number')
  })
})
