import * as React from 'react'

import {useEffect} from 'react'
import {SET_HIDDEN_NAV} from '../../reducers/hidden-menu-reducer'
import {TechProjectsScreen} from 'components/tech-screen'
import {useIntroGetApi} from '../../hooks/intro-rest'

function TechProjectsHiddenMenu() {
  const data = useIntroGetApi('/tech/intro')

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
