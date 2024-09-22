import * as React from 'react'

import {useGetApi} from '../../hooks/use-api.js'
import {useEffect} from 'react'
import {SET_HIDDEN_NAV} from '../../reducers/hidden-menu-reducer.js'

function FinanceGraphsHiddenMenu() {
  const data = useGetApi('tech/intro')

  return <p>{data.message}</p>
}

function FinanceGraphsScreen({hiddenMenuDispatch}) {
  useEffect(() => {
    hiddenMenuDispatch({
      type: SET_HIDDEN_NAV,
      component: FinanceGraphsHiddenMenu,
    })
  }, [hiddenMenuDispatch])

  const data = useGetApi('tech/intro')

  return <p>{data.message}</p>
}

export {FinanceGraphsScreen}
