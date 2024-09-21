import * as React from 'react'

import {useNewsGetApi} from '../../../hooks/rest/news'
import {News} from '../../../hooks/rest/news'

interface NewsScreenProps {
  path: string;
}

interface NewsItemProps {
  news: News;
}

const NewsItem: React.FC<NewsItemProps> = ({news}) => {
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

const NewsScreen: React.FC<NewsScreenProps> = ({ path }) => {
  const newsPath = "/" + path + "/news"
  const {status, message, error} = useNewsGetApi(newsPath)

  console.log('Message in NewsScreen:', message);
  if (status !== "success") {
    return <div>Found error {error}</div>
  }

  return (
    <div>
      {message.map((item) => (
        <NewsItem news={item} key={item.link_to_source} />
      ))}
    </div>
  );
};

export {NewsScreen}
