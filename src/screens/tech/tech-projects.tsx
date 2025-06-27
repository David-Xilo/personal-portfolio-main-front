import React from 'react'

import {useEffect} from 'react'
import {SET_HIDDEN_NAV} from '../../reducers/hidden-menu-reducer'
import {SubMenuProps} from '../../reducers/sub-menu-reducer'
import {ContactScreen} from 'components/contact/contact-screen'
import {GenericProjectsScreen} from 'components/projects/project'

function TechProjectsHiddenMenu() {
  return <ContactScreen variant="compact" maxWidth="500px" />
}

const TechProjectsScreen: React.FC<SubMenuProps> = ({hiddenMenuDispatch}) => {
  useEffect(() => {
    hiddenMenuDispatch({
      type: SET_HIDDEN_NAV,
      component: TechProjectsHiddenMenu,
    })
  }, [hiddenMenuDispatch])

  return (
    <GenericProjectsScreen
      projectsPath={'/tech/projects'}
      projectName={'Tech Projects'}
    />
  )
}

export {TechProjectsScreen}
