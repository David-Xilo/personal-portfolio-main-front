import React from 'react'
import './about.css'
import {InfiniteCarousel} from 'components/carousel/infinite-carousel'
import {useAboutReviewsGetApi} from '../../hooks/about-rest'


interface AboutReview {
  author: string
  description: string
  rating: number
}

const AboutReviewCard: React.FC<{ review: AboutReview }> = ({ review }) => {

  return (
    <div className="infinite-game-card">
      <div className="infinite-game-header">
        <h3 className="infinite-game-title">
          {review.author}
        </h3>
      </div>

      <div className="infinite-game-content">
        <p className="infinite-game-description">
          {review.description}
        </p>
        <p className="infinite-game-genre">
          {review.rating}/5
        </p>
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
    <div className="py-8 px-4">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-center mb-6" style={{color: 'var(--color-text-primary)'}}>
          Reviews from important people
        </h2>
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

