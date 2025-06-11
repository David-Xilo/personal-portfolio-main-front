import {useEffect, useState} from 'react'

const domain = process.env.REACT_APP_API_URL

interface IntroResponse {
  status: string
  message: string | null
  error: string | null
}

const useIntroGetApi = (endpoint: string) => {
  const completeEndpoint = domain + endpoint
  const [data, setData] = useState<IntroResponse>({
    status: '',
    message: null,
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
        const normalizedData = {
          status: 'success',
          message: data.message,
          error: null,
        }
        setData(normalizedData)
      })
      .catch(err => {
        const errorData = {
          status: 'error',
          message: null,
          error: err.message,
        }
        setData(errorData)
      })
  }, [completeEndpoint])

  return data
}

export {useIntroGetApi}
