import {useState} from 'react'

const domain = process.env.REACT_APP_API_URL

const usePostApi = (endpoint, body) => {
  const completeEndpoint = domain + endpoint
  const [data, setData] = useState({})

  const handleSubmit = async e => {
    e.preventDefault()
    const response = await fetch(completeEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    setData(await response.json())
  }

  return {data, handleSubmit}
}

export {usePostApi}
