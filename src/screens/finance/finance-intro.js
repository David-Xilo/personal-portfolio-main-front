import * as React from 'react'

import {useEffect} from 'react'
import {CLEAR_HIDDEN_NAV} from '../../reducers/hidden-menu-reducer.js'
import {useGetApi} from '../../hooks/use-api.js'

function FinanceIntroScreen({hiddenMenuDispatch}) {
  useEffect(() => {
    hiddenMenuDispatch({type: CLEAR_HIDDEN_NAV})
  }, [hiddenMenuDispatch])

  // const data = useGetApi('tech/intro')
  const data = useGetApi('tech/intro')

  return <div>{data.message}</div>
}

export {FinanceIntroScreen}
