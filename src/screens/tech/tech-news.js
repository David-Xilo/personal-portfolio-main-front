import * as React from 'react'

import {useEffect} from 'react'
import {SET_HIDDEN_NAV} from '../../reducers/hidden-menu-reducer'
import {NewsScreen} from 'components/news-screen'
import {useIntroGetApi} from '../../hooks/intro-rest'

function TechNewsHiddenMenu() {
  const data = useIntroGetApi('/tech/intro')

  return <p>{data.message}</p>
}

function TechNewsScreen({hiddenMenuDispatch}) {
  useEffect(() => {
    hiddenMenuDispatch({type: SET_HIDDEN_NAV, component: TechNewsHiddenMenu})
  }, [hiddenMenuDispatch])

  return <NewsScreen path={'tech'} />
}

export {TechNewsScreen}
