import * as React from 'react'

import {useEffect} from 'react'
import {SET_HIDDEN_NAV} from '../../reducers/hidden-menu-reducer.js'
import {useGetApi} from '../../hooks/use-api.js'

function TechProjectsHiddenMenu() {
  const data = useGetApi('tech/intro')

  return <p>{data.message}</p>
}

function TechProjectsScreen({hiddenMenuDispatch}) {
  useEffect(() => {
    hiddenMenuDispatch({
      type: SET_HIDDEN_NAV,
      component: TechProjectsHiddenMenu,
    })
  }, [hiddenMenuDispatch])

  const data = useGetApi('tech/projects')

  return <div>{data.message}</div>
}

export {TechProjectsScreen}
