import React, { useEffect, useState, useRef } from 'react'
import './infinite-carousel.css'

const ChevronLeft: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="15,18 9,12 15,6"></polyline>
  </svg>
)

const ChevronRight: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="9,18 15,12 9,6"></polyline>
  </svg>
)

// Infinite carousel component - loops seamlessly
interface InfiniteCarouselProps<T> {
  items: T[]
  renderItem: (item: T, index: number) => React.ReactNode
  size?: 'small' | 'medium' | 'large'
  className?: string
  showArrows?: boolean
  showIndicators?: boolean
  autoAdvance?: boolean
  autoAdvanceInterval?: number
}

function InfiniteCarousel<T>({
                               items,
                               renderItem,
                               size = 'medium',
                               className = '',
                               showArrows = true,
                               showIndicators = true,
                               autoAdvance = false,
                               autoAdvanceInterval = 4000
                             }: InfiniteCarouselProps<T>) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)
  const autoAdvanceRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (trackRef.current) {
      // Get the actual item width from CSS variable
      const itemWidth = parseInt(getComputedStyle(document.documentElement)
        .getPropertyValue('--carousel-item-width'))
      const translateX = -currentIndex * itemWidth // Move by actual item width in pixels
      trackRef.current.style.transform = `translateX(${translateX}px)`
    }
  }, [currentIndex])

  // Auto-advance functionality (optional)
  useEffect(() => {
    if (autoAdvance && items.length > 1) {
      autoAdvanceRef.current = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % items.length)
      }, autoAdvanceInterval)

      return () => {
        if (autoAdvanceRef.current) {
          clearInterval(autoAdvanceRef.current)
        }
      }
    }
  }, [autoAdvance, autoAdvanceInterval, items.length])

  // Navigation functions - infinite looping
  const goToPrevious = () => {
    setCurrentIndex(prev => prev === 0 ? items.length - 1 : prev - 1)
    resetAutoAdvance()
  }

  const goToNext = () => {
    setCurrentIndex(prev => (prev + 1) % items.length)
    resetAutoAdvance()
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    resetAutoAdvance()
  }

  const resetAutoAdvance = () => {
    if (autoAdvance && autoAdvanceRef.current) {
      clearInterval(autoAdvanceRef.current)
      autoAdvanceRef.current = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % items.length)
      }, autoAdvanceInterval)
    }
  }

  // Keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      goToPrevious()
    } else if (event.key === 'ArrowRight') {
      event.preventDefault()
      goToNext()
    }
  }

  // Don't render if no items
  if (!items || items.length === 0) {
    return (
      <div className={`infinite-carousel infinite-carousel-${size}`}>
        <div className="carousel-content-area">
          <div className="flex items-center justify-center h-full text-gray-500">
            No items to display
          </div>
        </div>
      </div>
    )
  }

  // Single item - no navigation needed
  if (items.length === 1) {
    return (
      <div className={`infinite-carousel infinite-carousel-${size} ${className}`}>
        <div className="carousel-content-area">
          <div className="h-full">
            {renderItem(items[0], 0)}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`infinite-carousel infinite-carousel-${size} ${className}`}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {/* Left arrow - always enabled for infinite loop */}
      {showArrows && (
        <button
          onClick={goToPrevious}
          className="carousel-nav-arrow-infinite"
          aria-label="Previous item"
        >
          <ChevronLeft />
        </button>
      )}

      {/* Main content area */}
      <div className="carousel-content-area">
        <div
          ref={trackRef}
          className="carousel-track-infinite"
          style={{
            width: `calc(${items.length} * var(--carousel-item-width))`
          }}
        >
          {items.map((item, index) => (
            <div key={index} className="carousel-item-infinite">
              {renderItem(item, index)}
            </div>
          ))}
        </div>
      </div>

      {/* Right arrow - always enabled for infinite loop */}
      {showArrows && (
        <button
          onClick={goToNext}
          className="carousel-nav-arrow-infinite"
          aria-label="Next item"
        >
          <ChevronRight />
        </button>
      )}

      {/* Position indicators */}
      {showIndicators && items.length > 1 && (
        <div className="infinite-carousel-indicators">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`infinite-carousel-indicator ${index === currentIndex ? 'active' : ''}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export {InfiniteCarousel, InfiniteCarouselProps}
