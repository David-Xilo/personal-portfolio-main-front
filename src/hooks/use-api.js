import {useState, useEffect} from 'react'

const domain = 'http://localhost:4000'

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
