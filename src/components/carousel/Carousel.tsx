'use client'

import {useRef, useState, useEffect, useCallback} from 'react'
import {CaretLeftIcon, CaretRightIcon} from '@phosphor-icons/react/ssr'

export type CarouselProps = {
  data: any[]
  component: React.ElementType
  className?: string
  showIndicators?: boolean
  showControls?: boolean
  infinite?: boolean
  slidesPerView?: {
    mobile: number
    tablet: number
    desktop: number
  }
}

export function Carousel({
  data,
  component: Component,
  className = '',
  showIndicators = true,
  showControls = true,
  infinite = false,
  slidesPerView = {mobile: 1, tablet: 2, desktop: 3},
}: CarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [slidesVisible, setSlidesVisible] = useState(slidesPerView.mobile)

  // Update slides visible based on screen size
  useEffect(() => {
    const updateSlidesVisible = () => {
      const width = window.innerWidth
      if (width >= 1024) {
        setSlidesVisible(slidesPerView.desktop)
      } else if (width >= 768) {
        setSlidesVisible(slidesPerView.tablet)
      } else {
        setSlidesVisible(slidesPerView.mobile)
      }
    }

    updateSlidesVisible()
    window.addEventListener('resize', updateSlidesVisible)
    return () => window.removeEventListener('resize', updateSlidesVisible)
  }, [slidesPerView])

  // Check scroll position and update button states
  const checkScrollPosition = useCallback(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const scrollLeft = container.scrollLeft
    const scrollWidth = container.scrollWidth
    const clientWidth = container.clientWidth

    if (infinite) {
      // In infinite mode, buttons are always enabled
      setCanScrollLeft(true)
      setCanScrollRight(true)
    } else {
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)
    }

    // Update current index based on scroll position
    const slideWidth = clientWidth / slidesVisible
    const newIndex = Math.round(scrollLeft / slideWidth)
    setCurrentIndex(newIndex)
  }, [slidesVisible, infinite])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => checkScrollPosition()
    container.addEventListener('scroll', handleScroll)

    // Initial check
    checkScrollPosition()

    return () => container.removeEventListener('scroll', handleScroll)
  }, [checkScrollPosition])

  const scrollToSlide = (index: number) => {
    if (!containerRef.current) return

    const container = containerRef.current
    const slideWidth = container.clientWidth / slidesVisible
    const scrollLeft = index * slideWidth

    container.scrollTo({
      left: scrollLeft,
      behavior: 'smooth',
    })
  }

  const scrollLeft = () => {
    if (infinite) {
      const newIndex =
        currentIndex <= 0
          ? Math.max(0, data.length - slidesVisible)
          : currentIndex - 1
      scrollToSlide(newIndex)
    } else {
      const newIndex = Math.max(0, currentIndex - 1)
      scrollToSlide(newIndex)
    }
  }

  const scrollRight = () => {
    const maxIndex = Math.max(0, data.length - slidesVisible)
    if (infinite) {
      const newIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1
      scrollToSlide(newIndex)
    } else {
      const newIndex = Math.min(maxIndex, currentIndex + 1)
      scrollToSlide(newIndex)
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowLeft' && (infinite || canScrollLeft)) {
      scrollLeft()
    } else if (event.key === 'ArrowRight' && (infinite || canScrollRight)) {
      scrollRight()
    }
  }

  const maxIndex = Math.max(0, data.length - slidesVisible)
  const totalDots = maxIndex + 1

  return (
    <div
      className={`relative w-full ${className}`}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Carousel"
    >
      {/* Left Control Button */}
      {showControls && (
        <button
          onClick={scrollLeft}
          disabled={infinite ? false : !canScrollLeft}
          className="absolute top-1/2 -left-10 z-10 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center text-gray-200 transition-colors hover:text-gray-100"
          aria-label="Previous slide"
          aria-disabled={infinite ? false : !canScrollLeft}
        >
          <CaretLeftIcon size={40} weight="regular" />
        </button>
      )}

      {/* Carousel Container */}
      <div
        ref={containerRef}
        className="scrollbar-hide flex overflow-x-auto scroll-smooth"
        style={{
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {data.map((item, index) => (
          <div
            key={index}
            className="scroll-snap-align-start flex-none"
            style={{
              width: `${100 / slidesVisible}%`,
              scrollSnapAlign: 'start',
            }}
          >
            <div className="px-2 lg:px-3">
              <Component {...item} />
            </div>
          </div>
        ))}
      </div>

      {/* Right Control Button */}
      {showControls && (
        <button
          onClick={scrollRight}
          disabled={infinite ? false : !canScrollRight}
          className="absolute top-1/2 -right-10 z-10 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center text-gray-200 transition-colors hover:text-gray-100"
          aria-label="Next slide"
          aria-disabled={infinite ? false : !canScrollRight}
        >
          <CaretRightIcon size={40} weight="regular" />
        </button>
      )}

      {/* Indicators */}
      {showIndicators && totalDots > 1 && (
        <div className="mt-10 flex justify-center space-x-2">
          {Array.from({length: totalDots}).map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToSlide(index)}
              className={`h-2 w-2 cursor-pointer rounded-full transition-all duration-200 hover:scale-125 lg:h-3 lg:w-3 ${
                index === currentIndex
                  ? 'bg-primary-600 scale-110'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
