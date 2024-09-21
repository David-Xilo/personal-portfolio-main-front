import * as React from 'react'

import {useEffect} from 'react'
import {SET_HIDDEN_NAV} from '../../reducers/hiddenMenuReducer'
import {useGetApi} from '../../hooks/useApi'
import {NewsScreen} from '../display/news/news'

function TechNewsHiddenMenu() {

  const data = useGetApi('tech/intro');

  return (
    <p>{data.message}</p>
  )
}


function TechNewsScreen({ hiddenMenuDispatch }) {
  useEffect(() => {
    hiddenMenuDispatch({ type: SET_HIDDEN_NAV, component: TechNewsHiddenMenu });
  }, [hiddenMenuDispatch]);

  return (
    <NewsScreen path={'tech'} />
  )
}

export {TechNewsScreen}