import * as React from 'react'

import {useEffect} from 'react'
import {SET_HIDDEN_NAV} from '../../reducers/hidden-menu-reducer.js'
import {useGetApi} from '../../hooks/use-api.js'

function AboutContactsHiddenMenu() {
  const data = useGetApi('about/intro')

  return <p>{data.message}</p>
}

function AboutContactsScreen({hiddenMenuDispatch}) {
  useEffect(() => {
    hiddenMenuDispatch({
      type: SET_HIDDEN_NAV,
      component: AboutContactsHiddenMenu,
    })
  }, [hiddenMenuDispatch])

  const text = useGetApi('about/contact-text')
  const data = useGetApi('about/contact')

  return (
    <>
      <div>{text.message}</div>
      <div>{data.message}</div>
    </>
  )
}

export {AboutContactsScreen}
