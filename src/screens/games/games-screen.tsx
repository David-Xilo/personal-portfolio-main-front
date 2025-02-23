import * as React from 'react'

import {Games,useGamesGetApi} from '../../hooks/games-rest'
import {ContentListItem} from 'components/menu/content-list-item'

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

  // return (
  //   <div>
  //     {message.map(item => (
  //       <GamesItem games={item} key={item.link_to_git} />
  //     ))}
  //   </div>
  // )

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
