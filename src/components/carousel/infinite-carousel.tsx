import React, {useEffect, useState, useRef, useCallback} from 'react'
import './infinite-carousel.css'
import {ChevronLeftIcon} from 'components/icons/chevron-left-icon'
import {ChevronRightIcon} from 'components/icons/chevron-right-icon'

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
  autoAdvanceInterval = 4000,
}: InfiniteCarouselProps<T>) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [contentAreaWidth, setContentAreaWidth] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)
  const contentAreaRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const autoAdvanceRef = useRef<NodeJS.Timeout | null>(null)

  const updateDimensions = useCallback(() => {
    if (contentAreaRef.current && trackRef.current) {
      const areaWidth = contentAreaRef.current.offsetWidth
      setContentAreaWidth(areaWidth)

      trackRef.current.style.width = `${areaWidth * items.length}px`

      itemRefs.current.forEach(itemRef => {
        if (itemRef) {
          itemRef.style.width = `${areaWidth}px`
        }
      })
    }
  }, [items.length])

  useEffect(() => {
    if (trackRef.current && contentAreaWidth > 0) {
      const translateX = -currentIndex * contentAreaWidth
      trackRef.current.style.transform = `translateX(${translateX}px)`
    }
  }, [currentIndex, contentAreaWidth])

  useEffect(() => {
    updateDimensions()

    const handleResize = () => {
      updateDimensions()
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [updateDimensions])

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

  const goToPrevious = () => {
    setCurrentIndex(prev => (prev === 0 ? items.length - 1 : prev - 1))
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

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      goToPrevious()
    } else if (event.key === 'ArrowRight') {
      event.preventDefault()
      goToNext()
    }
  }

  if (!items || items.length === 0) {
    return (
      <div className={`infinite-carousel infinite-carousel-${size}`}>
        <div className="carousel-content-area" ref={contentAreaRef}>
          <div className="flex items-center justify-center h-full text-gray-500">
            No items to display
          </div>
        </div>
      </div>
    )
  }

  if (items.length === 1) {
    return (
      <div
        className={`infinite-carousel infinite-carousel-${size} ${className}`}
      >
        <div className="carousel-content-area" ref={contentAreaRef}>
          <div className="h-full w-full">{renderItem(items[0], 0)}</div>
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
      {showArrows && (
        <button
          onClick={goToPrevious}
          className="carousel-nav-arrow-infinite"
          aria-label="Previous item"
        >
          <ChevronLeftIcon />
        </button>
      )}

      <div className="carousel-content-area" ref={contentAreaRef}>
        <div ref={trackRef} className="carousel-track-infinite">
          {items.map((item, index) => (
            <div
              key={index}
              className="carousel-item-infinite"
              ref={el => (itemRefs.current[index] = el)}
            >
              {renderItem(item, index)}
            </div>
          ))}
        </div>
      </div>

      {showArrows && (
        <button
          onClick={goToNext}
          className="carousel-nav-arrow-infinite"
          aria-label="Next item"
        >
          <ChevronRightIcon />
        </button>
      )}

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
