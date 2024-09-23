import * as React from 'react'

import {useGetApi} from '../../hooks/use-api.js'
import {useEffect} from 'react'
import {SET_HIDDEN_NAV} from '../../reducers/hidden-menu-reducer.js'
import {NewsScreen} from 'components/news.tsx'

function GamesNewsHiddenMenu() {
  // const data = useGetApi('tech/news')
  const data = useGetApi('tech/intro')

  return <p>{data.message}</p>
}

function GamesNewsScreen({hiddenMenuDispatch}) {
  useEffect(() => {
    hiddenMenuDispatch({type: SET_HIDDEN_NAV, component: GamesNewsHiddenMenu})
  }, [hiddenMenuDispatch])

  return <NewsScreen path={'games'} />
}

export {GamesNewsScreen}
