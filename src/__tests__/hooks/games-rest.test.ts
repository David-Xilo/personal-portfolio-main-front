import {renderHook, waitFor} from '@testing-library/react'
import {useGamesPlayedGetApi} from '../../hooks/games-rest'

// Mock fetch
global.fetch = jest.fn()

const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>

describe('useGamesPlayedGetApi', () => {
  const mockEndpoint = '/api/games/played'
  const originalEnv = process.env

  beforeEach(() => {
    jest.clearAllMocks()
    process.env = {...originalEnv}
    process.env.REACT_APP_API_URL = 'http://localhost:4000'
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

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({message: mockGames}),
    } as Response)

    const {result} = renderHook(() => useGamesPlayedGetApi(mockEndpoint))

    // Initial state
    expect(result.current.status).toBe('')
    expect(result.current.message).toEqual([])
    expect(result.current.error).toBe(null)

    // Wait for the API call to complete
    await waitFor(() => {
      expect(result.current.status).toBe('success')
    })

    expect(result.current.message).toEqual(mockGames)
    expect(result.current.error).toBe(null)
    expect(mockFetch).toHaveBeenCalledWith(
      'http://localhost:4000/api/games/played',
    )
  })

  test('handles fetch error', async () => {
    const errorMessage = 'Network error'
    mockFetch.mockRejectedValueOnce(new Error(errorMessage))

    const {result} = renderHook(() => useGamesPlayedGetApi(mockEndpoint))

    await waitFor(() => {
      expect(result.current.status).toBe('error')
    })

    expect(result.current.message).toEqual([])
    expect(result.current.error).toBe(errorMessage)
  })

  test('handles non-ok response', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
    } as Response)

    const {result} = renderHook(() => useGamesPlayedGetApi(mockEndpoint))

    await waitFor(() => {
      expect(result.current.status).toBe('error')
    })

    expect(result.current.message).toEqual([])
    expect(result.current.error).toBe(
      'Error using endpoint http://localhost:4000/api/games/played',
    )
  })

  test('handles non-array message response', async () => {
    const mockResponse = {message: null}

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    } as Response)

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

    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({message: []}),
    } as Response)

    const {result, rerender} = renderHook(
      ({endpoint}) => useGamesPlayedGetApi(endpoint),
      {initialProps: {endpoint: firstEndpoint}},
    )

    await waitFor(() => {
      expect(result.current.status).toBe('success')
    })

    expect(mockFetch).toHaveBeenCalledWith(
      'http://localhost:4000/api/games/played',
    )

    // Change endpoint
    rerender({endpoint: secondEndpoint})

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:4000/api/games/favorite',
      )
    })

    expect(mockFetch).toHaveBeenCalledTimes(2)
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

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({message: mockGames}),
    } as Response)

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
