import React, { useState, useEffect } from 'react';


const domain = "http://localhost:4000/";

const useGetApi = (endpoint) => {
  const completeEndpoint = domain + endpoint;
  const [data, setData] = useState([]);
  console.log(completeEndpoint)
  useEffect(() => {
    fetch(completeEndpoint)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error(error));
  }, [completeEndpoint]);

  return data;
}

const usePostApi = (endpoint, body) => {
    const completeEndpoint = domain + endpoint;
    const [data, setData] = useState({});
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const response = await fetch(completeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      setData(await response.json());
    };
  
    return {data, handleSubmit};
  }

export {useGetApi, usePostApi}
