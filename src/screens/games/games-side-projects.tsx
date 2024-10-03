import * as React from 'react'
import {useEffect} from 'react'
import {SET_HIDDEN_NAV} from '../../reducers/hidden-menu-reducer'
import {GamesScreen} from 'components/games-screen'
import {useIntroGetApi} from '../../hooks/intro-rest'
import {SubMenuProps} from '../../reducers/sub-menu-reducer'

const GamesSideProjectsHiddenMenu: React.FC = () => {
  const data = useIntroGetApi('/tech/intro')

  return <p>{data.message}</p>
}

const GamesSideProjectsScreen: React.FC<SubMenuProps> = ({hiddenMenuDispatch}) => {
  useEffect(() => {
    hiddenMenuDispatch({
      type: SET_HIDDEN_NAV,
      component: GamesSideProjectsHiddenMenu,
    })
  }, [hiddenMenuDispatch])

  return (<GamesScreen />)
}

export {GamesSideProjectsScreen}
