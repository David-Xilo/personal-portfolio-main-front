import * as React from 'react'

import {useEffect} from 'react'
import {SET_HIDDEN_NAV} from '../../reducers/hidden-menu-reducer'
import {useIntroGetApi} from '../../hooks/intro-rest'
import {SubMenuProps} from '../../reducers/sub-menu-reducer'
import {FinanceProjectsItemScreen} from './finance-screen'
import {ContactScreen} from '../about/contact-screen'

function FinanceProjectsHiddenMenu() {
  // TODO
  // adjust the font size so the contact info always fits the card
  return <ContactScreen />
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

  return <FinanceProjectsItemScreen />
}

export {FinanceProjectsScreen}
