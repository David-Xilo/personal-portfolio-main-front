import React from 'react'

import {useEffect} from 'react'
import {CLEAR_HIDDEN_NAV} from '../../reducers/hidden-menu-reducer'
import {SubMenuProps} from '../../reducers/sub-menu-reducer'
import {IntroductionCard} from 'components/intro/intro-cards'
import {IntroHeader} from 'components/intro/intro-header'
import {ThunderIcon} from 'components/icons/thunder-icon'
import {FoldersIcon} from 'components/icons/folders-icon'
import {HeartIcon} from 'components/icons/heart-icon'
import {CodeIcon} from 'components/icons/code-icon'
import './tech.css'

const TechIntroScreen: React.FC<SubMenuProps> = ({hiddenMenuDispatch}) => {
  useEffect(() => {
    hiddenMenuDispatch({type: CLEAR_HIDDEN_NAV})
  }, [hiddenMenuDispatch])

  return (
    <div className="tech-intro-container">
      <div className="tech-intro-wrapper">
        <div className="tech-intro-section">
          <IntroHeader
            title="Technology"
            colorScheme={{primary: 'cyan', secondary: 'blue'}}
            leftIcon={<CodeIcon />}
          />

          <div className="tech-intro-cards-grid">
            <IntroductionCard
              color="cyan"
              title="Always Evolving"
              icon={<ThunderIcon />}
            >
              Technology is always improving — and so am I.
            </IntroductionCard>

            <IntroductionCard
              color="blue"
              title="My Passion"
              icon={<HeartIcon />}
            >
              Technology is my bread and butter — it's part of my personality.
            </IntroductionCard>

            <IntroductionCard
              color="violet"
              title="Personal Projects"
              icon={<FoldersIcon />}
            >
              Explore my projects
            </IntroductionCard>
          </div>

          <div className="tech-indicators-container">
            <div className="tech-indicator-1"></div>
            <div className="tech-indicator-2"></div>
            <div className="tech-indicator-3"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export {TechIntroScreen}
