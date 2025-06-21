import * as React from 'react'

import {useEffect} from 'react'
import {CLEAR_HIDDEN_NAV} from '../../reducers/hidden-menu-reducer'
import {useIntroGetApi} from '../../hooks/intro-rest'
import {SubMenuProps} from '../../reducers/sub-menu-reducer'
import {AboutReviewCarousel} from './about-reviews'

const AboutIntroScreen: React.FC<SubMenuProps> = ({hiddenMenuDispatch}) => {
  useEffect(() => {
    hiddenMenuDispatch({type: CLEAR_HIDDEN_NAV})
  }, [hiddenMenuDispatch])

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-5xl mx-auto">
        <div className="relative">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-900/15 via-orange-900/15 to-red-900/15 rounded-3xl"></div>

            <div className="absolute top-12 left-12 text-3xl animate-pulse text-amber-400/40">✨</div>
            <div className="absolute top-20 right-20 text-2xl animate-pulse text-orange-400/40" style={{animationDelay: '1s'}}>🌟</div>
            <div className="absolute bottom-16 left-20 text-2xl animate-pulse text-red-400/40" style={{animationDelay: '2s'}}>💫</div>
            <div className="absolute bottom-12 right-16 text-3xl animate-pulse text-amber-400/40" style={{animationDelay: '0.5s'}}>⭐</div>

            <div className="absolute top-1/4 right-1/4 w-16 h-16 border border-amber-500/20 rounded-full animate-pulse"></div>
            <div className="absolute bottom-1/3 left-1/3 w-12 h-12 border border-orange-500/20 rounded-lg rotate-45 animate-ping"></div>
          </div>

          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-4 mb-4">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                About Me
              </h1>
            </div>
            <div className="w-32 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 mx-auto rounded-full"></div>
          </div>

          <div className="mb-6">
            <div className="max-w-4xl mx-auto mb-4">
              <div className="space-y-4 text-slate-100">
                <div className="text-center">
                  <p className="text-xl font-medium text-amber-300 mb-2">
                    Hey! I'm David—great to see you here!
                  </p>
                  <p className="text-lg leading-relaxed">
                    I built a simple portfolio page a while back but kept postponing it—well, it's finally live!
                    I'm a <span className="text-orange-400 font-semibold">Senior Software Engineer</span> specializing in backend.
                  </p>
                </div>

                <p className="text-lg leading-relaxed text-center">
                  I have a <span className="text-red-400 font-semibold">LOT</span> of interests and tend to explore them fully
                  (maybe dispersing a bit too much lol), so expect to see some interesting projects here!
                </p>
              </div>
            </div>

            <div className="max-w-4xl mx-auto">
              <AboutReviewCarousel />
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export {AboutIntroScreen}
