import {renderHook, waitFor} from '@testing-library/react'
import {useProjectsGetApi} from '../../api/hooks/projects-rest'
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

describe('useProjectsGetApi', () => {
  const mockEndpoint = '/api/projects'
  const originalEnv = process.env

  beforeEach(() => {
    jest.clearAllMocks()
    process.env = {...originalEnv}
    process.env.REACT_APP_API_URL = 'http://localhost:8080'
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
            link_to_git: 'https://github.com/test/repo1',
          },
        ],
        genre: 'Web Development',
        link_to_store: 'https://store.example.com/project1',
      },
      {
        title: 'Project Two',
        description: 'Second project description',
        repositories: [
          {
            title: 'Repo 2',
            description: 'Another repository',
            link_to_git: 'https://github.com/test/repo2',
          },
        ],
      },
    ]

    mockApiClient.get.mockResolvedValueOnce({
      message: mockProjects,
    })

    const {result} = renderHook(() => useProjectsGetApi(mockEndpoint))

    // Initial state (hook loads immediately)
    expect(result.current.message).toEqual([])
    expect(result.current.error).toBe(null)

    // Wait for the API call to complete
    await waitFor(() => {
      expect(result.current.status).toBe('success')
    })

    expect(result.current.message).toEqual(mockProjects)
    expect(result.current.error).toBe(null)
    expect(mockApiClient.get).toHaveBeenCalledWith(mockEndpoint)
  })

  test('handles fetch error', async () => {
    const networkError = new ApiError('Network error', 0, 'NETWORK_ERROR')
    mockApiClient.get.mockRejectedValueOnce(networkError)

    const {result} = renderHook(() => useProjectsGetApi(mockEndpoint))

    await waitFor(() => {
      expect(result.current.status).toBe('error')
    })

    expect(result.current.message).toEqual([])
    expect(result.current.error).toBe('Network error - check your connection')
  })

  test('handles non-ok response', async () => {
    const apiError = new ApiError('Server error', 500, 'SERVER_ERROR')
    mockApiClient.get.mockRejectedValueOnce(apiError)

    const {result} = renderHook(() => useProjectsGetApi(mockEndpoint))

    await waitFor(() => {
      expect(result.current.status).toBe('error')
    })

    expect(result.current.message).toEqual([])
    expect(result.current.error).toBe('Server error - please try again later')
  })

  test('handles non-array message response', async () => {
    const mockResponse = {message: null}

    mockApiClient.get.mockResolvedValueOnce(mockResponse)

    const {result} = renderHook(() => useProjectsGetApi(mockEndpoint))

    await waitFor(() => {
      expect(result.current.status).toBe('success')
    })

    expect(result.current.message).toEqual([])
    expect(result.current.error).toBe(null)
  })

  test('re-fetches when path changes', async () => {
    const firstPath = '/api/projects'
    const secondPath = '/api/projects/featured'

    mockApiClient.get.mockResolvedValue({
      message: [],
    })

    const {result, rerender} = renderHook(({path}) => useProjectsGetApi(path), {
      initialProps: {path: firstPath},
    })

    await waitFor(() => {
      expect(result.current.status).toBe('success')
    })

    expect(mockApiClient.get).toHaveBeenCalledWith(firstPath)

    // Change path
    rerender({path: secondPath})

    await waitFor(() => {
      expect(mockApiClient.get).toHaveBeenCalledWith(secondPath)
    })

    expect(mockApiClient.get).toHaveBeenCalledTimes(2)
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
            link_to_git: 'https://github.com/test/valid',
          },
        ],
        genre: 'Mobile Development',
        link_to_store:
          'https://play.google.com/store/apps/details?id=com.example',
      },
    ]

    mockApiClient.get.mockResolvedValueOnce({
      message: mockProjects,
    })

    const {result} = renderHook(() => useProjectsGetApi(mockEndpoint))

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
        repositories: [],
      },
    ]

    mockApiClient.get.mockResolvedValueOnce({
      message: mockProjects,
    })

    const {result} = renderHook(() => useProjectsGetApi(mockEndpoint))

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
