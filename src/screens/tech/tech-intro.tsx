import * as React from 'react'

import {useEffect} from 'react'
import {CLEAR_HIDDEN_NAV} from '../../reducers/hidden-menu-reducer'
import {useIntroGetApi} from '../../hooks/intro-rest'
import {SubMenuProps} from '../../reducers/sub-menu-reducer'
import {IntroductionCard} from 'components/intro/intro-cards'
import {IntroHeader} from 'components/intro/intro-header'
import {ThunderIcon} from 'components/icons/thunder-icon'
import {FoldersIcon} from 'components/icons/folders-icon'
import {HeartIcon} from 'components/icons/heart-icon'
import {CodeIcon} from 'components/icons/code-icon'

const TechIntroScreen: React.FC<SubMenuProps> = ({ hiddenMenuDispatch }) => {
  useEffect(() => {
    hiddenMenuDispatch({type: CLEAR_HIDDEN_NAV})
  }, [hiddenMenuDispatch]);

  return (
    <div className="flex items-center justify-center p-12">
      <div className="max-w-4xl mx-auto">
        <div className="relative">

            <IntroHeader
              title="Technology"
              colorScheme={{ primary: 'cyan', secondary: 'blue' }}
              leftIcon={
                <CodeIcon />
              }
            />

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <IntroductionCard
                color="cyan"
                title="Always Evolving"
                icon={
                  <ThunderIcon />
                }
              >
                Technology is always improving — and so am I.
              </IntroductionCard>

              <IntroductionCard
                color="blue"
                title="My Passion"
                icon={
                  <HeartIcon />
                }
              >
                Technology is my bread and butter — it's part of my personality.
              </IntroductionCard>

              <IntroductionCard
                color="violet"
                title="Personal Projects"
                icon={
                  <FoldersIcon />
                }
              >
                Explore my projects
              </IntroductionCard>
            </div>

            <div className="text-center">
              <p className="text-xl leading-relaxed text-slate-200 mb-6">
                I've grown around it, worked with it, and played with it. I try to learn and explore it as much as I can.
              </p>
            </div>

            <div className="flex justify-center mt-8 gap-4">
              <div className="w-3 h-3 bg-cyan-500 rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
              <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
            </div>
          </div>
      </div>
    </div>
  );
};

export {TechIntroScreen}
