import * as React from 'react'

import {useEffect} from 'react'
import {SET_HIDDEN_NAV} from '../../reducers/hidden-menu-reducer'
import {NewsScreen} from 'components/news-screen'
import {useIntroGetApi} from '../../hooks/intro-rest'
import {SubMenuProps} from '../../reducers/sub-menu-reducer'

const TechNewsHiddenMenu: React.FC = () => {
  const data = useIntroGetApi('/tech/intro')

  return <p>{data.message}</p>
}

const TechNewsScreen: React.FC<SubMenuProps> = ({hiddenMenuDispatch}) => {
  useEffect(() => {
    hiddenMenuDispatch({type: SET_HIDDEN_NAV, component: TechNewsHiddenMenu})
  }, [hiddenMenuDispatch])

  return <NewsScreen path={'tech'} />
}

export {TechNewsScreen}
