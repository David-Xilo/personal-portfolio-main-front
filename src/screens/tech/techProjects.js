import * as React from 'react'

import {useEffect} from 'react'
import {SET_HIDDEN_NAV} from '../../reducers/hiddenMenuReducer'
import {useGetApi} from '../../hooks/useApi'

function TechProjectsHiddenMenu() {

  const data = useGetApi('tech/intro');

  return (
    <p>{data.message}</p>
  )
}


function TechProjectsScreen({ hiddenMenuDispatch }) {
  useEffect(() => {
    hiddenMenuDispatch({ type: SET_HIDDEN_NAV, component: TechProjectsHiddenMenu });
  }, [hiddenMenuDispatch]);

  const data = useGetApi('tech/projects');

  return (
    <div>{data.message}</div>
  )
}

export {TechProjectsScreen}