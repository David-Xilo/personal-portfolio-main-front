import * as React from 'react'

import {useEffect} from 'react'
import {SET_HIDDEN_NAV} from '../../reducers/hidden-menu-reducer.js'
import {useGetApi} from '../../hooks/use-api.js'
import {TechProjectsScreen} from 'components/tech.tsx'

function TechProjectsHiddenMenu() {
  const data = useGetApi('tech/intro')

  return <p>{data.message}</p>
}

function TechSideProjectsScreen({hiddenMenuDispatch}) {
  useEffect(() => {
    hiddenMenuDispatch({
      type: SET_HIDDEN_NAV,
      component: TechProjectsHiddenMenu,
    })
  }, [hiddenMenuDispatch])

  return (<TechProjectsScreen />)
}

export {TechSideProjectsScreen}
