import * as React from 'react'

import {useEffect} from 'react'
import {SET_HIDDEN_NAV} from '../../reducers/hidden-menu-reducer'
import {useIntroGetApi} from '../../hooks/intro-rest'
import {SubMenuProps} from '../../reducers/sub-menu-reducer'

function FinanceGraphsHiddenMenu() {
  const data = useIntroGetApi('/tech/intro')

  return <p>{data.message}</p>
}

const FinanceGraphsScreen: React.FC<SubMenuProps> = ({hiddenMenuDispatch}) => {
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
