import { renderHook, waitFor } from '@testing-library/react'
import { useProjectsGetApi } from '../../hooks/projects-rest'

// Mock fetch
global.fetch = jest.fn()

const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>

describe('useProjectsGetApi', () => {
  const mockEndpoint = '/api/projects'
  const originalEnv = process.env

  beforeEach(() => {
    jest.clearAllMocks()
    process.env = { ...originalEnv }
    process.env.REACT_APP_API_URL = 'http://localhost:4000'
  })

  afterEach(() => {
    process.env = originalEnv
  })

  test('fetches projects successfully', async () => {
    const mockProjects = [
      {
        title: 'Project One',
        description: 'First project description',
        repositories: [
          {
            title: 'Repo 1',
            description: 'Repository description',
            link_to_git: 'https://github.com/test/repo1'
          }
        ],
        genre: 'Web Development',
        link_to_store: 'https://store.example.com/project1'
      },
      {
        title: 'Project Two',
        description: 'Second project description',
        repositories: [
          {
            title: 'Repo 2',
            description: 'Another repository',
            link_to_git: 'https://github.com/test/repo2'
          }
        ]
      }
    ]

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: mockProjects })
    } as Response)

    const { result } = renderHook(() => useProjectsGetApi(mockEndpoint))

    // Initial state
    expect(result.current.status).toBe('')
    expect(result.current.message).toEqual([])
    expect(result.current.error).toBe(null)

    // Wait for the API call to complete
    await waitFor(() => {
      expect(result.current.status).toBe('success')
    })

    expect(result.current.message).toEqual(mockProjects)
    expect(result.current.error).toBe(null)
    expect(mockFetch).toHaveBeenCalledWith('http://localhost:4000/api/projects')
  })

  test('handles fetch error', async () => {
    const errorMessage = 'Network error'
    mockFetch.mockRejectedValueOnce(new Error(errorMessage))

    const { result } = renderHook(() => useProjectsGetApi(mockEndpoint))

    await waitFor(() => {
      expect(result.current.status).toBe('error')
    })

    expect(result.current.message).toEqual([])
    expect(result.current.error).toBe(errorMessage)
  })

  test('handles non-ok response', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500
    } as Response)

    const { result } = renderHook(() => useProjectsGetApi(mockEndpoint))

    await waitFor(() => {
      expect(result.current.status).toBe('error')
    })

    expect(result.current.message).toEqual([])
    expect(result.current.error).toBe('Error using endpoint http://localhost:4000/api/projects')
  })

  test('handles non-array message response', async () => {
    const mockResponse = { message: null }

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse
    } as Response)

    const { result } = renderHook(() => useProjectsGetApi(mockEndpoint))

    await waitFor(() => {
      expect(result.current.status).toBe('success')
    })

    expect(result.current.message).toEqual([])
    expect(result.current.error).toBe(null)
  })

  test('re-fetches when path changes', async () => {
    const firstPath = '/api/projects'
    const secondPath = '/api/projects/featured'

    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ message: [] })
    } as Response)

    const { result, rerender } = renderHook(
      ({ path }) => useProjectsGetApi(path),
      { initialProps: { path: firstPath } }
    )

    await waitFor(() => {
      expect(result.current.status).toBe('success')
    })

    expect(mockFetch).toHaveBeenCalledWith('http://localhost:4000/api/projects')

    // Change path
    rerender({ path: secondPath })

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('http://localhost:4000/api/projects/featured')
    })

    expect(mockFetch).toHaveBeenCalledTimes(2)
  })

  test('validates project object structure', async () => {
    const mockProjects = [
      {
        title: 'Valid Project',
        description: 'A valid project description',
        repositories: [
          {
            title: 'Valid Repo',
            description: 'Valid repository',
            link_to_git: 'https://github.com/test/valid'
          }
        ],
        genre: 'Mobile Development',
        link_to_store: 'https://play.google.com/store/apps/details?id=com.example'
      }
    ]

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: mockProjects })
    } as Response)

    const { result } = renderHook(() => useProjectsGetApi(mockEndpoint))

    await waitFor(() => {
      expect(result.current.status).toBe('success')
    })

    expect(result.current.message[0]).toHaveProperty('title')
    expect(result.current.message[0]).toHaveProperty('description')
    expect(result.current.message[0]).toHaveProperty('repositories')
    expect(result.current.message[0]).toHaveProperty('genre')
    expect(result.current.message[0]).toHaveProperty('link_to_store')
    expect(Array.isArray(result.current.message[0].repositories)).toBe(true)
    expect(typeof result.current.message[0].title).toBe('string')
  })

  test('handles projects with optional fields', async () => {
    const mockProjects = [
      {
        title: 'Minimal Project',
        description: 'Project with only required fields',
        repositories: []
      }
    ]

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: mockProjects })
    } as Response)

    const { result } = renderHook(() => useProjectsGetApi(mockEndpoint))

    await waitFor(() => {
      expect(result.current.status).toBe('success')
    })

    expect(result.current.message[0]).toHaveProperty('title')
    expect(result.current.message[0]).toHaveProperty('description')
    expect(result.current.message[0]).toHaveProperty('repositories')
    expect(result.current.message[0]).not.toHaveProperty('genre')
    expect(result.current.message[0]).not.toHaveProperty('link_to_store')
  })
})