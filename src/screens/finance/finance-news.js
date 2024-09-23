import * as React from 'react'

import {useGetApi} from '../../hooks/use-api.js'
import {useEffect} from 'react'
import {SET_HIDDEN_NAV} from '../../reducers/hidden-menu-reducer.js'
import {NewsScreen} from 'components/news.tsx'

function FinanceNewsHiddenMenu() {
  // const data = useGetApi('tech/news')
  const data = useGetApi('tech/intro')

  return <p>{data.message}</p>
}

function FinanceNewsScreen({hiddenMenuDispatch}) {
  useEffect(() => {
    hiddenMenuDispatch({type: SET_HIDDEN_NAV, component: FinanceNewsHiddenMenu})
  }, [hiddenMenuDispatch])

  return <NewsScreen path={'finance'} />
}

export {FinanceNewsScreen}
