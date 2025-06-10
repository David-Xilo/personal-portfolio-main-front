import * as React from 'react'

import {Games,useGamesGetApi} from '../../hooks/games-rest'
import {ContentListItem} from 'components/menu/content-list-item'

const GamesEmptyProjectsScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
          No Projects Available
        </h2>
        <p className="text-gray-500">
          There are currently no games to display. Check back later for updates!
        </p>
      </div>
    </div>
  )
}

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
  const gamesPath = '/games/projects'
  const {status, message, error} = useGamesGetApi(gamesPath)
  if (status !== 'success') {
    return <div>Found error {error}</div>
  }

  if (!message || message.length === 0) {
    return <GamesEmptyProjectsScreen />
  }

  return (
    <div className="flex flex-col space-y-4">
      {message.map(item => (
        <ContentListItem title={item.title} description={item.description}>
          <GamesItem games={item} />
        </ContentListItem>
      ))}
    </div>
  )
}

export {GamesScreen}
