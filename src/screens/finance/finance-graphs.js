import * as React from 'react'

import {useEffect} from 'react'
import {SET_HIDDEN_NAV} from '../../reducers/hidden-menu-reducer.js'
import {useIntroGetApi} from '../../hooks/intro-rest.tsx'

function FinanceGraphsHiddenMenu() {
  const data = useIntroGetApi('/tech/intro')

  return <p>{data.message}</p>
}

function FinanceGraphsScreen({hiddenMenuDispatch}) {
  useEffect(() => {
    hiddenMenuDispatch({
      type: SET_HIDDEN_NAV,
      component: FinanceGraphsHiddenMenu,
    })
  }, [hiddenMenuDispatch])

  const data = useIntroGetApi('/tech/intro')

  return <p>{data.message}</p>
}

export {FinanceGraphsScreen}
