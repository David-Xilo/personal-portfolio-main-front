import {useEffect, useState} from 'react'

const domain = process.env.REACT_APP_API_URL

interface AboutReviews {
  author: string
  rating: number
  description: string
}

interface AboutReviewsResponse {
  status: string
  message: AboutReviews[]
  error: string | null
}

const useAboutReviewsGetApi = (endpoint: string): AboutReviewsResponse => {
  const completeEndpoint = domain + endpoint
  const [data, setData] = useState<AboutReviewsResponse>({
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
        const normalizedData: AboutReviewsResponse = {
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

export {useAboutReviewsGetApi, AboutReviews}
