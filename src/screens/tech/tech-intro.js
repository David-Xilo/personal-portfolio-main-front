import * as React from 'react'

import {useEffect} from 'react'
import {CLEAR_HIDDEN_NAV} from '../../reducers/hidden-menu-reducer.js'
import {useIntroGetApi} from '../../hooks/intro-rest.tsx'

function TechIntroScreen({hiddenMenuDispatch}) {
  useEffect(() => {
    hiddenMenuDispatch({type: CLEAR_HIDDEN_NAV})
  }, [hiddenMenuDispatch])

  const data = useIntroGetApi('/tech/intro')

  return <div>{data.message}</div>
}

export {TechIntroScreen}
