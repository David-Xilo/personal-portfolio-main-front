import * as React from 'react'

import {useEffect} from 'react'
import {
  CLEAR_HIDDEN_NAV,
} from '../../reducers/hidden-menu-reducer'
import {ContactScreen} from 'components/contact/contact-screen'
import {SubMenuProps} from '../../reducers/sub-menu-reducer'

const AboutContactsScreen: React.FC<SubMenuProps> = ({hiddenMenuDispatch}) => {
  useEffect(() => {
    hiddenMenuDispatch({type: CLEAR_HIDDEN_NAV})
  }, [hiddenMenuDispatch])

  return <ContactScreen variant="default" />
}

export {AboutContactsScreen}
