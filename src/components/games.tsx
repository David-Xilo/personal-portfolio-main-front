import * as React from 'react'

import {Games,useGamesGetApi} from '../hooks/games-rest'

const GamesItem: React.FC<{ games: Games }> = ({ games }) => {
  return (
    <div>
      <h2>{games.title}</h2>
      <p>{games.description}</p>
      <a href={games.link_to_git}>Source</a>
      <a href={games.link_to_store}>Store</a>
      <p>Genre: {games.genre}</p>
    </div>
  )
}

const GamesScreen: React.FC = () => {
  const newsPath = '/games/projects'
  const {status, message, error} = useGamesGetApi(newsPath)
  if (status !== 'success') {
    return <div>Found error {error}</div>
  }

  return (
    <div>
      {message.map(item => (
        <GamesItem games={item} key={item.link_to_git} />
      ))}
    </div>
  )
}

export {GamesScreen}
