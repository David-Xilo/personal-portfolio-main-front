import * as React from 'react'

import {useEffect} from 'react'
import {SET_HIDDEN_NAV} from '../../reducers/hidden-menu-reducer'
import {ContactScreen} from './contact-screen'
import {useIntroGetApi} from '../../hooks/intro-rest'
import {SubMenuProps} from '../../reducers/sub-menu-reducer'

const AboutContactsHiddenMenu: React.FC = () => {
  const data = useIntroGetApi('/about/intro')

  return <p>{data.message}</p>
}

const AboutContactsScreen: React.FC<SubMenuProps> = ({hiddenMenuDispatch}) => {
  useEffect(() => {
    hiddenMenuDispatch({
      type: SET_HIDDEN_NAV,
      component: AboutContactsHiddenMenu,
    })
  }, [hiddenMenuDispatch])

  return (
    <ContactScreen />
  )
}

export {AboutContactsScreen}
