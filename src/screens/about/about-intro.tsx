import * as React from 'react'

import {useEffect} from 'react'
import {CLEAR_HIDDEN_NAV} from '../../reducers/hidden-menu-reducer'
import {useIntroGetApi} from '../../hooks/intro-rest'
import {SubMenuProps} from '../../reducers/sub-menu-reducer'
import {AboutReviewCarousel} from './about-reviews'

const AboutIntroScreen: React.FC<SubMenuProps> = ({hiddenMenuDispatch}) => {
  useEffect(() => {
    hiddenMenuDispatch({type: CLEAR_HIDDEN_NAV})
  }, [hiddenMenuDispatch])

  const data = useIntroGetApi('/about/intro')

  // TODO
  // make component that has round robin of elements with a star rating and a random
  // sentence, the same style it would be to appear in a movie review:
  // "Fantastic"
  // 4.5/5
  // The component should show the stars filled according to the punctuation
  // The backend call will return a description for my intro and a list of random
  // sentences with corresponding rating
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
      <AboutReviewCarousel />
    </div>
  )
}

export {AboutIntroScreen}
