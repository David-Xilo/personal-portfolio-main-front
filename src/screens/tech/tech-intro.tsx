import * as React from 'react'

import {useEffect} from 'react'
import {CLEAR_HIDDEN_NAV} from '../../reducers/hidden-menu-reducer'
import {useIntroGetApi} from '../../hooks/intro-rest'
import {SubMenuProps} from '../../reducers/sub-menu-reducer'
import {IntroductionCard} from 'components/intro/intro-cards'
import {IntroHeader} from 'components/intro/intro-header'

const TechIntroScreen: React.FC<SubMenuProps> = ({ hiddenMenuDispatch }) => {
  useEffect(() => {
    hiddenMenuDispatch({type: CLEAR_HIDDEN_NAV})
  }, [hiddenMenuDispatch]);

  return (
    <div className="flex items-center justify-center p-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="relative">
          {/* Background Elements */}
          <div className="absolute inset-0 -z-10">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-cyan-900/20 rounded-3xl"></div>

            {/* Geometric Shapes */}
            <div className="absolute top-10 left-10 w-20 h-20 border border-cyan-500/30 rounded-lg rotate-12 animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-16 h-16 border border-blue-500/30 rounded-full animate-bounce"></div>
            <div className="absolute top-1/3 right-1/4 w-8 h-8 bg-purple-500/20 rounded-full animate-ping"></div>
          </div>

          {/* Main Content */}
          <div className="relative bg-slate-900/80 backdrop-blur-sm rounded-3xl p-12 border border-slate-700/50 shadow-2xl">
            {/* Header Section */}
            {/*<div className="text-center mb-8">*/}
            {/*  <div className="inline-flex items-center gap-3 mb-4">*/}
            {/*    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">*/}
            {/*      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">*/}
            {/*        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />*/}
            {/*      </svg>*/}
            {/*    </div>*/}
            {/*    <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">*/}
            {/*      Technology & Innovation*/}
            {/*    </h1>*/}
            {/*  </div>*/}

            {/*  <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto rounded-full"></div>*/}
            {/*</div>*/}

            <IntroHeader
              title="Technology & Innovation"
              colorScheme={{ primary: 'cyan', secondary: 'blue' }}
              variant="simple"
              leftIcon={
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              }
            />


            {/* Content Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <IntroductionCard
                color="cyan"
                title="Always Evolving"
                size="small"
                icon={
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                }
              >
                Technology is always improving — and so am I.
              </IntroductionCard>

              {/* Card 2: Bread and Butter */}
              <IntroductionCard
                color="blue"
                title="My Passion"
                size="small"
                icon={
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                }
              >
                Technology is my bread and butter — it's part of my personality.
              </IntroductionCard>

              {/* Card 3: Projects */}
              <IntroductionCard
                color="violet"
                title="Personal Projects"
                size="small"
                icon={
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                }
              >
                Explore my projects
              </IntroductionCard>
            </div>

            {/* Main Message */}
            <div className="text-center">
              <p className="text-xl leading-relaxed text-slate-200 mb-6">
                I've grown around it, worked with it, and played with it. I try to learn and explore it as much as I can.
              </p>

              <div className="inline-flex items-center gap-2 text-cyan-400 font-medium">
                <span>Have fun exploring them!</span>
                <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>

            {/* Tech Stack Indicators */}
            <div className="flex justify-center mt-8 gap-4">
              <div className="w-3 h-3 bg-cyan-500 rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
              <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export {TechIntroScreen}
