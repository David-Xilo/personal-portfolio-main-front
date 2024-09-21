import * as React from 'react'

import {useNewsGetApi} from '../../../hooks/rest/news'
import {News} from '../../../hooks/rest/news'

interface NewsScreenProps {
  path: string;
}

interface NewsItemProps {
  news: News;
  idx: number;
}

const NewsItem: React.FC<NewsItemProps> = ({news, idx}) => {
  return (
    <div key={idx}>
      <h2>{news.headline}</h2>
      <p>{news.description}</p>
      <a href={news.link_to_source}>Source</a>
      <p>Sentiment: {news.sentiment}</p>
      <p>Genre: {news.genre}</p>
    </div>
  )
}

const NewsScreen: React.FC<NewsScreenProps> = ({ path }) => {
  const newsPath = "/" + path + "/news"
  const {status, message, error} = useNewsGetApi(newsPath)

  if (status !== "success") {
    return <div>Found error {error}</div>
  }

  return (
    <div>
      {message.map((item, index) => (
        <NewsItem news={item} idx={index} />
      ))}
    </div>
  );
};

export {NewsScreen}
