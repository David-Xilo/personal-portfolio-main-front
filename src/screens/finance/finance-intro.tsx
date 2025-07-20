import React from 'react'

import {useEffect} from 'react'
import {CLEAR_HIDDEN_NAV} from '../../reducers/hidden-menu-reducer'
import {SubMenuProps} from '../../reducers/sub-menu-reducer'
import {IntroductionCard} from 'components/intro/intro-cards'
import {IntroHeader} from 'components/intro/intro-header'
import {RocketIcon} from 'components/icons/rocket-icon'
import {AcademicCapIcon} from 'components/icons/academic-cap-icon'
import {BeakerIcon} from 'components/icons/beaker-icon'
import {BirthdayCakeIcon} from 'components/icons/birthday-cake-icon'
import {ChartBarIcon} from 'components/icons/chart-bar-icon'
import {BankNoteIcon} from 'components/icons/bank-note-icon'
import './finance.css'

const BarChartPulsating: React.FC = () => {
  return (
    <div className="finance-chart-container">
      <div className="finance-chart-bar-1"></div>
      <div className="finance-chart-bar-2"></div>
      <div className="finance-chart-bar-3"></div>
      <div className="finance-chart-bar-4"></div>
      <div className="finance-chart-bar-5"></div>
    </div>
  )
}

const FinanceIntroScreen: React.FC<SubMenuProps> = ({hiddenMenuDispatch}) => {
  useEffect(() => {
    hiddenMenuDispatch({type: CLEAR_HIDDEN_NAV})
  }, [hiddenMenuDispatch])

  return (
    <div className="finance-intro-container">
      <div className="finance-intro-wrapper">
        <div className="finance-intro-section">
          <IntroHeader
            title="Finance"
            colorScheme={{
              primary: 'emerald',
              secondary: 'teal',
              tertiary: 'blue',
            }}
            variant="enhanced"
            leftIcon={<ChartBarIcon />}
            rightIcon={<BankNoteIcon />}
          />

          <BarChartPulsating />

          <div className="finance-intro-cards-grid">
            <IntroductionCard
              color="green"
              title="Early Interest"
              icon={<BirthdayCakeIcon />}
            >
              I've been interested in investing for a while
            </IntroductionCard>

            <IntroductionCard
              color="emerald"
              title="Study"
              icon={<BeakerIcon />}
            >
              Studying and staying informed about financial markets whenever possible
            </IntroductionCard>

            <IntroductionCard
              color="teal"
              title="Academic Fusion"
              icon={<AcademicCapIcon />}
            >
              Combined technology and finance in my Master's Thesis
            </IntroductionCard>

            <IntroductionCard
              color="cyan"
              title="Projects & Growth"
              icon={<RocketIcon />}
            >
              I'll keep posting finance projects and certifications
            </IntroductionCard>
          </div>
        </div>
      </div>
    </div>
  )
}

export {FinanceIntroScreen}
