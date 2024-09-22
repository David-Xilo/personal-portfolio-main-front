import * as React from 'react'

import {useGetApi} from '../../hooks/useApi'
import {useEffect} from 'react'
import {CLEAR_HIDDEN_NAV} from '../../reducers/hiddenMenuReducer'

function GamesIntroScreen({hiddenMenuDispatch}) {
  useEffect(() => {
    hiddenMenuDispatch({type: CLEAR_HIDDEN_NAV})
  }, [hiddenMenuDispatch])

  const data = useGetApi('games/intro')

  return <div>{data.message}</div>
}

export {GamesIntroScreen}
