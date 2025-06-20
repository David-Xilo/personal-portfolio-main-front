import {RepositoryInfo} from 'components/projects/repository'
import {useEffect, useState} from 'react'

const domain = process.env.REACT_APP_API_URL

interface Project {
  title: string
  description: string
  repositories: RepositoryInfo[]
  genre?: string
  link_to_store?: string
}

interface ProjectsResponse {
  status: string
  message: Project[]
  error: string | null
}

const useProjectsGetApi = (path: string): ProjectsResponse => {
  const completeEndpoint = domain + path
  const [data, setData] = useState<ProjectsResponse>({
    status: '',
    message: [],
    error: null,
  })

  useEffect(() => {
    fetch(completeEndpoint)
      .then(res => {
        if (!res.ok) {
          throw new Error('Error using endpoint ' + completeEndpoint)
        }
        return res.json()
      })
      .then(data => {
        const normalizedData: ProjectsResponse = {
          status: 'success',
          message: Array.isArray(data.message) ? data.message : [],
          error: null,
        }
        setData(normalizedData)
      })
      .catch(err => {
        const errorData = {
          status: 'error',
          message: [],
          error: err.message,
        }
        setData(errorData)
      })
  }, [completeEndpoint])

  return data
}

export {useProjectsGetApi, Project}
