import * as React from 'react'

import {useEffect} from 'react'
import {SET_HIDDEN_NAV} from '../../reducers/hidden-menu-reducer'
import {NewsScreen} from 'components/news-screen'
import {useIntroGetApi} from '../../hooks/intro-rest'
import {SubMenuProps} from '../../reducers/sub-menu-reducer'

const GamesNewsHiddenMenu: React.FC = () => {
  const data = useIntroGetApi('/tech/intro')

  return <p>{data.message}</p>
}

const GamesNewsScreen: React.FC<SubMenuProps> = ({hiddenMenuDispatch}) => {
  useEffect(() => {
    hiddenMenuDispatch({type: SET_HIDDEN_NAV, component: GamesNewsHiddenMenu})
  }, [hiddenMenuDispatch])

  return <NewsScreen path={'games'} />
}

export {GamesNewsScreen}
