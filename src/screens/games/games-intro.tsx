import * as React from 'react'

import {useEffect} from 'react'
import {CLEAR_HIDDEN_NAV} from '../../reducers/hidden-menu-reducer'
import {useIntroGetApi} from '../../hooks/intro-rest'
import {SubMenuProps} from '../../reducers/sub-menu-reducer'
import {FavoriteGamesCarousel} from './favorite-games'
import './games.css'


const GamesIntroScreen = ({ hiddenMenuDispatch = () => {} }) => {
  useEffect(() => {
    // hiddenMenuDispatch({type: 'CLEAR_HIDDEN_NAV'})
  }, [hiddenMenuDispatch]);

  return (
    <div className="min-h-screen p-8">
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
          <div className="relative bg-slate-900/90 backdrop-blur-sm rounded-3xl p-12 border border-slate-700/50 shadow-2xl">

            {/* Header Section */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center transform rotate-3">
                  <span className="text-2xl">🎮</span>
                </div>
                <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                  Games & Creation
                </h1>
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-2xl flex items-center justify-center transform -rotate-3">
                  <span className="text-2xl">👾</span>
                </div>
              </div>

              <div className="w-32 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 mx-auto rounded-full"></div>
            </div>

            <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-600/30 mb-10">
              {/* Integrated Carousel */}
              <div className="mb-8">
                <FavoriteGamesCarousel />
              </div>
            </div>

            {/* Story Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

              {/* Childhood Gaming */}
              <div className="bg-gradient-to-br from-purple-800/50 to-purple-900/50 rounded-xl p-6 border border-purple-500/30 hover:border-purple-400/60 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20">
                <div className="w-12 h-12 bg-purple-500/30 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-2xl">🧒</span>
                </div>
                <h3 className="text-lg font-bold text-purple-300 mb-3">Since Childhood</h3>
                <p className="text-slate-300 text-sm leading-relaxed">Since I was a kid I've loved video games</p>
              </div>

              {/* Gateway to Tech */}
              <div className="bg-gradient-to-br from-pink-800/50 to-pink-900/50 rounded-xl p-6 border border-pink-500/30 hover:border-pink-400/60 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl hover:shadow-pink-500/20">
                <div className="w-12 h-12 bg-pink-500/30 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-2xl">💻</span>
                </div>
                <h3 className="text-lg font-bold text-pink-300 mb-3">Gateway to Tech</h3>
                <p className="text-slate-300 text-sm leading-relaxed">One of the main reasons I got interested in computers</p>
              </div>

              {/* Game Development */}
              <div className="bg-gradient-to-br from-cyan-800/50 to-cyan-900/50 rounded-xl p-6 border border-cyan-500/30 hover:border-cyan-400/60 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/20">
                <div className="w-12 h-12 bg-cyan-500/30 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-2xl">🛠️</span>
                </div>
                <h3 className="text-lg font-bold text-cyan-300 mb-3">Creating Games</h3>
                <p className="text-slate-300 text-sm leading-relaxed">I'll keep adding new games I've made here</p>
              </div>

              {/* Future Dreams */}
              <div className="bg-gradient-to-br from-violet-800/50 to-violet-900/50 rounded-xl p-6 border border-violet-500/30 hover:border-violet-400/60 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl hover:shadow-violet-500/20">
                <div className="w-12 h-12 bg-violet-500/30 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-2xl">⭐</span>
                </div>
                <h3 className="text-lg font-bold text-violet-300 mb-3">Big Dreams</h3>
                <p className="text-slate-300 text-sm leading-relaxed">Maybe one day you'll recognize one of the names!</p>
              </div>
            </div>

            {/* Retro Gaming Dots */}
            <div className="flex justify-center mt-8 gap-3">
              <div className="w-4 h-4 bg-purple-500 rounded-full animate-pulse"></div>
              <div className="w-4 h-4 bg-pink-500 rounded-full animate-pulse" style={{animationDelay: '0.3s'}}></div>
              <div className="w-4 h-4 bg-cyan-500 rounded-full animate-pulse" style={{animationDelay: '0.6s'}}></div>
              <div className="w-4 h-4 bg-violet-500 rounded-full animate-pulse" style={{animationDelay: '0.9s'}}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export {GamesIntroScreen}
