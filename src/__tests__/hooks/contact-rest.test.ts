import { renderHook, waitFor } from '@testing-library/react'
import { useContactGetApi } from '../../hooks/contact-rest'

// Mock fetch
global.fetch = jest.fn()

const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>

describe('useContactGetApi', () => {
  const mockEndpoint = '/api/contact'
  const originalEnv = process.env

  beforeEach(() => {
    jest.clearAllMocks()
    process.env = { ...originalEnv }
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
      credly: 'https://credly.com/johndoe'
    }

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: mockContact })
    } as Response)

    const { result } = renderHook(() => useContactGetApi(mockEndpoint))

    // Initial state
    expect(result.current.status).toBe('')
    expect(result.current.message).toBe(null)
    expect(result.current.error).toBe(null)

    // Wait for the API call to complete
    await waitFor(() => {
      expect(result.current.status).toBe('success')
    })

    expect(result.current.message).toEqual(mockContact)
    expect(result.current.error).toBe(null)
    expect(mockFetch).toHaveBeenCalledWith('http://localhost:4000/api/contact')
  })

  test('handles fetch error', async () => {
    const errorMessage = 'Network error'
    mockFetch.mockRejectedValueOnce(new Error(errorMessage))

    const { result } = renderHook(() => useContactGetApi(mockEndpoint))

    await waitFor(() => {
      expect(result.current.status).toBe('error')
    })

    expect(result.current.message).toBe(null)
    expect(result.current.error).toBe(errorMessage)
  })

  test('handles non-ok response', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404
    } as Response)

    const { result } = renderHook(() => useContactGetApi(mockEndpoint))

    await waitFor(() => {
      expect(result.current.status).toBe('error')
    })

    expect(result.current.message).toBe(null)
    expect(result.current.error).toBe('Error using endpoint http://localhost:4000/api/contact')
  })

  test('handles null message response', async () => {
    const mockResponse = { message: null }

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse
    } as Response)

    const { result } = renderHook(() => useContactGetApi(mockEndpoint))

    await waitFor(() => {
      expect(result.current.status).toBe('success')
    })

    expect(result.current.message).toBe(null)
    expect(result.current.error).toBe(null)
  })

  test('re-fetches when endpoint changes', async () => {
    const firstEndpoint = '/api/contact'
    const secondEndpoint = '/api/contact/details'

    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ message: null })
    } as Response)

    const { result, rerender } = renderHook(
      ({ endpoint }) => useContactGetApi(endpoint),
      { initialProps: { endpoint: firstEndpoint } }
    )

    await waitFor(() => {
      expect(result.current.status).toBe('success')
    })

    expect(mockFetch).toHaveBeenCalledWith('http://localhost:4000/api/contact')

    // Change endpoint
    rerender({ endpoint: secondEndpoint })

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('http://localhost:4000/api/contact/details')
    })

    expect(mockFetch).toHaveBeenCalledTimes(2)
  })

  test('validates contact object structure', async () => {
    const mockContact = {
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      linkedin: 'https://linkedin.com/in/janesmith',
      github: 'https://github.com/janesmith',
      credly: 'https://credly.com/janesmith'
    }

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: mockContact })
    } as Response)

    const { result } = renderHook(() => useContactGetApi(mockEndpoint))

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