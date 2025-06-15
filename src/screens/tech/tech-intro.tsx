import * as React from 'react'

import {useEffect} from 'react'
import {CLEAR_HIDDEN_NAV} from '../../reducers/hidden-menu-reducer'
import {useIntroGetApi} from '../../hooks/intro-rest'
import {SubMenuProps} from '../../reducers/sub-menu-reducer'

const TechIntroScreen: React.FC<SubMenuProps> = ({hiddenMenuDispatch}) => {
  useEffect(() => {
    hiddenMenuDispatch({type: CLEAR_HIDDEN_NAV})
  }, [hiddenMenuDispatch])

  const data = useIntroGetApi('/tech/intro')

  return (
    <div>
      {data.message && (
        <div className="mb-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-lg leading-relaxed" style={{color: 'var(--color-text-primary)'}}>
              {data.message}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export {TechIntroScreen}
