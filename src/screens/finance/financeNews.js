import * as React from 'react'

import {useGetApi} from '../../hooks/useApi'
import {useEffect} from 'react'
import {SET_HIDDEN_NAV} from '../../reducers/hiddenMenuReducer'

function FinanceNewsHiddenMenu() {

  // const data = useGetApi('tech/news')
  const data = useGetApi('finance/intro');

  return (
    <p>{data.message}</p>
  )
}


function FinanceNewsScreen({ hiddenMenuDispatch }) {
  useEffect(() => {
    hiddenMenuDispatch({ type: SET_HIDDEN_NAV, component: FinanceNewsHiddenMenu });
  }, [hiddenMenuDispatch]);

  // const data = useGetApi('tech/news')
  const data = useGetApi('finance/intro');

  return (
    <p>{data.message}</p>
  )
}

export { FinanceNewsScreen }
