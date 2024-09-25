import {useState, useEffect} from 'react'

const domain = 'http://localhost:4000'

interface ContactRest {
  name: string
  email: string
  linkedin: string
  github: string
}

interface ContactResponse {
  status: string
  message: ContactRest | null
  error: string | null
}

const useContactGetApi = (endpoint: string): ContactResponse => {
  const completeEndpoint = domain + endpoint
  const [data, setData] = useState<ContactResponse>({
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
        const normalizedData: ContactResponse = {
          status: 'success',
          message: Array.isArray(data.message) ? data.message : [],
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

export {useContactGetApi}
