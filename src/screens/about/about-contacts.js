import * as React from 'react'

import {useEffect} from 'react'
import {SET_HIDDEN_NAV} from '../../reducers/hidden-menu-reducer.js'
import {ContactScreen} from 'components/contact.tsx'
import {useIntroGetApi} from '../../hooks/intro-rest.tsx'

function AboutContactsHiddenMenu() {
  const data = useIntroGetApi('/about/intro')

  return <p>{data.message}</p>
}

function AboutContactsScreen({hiddenMenuDispatch}) {
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
