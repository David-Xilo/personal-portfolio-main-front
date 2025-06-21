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
    <div className="games-intro-container">
      <div className="games-intro-wrapper">
        <div className="games-intro-section">

          <IntroHeader
            title="Games"
            colorScheme={{ primary: 'purple', secondary: 'pink', tertiary: 'cyan' }}
            variant="enhanced"
            leftIcon={<PuzzlePieceIcon />}
            rightIcon={<TrophyIcon />}
          />

          <div className="mb-10">
            <div className="games-intro-desktop-grid">
              <div className="games-intro-card-1">
                <IntroductionCard
                  color="purple"
                  title="Since a Youngster"
                  icon={<BirthdayCakeIcon />}
                >
                  Since I was a kid I've loved video games
                </IntroductionCard>
              </div>

              <div className="games-intro-card-2">
                <IntroductionCard
                  color="pink"
                  title="Gateway to Tech"
                  icon={<ComputerIcon />}
                >
                  One of the main reasons I got interested in computers
                </IntroductionCard>
              </div>

              <div className="games-intro-carousel-center">
                <div className="games-intro-carousel-wrapper">
                  <FavoriteGamesCarousel />
                </div>
              </div>

              <div className="games-intro-card-3">
                <IntroductionCard
                  color="cyan"
                  title="Creating Games"
                  icon={<WrenchScrewdriverIcon />}
                >
                  I'll keep adding new games I've made here
                </IntroductionCard>
              </div>

              <div className="games-intro-card-4">
                <IntroductionCard
                  color="violet"
                  title="Big Dreams"
                  icon={< StarIcon />}
                >
                  Maybe one day you'll recognize one of the names!
                </IntroductionCard>
              </div>
            </div>

            <div className="games-intro-mobile-section">
              <div className="games-intro-mobile-carousel">
                <FavoriteGamesCarousel />
              </div>

              <div className="games-intro-mobile-cards">
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
