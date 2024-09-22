import {useEffect, useState} from 'react'

const domain = 'http://localhost:4000/'

interface Games {
  title: string
  genre: string
  description: string
  link_to_git: string
  link_to_store: string
}

interface GamesResponse {
  status: string
  message: Games[]
  error: string | null
}

const useGamesGetApi = (endpoint: string): GamesResponse => {
  const completeEndpoint = domain + endpoint
  const [data, setData] = useState<GamesResponse>({
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
        const normalizedData: GamesResponse = {
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

export {useGamesGetApi, Games}

