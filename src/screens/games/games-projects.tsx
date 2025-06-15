import * as React from 'react'
import {useEffect} from 'react'
import {SET_HIDDEN_NAV} from '../../reducers/hidden-menu-reducer'
import {GamesScreen} from './games-screen'
import {useIntroGetApi} from '../../hooks/intro-rest'
import {SubMenuProps} from '../../reducers/sub-menu-reducer'
import {ContactScreen} from '../about/contact-screen'

const GamesProjectsHiddenMenu: React.FC = () => {
  // const data = useIntroGetApi('/tech/intro')
  //
  // return <p>{data.message}</p>
  return (<ContactScreen />)
}

const GamesProjectsScreen: React.FC<SubMenuProps> = ({hiddenMenuDispatch}) => {
  useEffect(() => {
    hiddenMenuDispatch({
      type: SET_HIDDEN_NAV,
      component: GamesProjectsHiddenMenu,
    })
  }, [hiddenMenuDispatch])

  return <GamesScreen />
}

export {GamesProjectsScreen}
