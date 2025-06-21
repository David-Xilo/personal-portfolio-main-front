import React from 'react'
import './about.css'
import {InfiniteCarousel} from 'components/carousel/infinite-carousel'
import {useAboutReviewsGetApi} from '../../hooks/about-rest'


interface AboutReview {
  author: string
  description: string
  rating: number
}

interface AboutReview {
  author: string
  description: string
  rating: number
}

const AboutReviewCard: React.FC<{ review: AboutReview }> = ({ review }) => {
  const renderStars = (rating: number) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`text-lg ${i <= rating ? 'text-amber-400' : 'text-gray-600'}`}
        >
          ★
        </span>
      )
    }
    return stars
  }

  return (
    <div className="bg-slate-900/80 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 w-full">
      <div className="mb-6 text-center">
        <div className="bg-gradient-to-r from-amber-400/10 via-orange-400/10 to-red-400/10 rounded-lg p-4 border-l-4 border-amber-400">
          <p className="text-slate-100 text-xl font-bold leading-relaxed">
            {review.description}
          </p>
        </div>
      </div>

      <div className="flex justify-center mb-4">
        <div className="flex items-center gap-1">
          {renderStars(review.rating)}
        </div>
      </div>

      <div className="text-center">
        <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-3"></div>
        <p className="text-amber-300 font-semibold text-sm uppercase tracking-wide">
          {review.author}
        </p>
      </div>

      <div className="flex justify-center mt-4">
        <div className="text-xs text-amber-400/40">✦</div>
      </div>
    </div>
  )
}

const AboutReviewCarousel: React.FC = () => {
  const {status, message, error} = useAboutReviewsGetApi('/about/reviews/carousel')
  if (status !== 'success') {
    return <div>Found error {error}</div>
  }

  return (
    <div className="py-6 px-4">
      <div className="mb-6">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-sm">🎬</span>
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              Reviews
            </h2>
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
              <span className="text-sm">⭐</span>
            </div>
          </div>
          <p className="text-slate-400 text-sm italic">
            What the VIP have to say
          </p>
        </div>

        <InfiniteCarousel
          items={message}
          renderItem={(review, index) => {
            return <AboutReviewCard review={review} />
          }}
          size="medium"
          className="mb-4"
          showArrows={true}
          showIndicators={true}
        />
      </div>
    </div>
  )
}

export {AboutReviewCarousel}

