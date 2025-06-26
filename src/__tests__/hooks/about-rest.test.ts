import {renderHook, waitFor} from '@testing-library/react'
import {useAboutReviewsGetApi} from '../../api/hooks/about-rest'

// Mock fetch
global.fetch = jest.fn()

const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>

describe('useAboutReviewsGetApi', () => {
  const mockEndpoint = '/api/about/reviews'
  const originalEnv = process.env

  beforeEach(() => {
    jest.clearAllMocks()
    process.env = {...originalEnv}
    process.env.REACT_APP_API_URL = 'http://localhost:4000'
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

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({message: mockReviews}),
    } as Response)

    const {result} = renderHook(() => useAboutReviewsGetApi(mockEndpoint))

    // Initial state
    expect(result.current.status).toBe('')
    expect(result.current.message).toEqual([])
    expect(result.current.error).toBe(null)

    // Wait for the API call to complete
    await waitFor(() => {
      expect(result.current.status).toBe('success')
    })

    expect(result.current.message).toEqual(mockReviews)
    expect(result.current.error).toBe(null)
    expect(mockFetch).toHaveBeenCalledWith(
      'http://localhost:4000/api/about/reviews',
    )
  })

  test('handles fetch error', async () => {
    const errorMessage = 'Network error'
    mockFetch.mockRejectedValueOnce(new Error(errorMessage))

    const {result} = renderHook(() => useAboutReviewsGetApi(mockEndpoint))

    await waitFor(() => {
      expect(result.current.status).toBe('error')
    })

    expect(result.current.message).toEqual([])
    expect(result.current.error).toBe(errorMessage)
  })

  test('handles non-ok response', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
    } as Response)

    const {result} = renderHook(() => useAboutReviewsGetApi(mockEndpoint))

    await waitFor(() => {
      expect(result.current.status).toBe('error')
    })

    expect(result.current.message).toEqual([])
    expect(result.current.error).toBe(
      'Error using endpoint http://localhost:4000/api/about/reviews',
    )
  })

  test('handles non-array message response', async () => {
    const mockResponse = {message: 'not an array'}

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    } as Response)

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

    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({message: []}),
    } as Response)

    const {result, rerender} = renderHook(
      ({endpoint}) => useAboutReviewsGetApi(endpoint),
      {initialProps: {endpoint: firstEndpoint}},
    )

    await waitFor(() => {
      expect(result.current.status).toBe('success')
    })

    expect(mockFetch).toHaveBeenCalledWith(
      'http://localhost:4000/api/about/reviews',
    )

    // Change endpoint
    rerender({endpoint: secondEndpoint})

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:4000/api/about/other-reviews',
      )
    })

    expect(mockFetch).toHaveBeenCalledTimes(2)
  })
})
