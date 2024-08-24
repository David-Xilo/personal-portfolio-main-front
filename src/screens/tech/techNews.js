import * as React from 'react'

import {useEffect} from 'react'
import {SET_HIDDEN_NAV} from '../../reducers/hiddenMenuReducer'
import {useGetApi} from '../../hooks/useApi'

function TechNewsHiddenMenu() {

  // const data = useGetApi('tech/news')
  const data = useGetApi('finance/intro');

  return (
    <p>{data.message}</p>
  )
}


function TechNewsScreen({ hiddenMenuDispatch }) {
  useEffect(() => {
    hiddenMenuDispatch({ type: SET_HIDDEN_NAV, component: TechNewsHiddenMenu });
  }, [hiddenMenuDispatch]);

  // const data = useGetApi('tech/news')
  const data = useGetApi('finance/intro');

  return (
    <p>{data.message}</p>
  )
}

export {TechNewsScreen}