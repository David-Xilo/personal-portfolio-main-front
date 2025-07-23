import React from 'react'
import './about.css'
import {InfiniteCarousel} from 'components/carousel/infinite-carousel'
import {useAboutReviewsGetApi} from '../../api/hooks/about-rest'
import {Loader} from 'components/loader/loader'

interface AboutReview {
  author: string
  description: string
  rating: number
}

const AboutReviewCard: React.FC<{review: AboutReview}> = ({review}) => {
  const renderStars = (rating: number) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={
            i <= rating ? 'about-review-star-filled' : 'about-review-star-empty'
          }
        >
          ★
        </span>,
      )
    }
    return stars
  }

  return (
    <div className="about-review-card">
      <div className="about-review-content">
        <div className="about-review-quote-container">
          <p className="about-review-text">{review.description}</p>
        </div>
      </div>

      <div className="about-review-rating-container">
        <div className="about-review-stars">{renderStars(review.rating)}</div>
      </div>

      <div className="about-review-author-section">
        <div className="about-review-divider"></div>
        <p className="about-review-author">{review.author}</p>
      </div>

      <div className="about-review-decoration">
        <div className="about-review-decoration-icon">✦</div>
      </div>
    </div>
  )
}

const AboutReviewCarousel: React.FC = () => {
  const {status, message, error} = useAboutReviewsGetApi(
    '/about/reviews/carousel',
  )
  if (status === 'loading' || status === '') {
    return (
      <div className="about-reviews-container">
        <Loader />
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="error-message-container">
        <p className="error-message-text">Unable to load reviews: {error}</p>
      </div>
    )
  }

  return (
    <div className="about-reviews-container">
      <div className="about-reviews-section">
        <div className="about-reviews-header">
          <div className="about-reviews-title-container">
            <div className="about-reviews-icon-left">
              <span>🎬</span>
            </div>
            <h2 className="about-reviews-title">Reviews</h2>
            <div className="about-reviews-icon-right">
              <span>⭐</span>
            </div>
          </div>
          <p className="about-reviews-subtitle">What the VIP have to say</p>
        </div>

        <InfiniteCarousel
          items={message}
          renderItem={(review, _index) => {
            return <AboutReviewCard review={review} />
          }}
          size="medium"
          className="about-reviews-carousel"
          showArrows={true}
          showIndicators={true}
        />
      </div>
    </div>
  )
}

export {AboutReviewCarousel}
