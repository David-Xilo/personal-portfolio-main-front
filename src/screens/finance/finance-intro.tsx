import * as React from 'react'

import {useEffect} from 'react'
import {CLEAR_HIDDEN_NAV} from '../../reducers/hidden-menu-reducer'
import {useIntroGetApi} from '../../hooks/intro-rest'
import {SubMenuProps} from '../../reducers/sub-menu-reducer'
import { IntroductionCard } from 'components/intro/intro-cards'
import {IntroHeader} from 'components/intro/intro-header'

const FinanceIntroScreen: React.FC<SubMenuProps> = ({ hiddenMenuDispatch }) => {
  useEffect(() => {
    hiddenMenuDispatch({type: CLEAR_HIDDEN_NAV})
  }, [hiddenMenuDispatch]);

  return (
    <div className="p-12">
      <div className="max-w-6xl mx-auto">

        <div className="relative">

          <div className="absolute inset-0 -z-10">

            <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 via-teal-900/20 to-blue-900/20 rounded-3xl"></div>

            <div className="absolute top-10 left-10 text-3xl animate-pulse text-emerald-400/60">📈</div>
            <div className="absolute top-20 right-16 text-2xl animate-pulse text-blue-400/60" style={{animationDelay: '0.5s'}}>💰</div>
            <div className="absolute bottom-16 left-20 text-3xl animate-pulse text-teal-400/60" style={{animationDelay: '1s'}}>📊</div>
            <div className="absolute bottom-10 right-10 text-2xl animate-pulse text-emerald-400/60" style={{animationDelay: '1.5s'}}>💡</div>

            <div className="absolute top-1/4 right-1/4 w-20 h-16 border-2 border-emerald-500/20 rounded-lg transform rotate-12"></div>
            <div className="absolute bottom-1/3 left-1/3 w-16 h-12 border-2 border-teal-500/20 rounded transform -rotate-6"></div>
          </div>

          {/*<div className="relative bg-slate-900/90 backdrop-blur-sm rounded-3xl p-12 border border-slate-700/50 shadow-2xl">*/}

            <IntroHeader
              title="Finance & Economics"
              colorScheme={{ primary: 'emerald', secondary: 'teal', tertiary: 'blue' }}
              variant="enhanced"
              leftIcon="📈"
              rightIcon="💰"
            />

            <div className="flex justify-center items-end gap-2 mb-4">
              <div className="w-4 h-8 bg-emerald-500 rounded-t"></div>
              <div className="w-4 h-12 bg-emerald-400 rounded-t"></div>
              <div className="w-4 h-16 bg-emerald-300 rounded-t"></div>
              <div className="w-4 h-20 bg-teal-400 rounded-t"></div>
              <div className="w-4 h-24 bg-teal-300 rounded-t animate-pulse"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

              <IntroductionCard
                color="green"
                title="Early Beginnings"
                emoji="👶"
                variant="gradient"
              >
                Since I was young, I've followed the stock market and economic news
              </IntroductionCard>

              {/* Daily Practice */}
              <IntroductionCard
                color="emerald"
                title="Study"
                emoji="📚"
                variant="gradient"
              >
                Reading, studying, and staying informed about financial markets whenever possible
              </IntroductionCard>

              <IntroductionCard
                color="teal"
                title="Academic Fusion"
                emoji="🎓"
              >
                Combined technology and finance in my master's thesis
              </IntroductionCard>

              <IntroductionCard
                color="cyan"
                title="Projects & Growth"
                emoji="🚀"
              >
                Finance projects, certifications, and continuous learning
              </IntroductionCard>
            </div>
          {/*</div>*/}
        </div>
      </div>
    </div>
  );
};

export {FinanceIntroScreen}
