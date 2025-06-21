import * as React from 'react'

import {useEffect} from 'react'
import {CLEAR_HIDDEN_NAV} from '../../reducers/hidden-menu-reducer'
import {SubMenuProps} from '../../reducers/sub-menu-reducer'
import {FavoriteGamesCarousel} from './favorite-games'
import './games.css'
import {IntroductionCard} from 'components/intro/intro-cards'
import {IntroHeader} from 'components/intro/intro-header'


const GamesIntroScreen: React.FC<SubMenuProps> = ({ hiddenMenuDispatch }) => {
  useEffect(() => {
    hiddenMenuDispatch({type: CLEAR_HIDDEN_NAV})
  }, [hiddenMenuDispatch]);

  return (
    <div className="min-h-screen p-12">
      <div className="max-w-6xl mx-auto">
        {/* Enhanced Hero Section */}
        <div className="relative mb-12">
          {/* Background Gaming Elements */}
          <div className="absolute inset-0 -z-10">
            {/* Retro Grid Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-cyan-900/20 rounded-3xl"></div>

            {/* Floating Gaming Icons */}
            <div className="absolute top-8 left-8 text-4xl animate-bounce" style={{animationDelay: '0s'}}>🎮</div>
            <div className="absolute top-16 right-16 text-3xl animate-bounce" style={{animationDelay: '0.5s'}}>🕹️</div>
            <div className="absolute bottom-8 left-16 text-3xl animate-bounce" style={{animationDelay: '1s'}}>👾</div>
            <div className="absolute bottom-16 right-8 text-4xl animate-bounce" style={{animationDelay: '1.5s'}}>🎯</div>

            {/* Retro Squares */}
            <div className="absolute top-1/4 left-1/4 w-16 h-16 border-2 border-purple-500/30 rotate-45 animate-pulse"></div>
            <div className="absolute bottom-1/3 right-1/3 w-12 h-12 border-2 border-pink-500/30 rotate-12 animate-ping"></div>
          </div>

          {/* Main Content Container */}
          {/*<div className="relative bg-slate-900/90 backdrop-blur-sm rounded-3xl p-12 border border-slate-700/50 shadow-2xl">*/}

            {/* Header Section */}
            <IntroHeader
              title="Games & Creation"
              colorScheme={{ primary: 'purple', secondary: 'pink', tertiary: 'cyan' }}
              variant="enhanced"
              leftIcon="🎮"
              rightIcon="👾"
            />

            <div className="mb-8">
              <FavoriteGamesCarousel />
            </div>

            {/* Story Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

              {/* Childhood Gaming */}
              <IntroductionCard
                color="purple"
                title="Since Childhood"
                emoji="🧒"
              >
                Since I was a kid I've loved video games
              </IntroductionCard>

              {/* Gateway to Tech */}
              <IntroductionCard
                color="pink"
                title="Gateway to Tech"
                emoji="💻"
              >
                One of the main reasons I got interested in computers
              </IntroductionCard>

              {/* Game Development */}
              <IntroductionCard
                color="cyan"
                title="Creating Games"
                emoji="🛠️"
              >
                I'll keep adding new games I've made here
              </IntroductionCard>

              {/* Future Dreams */}
              <IntroductionCard
                color="violet"
                title="Big Dreams"
                emoji="⭐"
              >
                Maybe one day you'll recognize one of the names!
              </IntroductionCard>
            </div>

            {/* Retro Gaming Dots */}
            <div className="flex justify-center mt-8 gap-3">
              <div className="w-4 h-4 bg-purple-500 rounded-full animate-pulse"></div>
              <div className="w-4 h-4 bg-pink-500 rounded-full animate-pulse" style={{animationDelay: '0.3s'}}></div>
              <div className="w-4 h-4 bg-cyan-500 rounded-full animate-pulse" style={{animationDelay: '0.6s'}}></div>
              <div className="w-4 h-4 bg-violet-500 rounded-full animate-pulse" style={{animationDelay: '0.9s'}}></div>
            </div>
          {/*</div>*/}
        </div>
      </div>
    </div>
  );
};

export {GamesIntroScreen}
