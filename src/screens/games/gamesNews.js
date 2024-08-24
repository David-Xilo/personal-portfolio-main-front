import * as React from 'react'

import {useGetApi} from '../../hooks/useApi'
import {useEffect} from 'react'
import {SET_HIDDEN_NAV} from '../../reducers/hiddenMenuReducer'

function GamesNewsHiddenMenu() {

  // const data = useGetApi('tech/news')
  const data = useGetApi('finance/intro');

  return (
    <p>{data.message}</p>
  )
}


function GamesNewsScreen({ hiddenMenuDispatch }) {
  useEffect(() => {
    hiddenMenuDispatch({ type: SET_HIDDEN_NAV, component: GamesNewsHiddenMenu });
  }, [hiddenMenuDispatch]);

  // const data = useGetApi('tech/news')
  const data = useGetApi('finance/intro');

  return (
    <p>{data.message}</p>
  )
}

export {GamesNewsScreen}
