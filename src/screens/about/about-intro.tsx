import React from 'react'

import {useEffect} from 'react'
import {CLEAR_HIDDEN_NAV} from '../../reducers/hidden-menu-reducer'
import {SubMenuProps} from '../../reducers/sub-menu-reducer'
import {AboutReviewCarousel} from './about-reviews'
import './about.css'

const AboutIntroScreen: React.FC<SubMenuProps> = ({hiddenMenuDispatch}) => {
  useEffect(() => {
    hiddenMenuDispatch({type: CLEAR_HIDDEN_NAV})
  }, [hiddenMenuDispatch])

  return (
    <div className="about-intro-container">
      <div className="about-intro-wrapper">
        <div className="about-intro-section">
          <div className="about-intro-background">
            <div className="about-intro-gradient"></div>

            <div className="about-intro-star-1">✨</div>
            <div className="about-intro-star-2">🌟</div>
            <div className="about-intro-star-3">💫</div>
            <div className="about-intro-star-4">⭐</div>

            <div className="about-intro-circle"></div>
            <div className="about-intro-square"></div>
          </div>

          <div className="about-intro-header">
            <div className="about-intro-title-container">
              <h1 className="about-intro-title">About Me</h1>
            </div>
            <div className="about-intro-underline"></div>
          </div>

          <div className="about-intro-text-container">
            <div className="about-intro-text-content">
              <div className="about-intro-text-center">
                <p className="about-intro-greeting">
                  Hey! I'm David—great to see you here!
                </p>
                <p className="about-intro-description">
                  I built a simple portfolio page a while back but kept
                  postponing it—well, it's finally live! I'm a{' '}
                  <span className="about-intro-role-highlight">
                    Senior Software Engineer
                  </span>{' '}
                  specializing in backend.
                </p>
              </div>

              <p className="about-intro-interests">
                I have a <span className="about-intro-lot-highlight">LOT</span>{' '}
                of interests and tend to explore them fully (maybe dispersing a
                bit too much lol), so expect to see some interesting projects
                here!
              </p>
            </div>
          </div>

          <div className="about-intro-carousel-container">
            <AboutReviewCarousel />
          </div>
        </div>
      </div>
    </div>
  )
}

export {AboutIntroScreen}
