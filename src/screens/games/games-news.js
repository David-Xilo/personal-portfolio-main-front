import * as React from 'react'

import {useEffect} from 'react'
import {SET_HIDDEN_NAV} from '../../reducers/hidden-menu-reducer.js'
import {NewsScreen} from 'components/news.tsx'
import {useIntroGetApi} from '../../hooks/intro-rest.tsx'

function GamesNewsHiddenMenu() {
  // const data = useGetApi('tech/news')
  const data = useIntroGetApi('/tech/intro')

  return <p>{data.message}</p>
}

function GamesNewsScreen({hiddenMenuDispatch}) {
  useEffect(() => {
    hiddenMenuDispatch({type: SET_HIDDEN_NAV, component: GamesNewsHiddenMenu})
  }, [hiddenMenuDispatch])

  return <NewsScreen path={'games'} />
}

export {GamesNewsScreen}
