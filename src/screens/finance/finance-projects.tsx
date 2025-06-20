import * as React from 'react'

import {useEffect} from 'react'
import {SET_HIDDEN_NAV} from '../../reducers/hidden-menu-reducer'
import {SubMenuProps} from '../../reducers/sub-menu-reducer'
import {ContactScreen} from '../about/contact-screen'
import {GenericProjectsScreen} from 'components/projects/project'

function FinanceProjectsHiddenMenu() {
  return <ContactScreen variant="compact" maxWidth="500px" />
}

const FinanceProjectsScreen: React.FC<SubMenuProps> = ({
  hiddenMenuDispatch,
}) => {
  useEffect(() => {
    hiddenMenuDispatch({
      type: SET_HIDDEN_NAV,
      component: FinanceProjectsHiddenMenu,
    })
  }, [hiddenMenuDispatch])

  return <GenericProjectsScreen projectsPath={'/finance/projects'} projectName={'Finance Projects'} />
}

export {FinanceProjectsScreen}
