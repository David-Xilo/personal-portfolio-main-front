import * as React from 'react'
import {useEffect} from 'react'
import {SET_HIDDEN_NAV} from '../../reducers/hidden-menu-reducer.js'
import {GamesScreen} from 'components/games.tsx'
import {useIntroGetApi} from '../../hooks/intro-rest.tsx'

function GamesSideProjectsHiddenMenu() {
  const data = useIntroGetApi('/tech/intro')

  return <p>{data.message}</p>
}

function GamesSideProjectsScreen({hiddenMenuDispatch}) {
  useEffect(() => {
    hiddenMenuDispatch({
      type: SET_HIDDEN_NAV,
      component: GamesSideProjectsHiddenMenu,
    })
  }, [hiddenMenuDispatch])

  return (<GamesScreen />)
}

export {GamesSideProjectsScreen}
