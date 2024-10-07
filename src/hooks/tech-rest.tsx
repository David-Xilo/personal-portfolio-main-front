import {useState, useEffect} from 'react'

const domain = process.env.REACT_APP_API_URL

interface TechProjects {
  title: string,
  description: string,
  link_to_git: string,
}

interface TechProjectsResponse {
  status: string,
  message: TechProjects[],
  error: string | null
}

const useTechProjectsGetApi = (path: string): TechProjectsResponse => {
  const completeEndpoint = domain + path
  const [data, setData] = useState<TechProjectsResponse>({
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
        const normalizedData: TechProjectsResponse = {
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
  })
  return data
}


export {useTechProjectsGetApi, TechProjects}
