import {RepositoryInfo} from 'components/projects/repository'
import {useEffect, useState} from 'react'
import apiClient, {ApiError} from '../client'
import {handleApiError, handleUnexpectedError} from './shared/error-handler'

interface Project {
  title: string
  description: string
  repositories: RepositoryInfo[]
  link_to_project: string
}

interface ProjectsResponse {
  status: string
  message: Project[]
  error: string | null
}

const useProjectsGetApi = (path: string): ProjectsResponse => {
  const [data, setData] = useState<ProjectsResponse>({
    status: 'loading',
    message: [],
    error: null,
  })

  useEffect(() => {
    const controller = new AbortController()

    const fetchData = async () => {
      try {

        if (!navigator.onLine) {
          throw new ApiError('No internet connection', 0, 'OFFLINE')
        }

        const response = await apiClient.get<{message: Project[]}>(path)

        const normalizedData: ProjectsResponse = {
          status: 'success',
          message: Array.isArray(response.message) ? response.message : [],
          error: null,
        }
        setData(normalizedData)
      } catch (err) {
        const {errorMessage, shouldReturn} = handleApiError(err)
        if (shouldReturn) return

        const errorData: ProjectsResponse = {
          status: 'error',
          message: [],
          error: errorMessage,
        }
        setData(errorData)
      }
    }

    fetchData().catch(err => {
      const errorData: ProjectsResponse = {
        status: 'error',
        message: [],
        error: handleUnexpectedError(err),
      }
      setData(errorData)
    })

    return () => {
      controller.abort()
    }
  }, [path])

  return data
}

export {useProjectsGetApi}
export type {Project}
