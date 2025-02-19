import * as React from 'react'

import {useContactGetApi} from '../../hooks/contact-rest'


const ContactScreen: React.FC = () => {
  const newsPath = '/about/contact'
  const {status, message, error} = useContactGetApi(newsPath)
  if (status !== 'success') {
    return <div>Found error {error}</div>
  }

  return (
    <div>
      <h2>{message?.name}</h2>
      <p>{message?.email}</p>
      <a href={message?.github}>Github</a>
      <a href={message?.linkedin}>Linkedin</a>
    </div>
  )
}

export {ContactScreen}
