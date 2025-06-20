import * as React from 'react'

import {useEffect} from 'react'
import {CLEAR_HIDDEN_NAV} from '../../reducers/hidden-menu-reducer'
import {useIntroGetApi} from '../../hooks/intro-rest'
import {SubMenuProps} from '../../reducers/sub-menu-reducer'

const FinanceIntroScreen = ({ hiddenMenuDispatch = () => {} }) => {
  useEffect(() => {
    // hiddenMenuDispatch({type: 'CLEAR_HIDDEN_NAV'})
  }, [hiddenMenuDispatch]);

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">

        {/* Enhanced Finance Hero Section */}
        <div className="relative">
          {/* Background Financial Elements */}
          <div className="absolute inset-0 -z-10">
            {/* Professional gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 via-teal-900/20 to-blue-900/20 rounded-3xl"></div>

            {/* Floating Financial Icons */}
            <div className="absolute top-10 left-10 text-3xl animate-pulse text-emerald-400/60">📈</div>
            <div className="absolute top-20 right-16 text-2xl animate-pulse text-blue-400/60" style={{animationDelay: '0.5s'}}>💰</div>
            <div className="absolute bottom-16 left-20 text-3xl animate-pulse text-teal-400/60" style={{animationDelay: '1s'}}>📊</div>
            <div className="absolute bottom-10 right-10 text-2xl animate-pulse text-emerald-400/60" style={{animationDelay: '1.5s'}}>💡</div>

            {/* Abstract chart lines */}
            <div className="absolute top-1/4 right-1/4 w-20 h-16 border-2 border-emerald-500/20 rounded-lg transform rotate-12"></div>
            <div className="absolute bottom-1/3 left-1/3 w-16 h-12 border-2 border-teal-500/20 rounded transform -rotate-6"></div>
          </div>

          {/* Main Content Container */}
          <div className="relative bg-slate-900/90 backdrop-blur-sm rounded-3xl p-12 border border-slate-700/50 shadow-2xl">

            {/* Header Section */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center transform rotate-3">
                  <span className="text-2xl">📈</span>
                </div>
                <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-400 bg-clip-text text-transparent">
                  Finance & Economics
                </h1>
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-2xl flex items-center justify-center transform -rotate-3">
                  <span className="text-2xl">💰</span>
                </div>
              </div>

              <div className="w-32 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500 mx-auto rounded-full"></div>
            </div>

            {/* Main Passion Statement */}
            <div className="text-center bg-slate-800/50 rounded-2xl p-8 border border-slate-600/30 mb-10">
              <h2 className="text-2xl font-bold text-emerald-300 mb-4">
                One of My Core Passions
              </h2>
              <p className="text-xl leading-relaxed text-slate-200 mb-6">
                Finance is one of my passions. I read about it, study it, and pay attention to it in my daily life.
              </p>

              {/* Growth visualization */}
              <div className="flex justify-center items-end gap-2 mb-6">
                <div className="w-4 h-8 bg-emerald-500 rounded-t"></div>
                <div className="w-4 h-12 bg-emerald-400 rounded-t"></div>
                <div className="w-4 h-16 bg-emerald-300 rounded-t"></div>
                <div className="w-4 h-20 bg-teal-400 rounded-t"></div>
                <div className="w-4 h-24 bg-teal-300 rounded-t animate-pulse"></div>
              </div>

              <p className="text-lg text-slate-300">
                Continuous learning and growth in financial markets
              </p>
            </div>

            {/* Journey Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

              {/* Early Interest */}
              <div className="bg-gradient-to-br from-emerald-800/50 to-emerald-900/50 rounded-xl p-6 border border-emerald-500/30 hover:border-emerald-400/60 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/20">
                <div className="w-12 h-12 bg-emerald-500/30 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-2xl">👶</span>
                </div>
                <h3 className="text-lg font-bold text-emerald-300 mb-3">Early Beginnings</h3>
                <p className="text-slate-300 text-sm leading-relaxed">Since I was young, I've followed the stock market and economic news</p>
              </div>

              {/* Daily Practice */}
              <div className="bg-gradient-to-br from-teal-800/50 to-teal-900/50 rounded-xl p-6 border border-teal-500/30 hover:border-teal-400/60 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl hover:shadow-teal-500/20">
                <div className="w-12 h-12 bg-teal-500/30 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-2xl">📚</span>
                </div>
                <h3 className="text-lg font-bold text-teal-300 mb-3">Daily Study</h3>
                <p className="text-slate-300 text-sm leading-relaxed">Reading, studying, and staying informed about financial markets daily</p>
              </div>

              {/* Academic Fusion */}
              <div className="bg-gradient-to-br from-blue-800/50 to-blue-900/50 rounded-xl p-6 border border-blue-500/30 hover:border-blue-400/60 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20">
                <div className="w-12 h-12 bg-blue-500/30 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-2xl">🎓</span>
                </div>
                <h3 className="text-lg font-bold text-blue-300 mb-3">Academic Fusion</h3>
                <p className="text-slate-300 text-sm leading-relaxed">Combined technology and finance in my master's thesis</p>
              </div>

              {/* Future Projects */}
              <div className="bg-gradient-to-br from-cyan-800/50 to-cyan-900/50 rounded-xl p-6 border border-cyan-500/30 hover:border-cyan-400/60 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/20">
                <div className="w-12 h-12 bg-cyan-500/30 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-2xl">🚀</span>
                </div>
                <h3 className="text-lg font-bold text-cyan-300 mb-3">Projects & Growth</h3>
                <p className="text-slate-300 text-sm leading-relaxed">Finance projects, certifications, and continuous learning</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export {FinanceIntroScreen}
