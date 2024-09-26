import * as React from 'react'

import {useNewsGetApi} from '../hooks/news-rest'
import {News} from '../hooks/news-rest'

const NewsItem: React.FC<{ news: News }> = ({ news }) => {
  return (
    <div>
      <h2>{news.headline}</h2>
      <p>{news.description}</p>
      <a href={news.link_to_source}>Source</a>
      <p>Sentiment: {news.sentiment}</p>
      <p>Genre: {news.genre}</p>
    </div>
  )
}

const NewsScreen: React.FC<{ path: string }> = ({ path }) => {
  const newsPath = '/' + path + '/news'
  const {status, message, error} = useNewsGetApi(newsPath)
  if (status !== 'success') {
    return <div>Found error {error}</div>
  }

  return (
    <div>
      {message.map(item => (
        <NewsItem news={item} key={item.link_to_source} />
      ))}
    </div>
  )
}

export {NewsScreen}
