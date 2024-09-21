import {useState, useEffect} from 'react';


const domain = "localhost:4000"

interface News {
  headline: string;
  link_to_source: string;
  description: string;
  sentiment: string;
  genre: string;
}

interface NewsResponse {
  status: string;
  message: News[];
  error: string | null;
}

const useNewsGetApi = (endpoint: string): NewsResponse => {
  const completeEndpoint = domain + endpoint;
  const [data, setData] = useState<NewsResponse>({
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
      .then((data) => {
        const normalizedData: NewsResponse = {
          status: "success",
          message: Array.isArray(data.message) ? data.message : [],
          error: null
        }
        setData(normalizedData)
      })
      .catch((err) => {
        const errorData = {
          status: "error",
          message: [],
          error: err.message,
        }
        setData(errorData)
      })
  }, [completeEndpoint])

  return data
};


export {useNewsGetApi, News};


