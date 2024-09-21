import * as React from 'react'

import {useGetApi} from '../../hooks/useApi'
import {useEffect} from 'react'
import {SET_HIDDEN_NAV} from '../../reducers/hiddenMenuReducer'
import {NewsScreen} from '../display/news/news'

function GamesNewsHiddenMenu() {

  // const data = useGetApi('tech/news')
  const data = useGetApi('tech/intro');

  return (
    <p>{data.message}</p>
  )
}


function GamesNewsScreen({ hiddenMenuDispatch }) {
  useEffect(() => {
    hiddenMenuDispatch({ type: SET_HIDDEN_NAV, component: GamesNewsHiddenMenu });
  }, [hiddenMenuDispatch]);

  return (
    <NewsScreen path={'games'} />
  )
}

export {GamesNewsScreen}
