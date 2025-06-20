import {useState, useEffect} from 'react'
import {RepositoryInfo} from 'components/projects/repository'

const domain = process.env.REACT_APP_API_URL

interface FinanceProjects {
  title: string
  description: string
  projects: RepositoryInfo[]
}

interface FinanceProjectsResponse {
  status: string
  message: FinanceProjects[]
  error: string | null
}

const useFinanceProjectsGetApi = (path: string): FinanceProjectsResponse => {
  const completeEndpoint = domain + path
  const [data, setData] = useState<FinanceProjectsResponse>({
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
        const normalizedData: FinanceProjectsResponse = {
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

export {useFinanceProjectsGetApi, FinanceProjects}
