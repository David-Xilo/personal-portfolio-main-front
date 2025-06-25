import * as React from 'react'
import {useEffect} from 'react'
import {SET_HIDDEN_NAV} from '../../reducers/hidden-menu-reducer'
import {SubMenuProps} from '../../reducers/sub-menu-reducer'
import {ContactScreen} from 'components/contact/contact-screen'
import {GenericProjectsScreen} from 'components/projects/project'

const GamesProjectsHiddenMenu: React.FC = () => {
  return <ContactScreen variant="compact" maxWidth="500px" />
}

const GamesProjectsScreen: React.FC<SubMenuProps> = ({hiddenMenuDispatch}) => {
  useEffect(() => {
    hiddenMenuDispatch({
      type: SET_HIDDEN_NAV,
      component: GamesProjectsHiddenMenu,
    })
  }, [hiddenMenuDispatch])

  return (
    <GenericProjectsScreen
      projectsPath={'/games/projects'}
      projectName={'Games Projects'}
    />
  )
}

export {GamesProjectsScreen}
