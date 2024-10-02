import * as React from 'react'

import {useEffect} from 'react'
import {CLEAR_HIDDEN_NAV} from '../../reducers/hidden-menu-reducer'
import {useIntroGetApi} from '../../hooks/intro-rest'

function GamesIntroScreen({hiddenMenuDispatch}) {
  useEffect(() => {
    hiddenMenuDispatch({type: CLEAR_HIDDEN_NAV})
  }, [hiddenMenuDispatch])

  const data = useIntroGetApi('/games/intro')

  return <div>{data.message}</div>
}

export {GamesIntroScreen}
