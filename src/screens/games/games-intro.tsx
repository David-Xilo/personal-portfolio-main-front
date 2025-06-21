import * as React from 'react'

import {useEffect} from 'react'
import {CLEAR_HIDDEN_NAV} from '../../reducers/hidden-menu-reducer'
import {SubMenuProps} from '../../reducers/sub-menu-reducer'
import {FavoriteGamesCarousel} from './favorite-games'
import {IntroductionCard} from 'components/intro/intro-cards'
import {IntroHeader} from 'components/intro/intro-header'
import './games.css'
import {StarIcon} from 'components/icons/star-icon'
import {BirthdayCakeIcon} from 'components/icons/birthday-cake-icon'
import {ComputerIcon} from 'components/icons/computer-icon'
import {WrenchScrewdriverIcon} from 'components/icons/wrench-screwdriver-icon'
import {PuzzlePieceIcon} from 'components/icons/puzzle-piece-icon'
import {TrophyIcon} from 'components/icons/trophy-icon'



const GamesIntroScreen: React.FC<SubMenuProps> = ({ hiddenMenuDispatch }) => {
  useEffect(() => {
    hiddenMenuDispatch({type: CLEAR_HIDDEN_NAV})
  }, [hiddenMenuDispatch]);

  return (
    <div className="min-h-screen p-12">
      <div className="max-w-6xl mx-auto">
        <div className="relative mb-12">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-cyan-900/20 rounded-3xl"></div>

            <div className="absolute top-8 left-8 text-4xl animate-bounce" style={{animationDelay: '0s'}}>🎮</div>
            <div className="absolute top-16 right-16 text-3xl animate-bounce" style={{animationDelay: '0.5s'}}>🕹️</div>
            <div className="absolute bottom-8 left-16 text-3xl animate-bounce" style={{animationDelay: '1s'}}>👾</div>
            <div className="absolute bottom-16 right-8 text-4xl animate-bounce" style={{animationDelay: '1.5s'}}>🎯</div>

            <div className="absolute top-1/4 left-1/4 w-16 h-16 border-2 border-purple-500/30 rotate-45 animate-pulse"></div>
            <div className="absolute bottom-1/3 right-1/3 w-12 h-12 border-2 border-pink-500/30 rotate-12 animate-ping"></div>
          </div>

          <IntroHeader
            title="Games & Creation"
            colorScheme={{ primary: 'purple', secondary: 'pink', tertiary: 'cyan' }}
            variant="enhanced"
            leftIcon={<PuzzlePieceIcon />}
            rightIcon={<TrophyIcon />}
          />

          <div className="mb-10">
            <div className="hidden lg:grid lg:grid-cols-5 lg:grid-rows-2 lg:gap-6">
              <div className="lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:self-start">
                <IntroductionCard
                  color="purple"
                  title="Since a Youngster"
                  icon={<BirthdayCakeIcon />}
                >
                  Since I was a kid I've loved video games
                </IntroductionCard>
              </div>

              <div className="lg:col-start-5 lg:col-end-6 lg:row-start-1 lg:self-start">
                <IntroductionCard
                  color="pink"
                  title="Gateway to Tech"
                  icon={<ComputerIcon />}
                >
                  One of the main reasons I got interested in computers
                </IntroductionCard>
              </div>

              <div className="lg:col-start-2 lg:col-end-5 lg:row-start-1 lg:row-end-3 lg:flex lg:items-center lg:justify-center">
                <div className="w-full">
                  <FavoriteGamesCarousel />
                </div>
              </div>

              <div className="lg:col-start-1 lg:col-end-2 lg:row-start-2 lg:self-end">
                <IntroductionCard
                  color="cyan"
                  title="Creating Games"
                  icon={<WrenchScrewdriverIcon />}
                >
                  I'll keep adding new games I've made here
                </IntroductionCard>
              </div>

              <div className="lg:col-start-5 lg:col-end-6 lg:row-start-2 lg:self-end">
                <IntroductionCard
                  color="violet"
                  title="Big Dreams"
                  icon={< StarIcon />}
                >
                  Maybe one day you'll recognize one of the names!
                </IntroductionCard>
              </div>
            </div>

            <div className="lg:hidden">
              <div className="mb-8">
                <FavoriteGamesCarousel />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <IntroductionCard
                  color="purple"
                  title="Since Childhood"
                  icon={<BirthdayCakeIcon />}
                >
                  Since I was a kid I've loved video games
                </IntroductionCard>

                <IntroductionCard
                  color="pink"
                  title="Gateway to Tech"
                  icon={<ComputerIcon />}
                >
                  One of the main reasons I got interested in computers
                </IntroductionCard>

                <IntroductionCard
                  color="cyan"
                  title="Creating Games"
                  icon={<WrenchScrewdriverIcon />}
                >
                  I'll keep adding new games I've made here
                </IntroductionCard>

                <IntroductionCard
                  color="violet"
                  title="Big Dreams"
                  icon={< StarIcon />}
                >
                  Maybe one day you'll recognize one of the names!
                </IntroductionCard>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export {GamesIntroScreen}
