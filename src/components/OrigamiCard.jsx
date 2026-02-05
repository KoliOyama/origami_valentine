import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

// Import origami state images
import folded from '../assets/origmai_parts/folded.png'
import oneUnfolded from '../assets/origmai_parts/one_unfolded.png'
import twoUnfolded from '../assets/origmai_parts/two_unfolded.png'
import threeUnfolded from '../assets/origmai_parts/three_unfolded.png'
import fourUnfolded from '../assets/origmai_parts/four_unfolded.png'
import opened from '../assets/origmai_parts/opened.png'
import clickArrow from '../assets/origmai_parts/click_arrow.png'

// Animation states in sequence
const STATES = ['folded', 'one', 'two', 'three', 'four', 'opened']

// Map states to images
const STATE_IMAGES = {
  folded,
  one: oneUnfolded,
  two: twoUnfolded,
  three: threeUnfolded,
  four: fourUnfolded,
  opened
}

// Aria labels for each state
const STATE_LABELS = {
  folded: 'Folded origami valentine card. Click or press Enter to open.',
  one: 'Opening origami card...',
  two: 'Opening origami card...',
  three: 'Opening origami card...',
  four: 'Almost open! Click or press Enter to reveal the message.',
  opened: 'Will you be my Valentine? Click Yes in the top-left or No in the bottom-right.'
}

// Animation timing (ms)
const TRANSITION_DURATION = 300
const AUTO_DELAY = 700

// Check for reduced motion preference
const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Animated origami card component
 * Handles the unfolding sequence and Yes/No interactions
 * Keyboard accessible with Enter/Space support
 */
const OrigamiCard = ({ searchParams }) => {
  const navigate = useNavigate()
  const [currentState, setCurrentState] = useState('folded')
  const [isAnimating, setIsAnimating] = useState(false)
  const [showClickHint, setShowClickHint] = useState(true)
  const [opacity, setOpacity] = useState(1)

  const stateIndex = STATES.indexOf(currentState)
  const reducedMotion = prefersReducedMotion()

  // Auto-animate sequence from one to four
  useEffect(() => {
    if (!isAnimating) return
    
    if (currentState === 'one' || currentState === 'two' || currentState === 'three') {
      const nextIndex = stateIndex + 1
      const delay = reducedMotion ? 100 : AUTO_DELAY
      const fadeDuration = reducedMotion ? 0 : TRANSITION_DURATION
      
      const fadeOutTimer = setTimeout(() => {
        setOpacity(reducedMotion ? 1 : 0)
      }, delay - fadeDuration)

      const stateTimer = setTimeout(() => {
        setCurrentState(STATES[nextIndex])
        setOpacity(1)
        
        if (STATES[nextIndex] === 'four') {
          setIsAnimating(false)
        }
      }, delay)

      return () => {
        clearTimeout(fadeOutTimer)
        clearTimeout(stateTimer)
      }
    }
  }, [currentState, isAnimating, stateIndex, reducedMotion])

  const handleInteraction = useCallback((e) => {
    if (isAnimating) return

    if (showClickHint) setShowClickHint(false)

    if (currentState === 'folded') {
      if (reducedMotion) {
        setCurrentState('one')
        setIsAnimating(true)
      } else {
        setOpacity(0)
        setTimeout(() => {
          setCurrentState('one')
          setOpacity(1)
          setIsAnimating(true)
        }, TRANSITION_DURATION)
      }
      return
    }

    if (currentState === 'four') {
      if (reducedMotion) {
        setCurrentState('opened')
      } else {
        setOpacity(0)
        setTimeout(() => {
          setCurrentState('opened')
          setOpacity(1)
        }, TRANSITION_DURATION)
      }
      return
    }

    // Handle opened state clicks
    if (currentState === 'opened' && e.clientX !== undefined) {
      handleOpenedClick(e)
    }
  }, [currentState, isAnimating, showClickHint, reducedMotion])

  const handleOpenedClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const width = rect.width
    const height = rect.height

    const relX = x / width
    const relY = y / height

    if (relX < 0.35 && relY < 0.35) {
      navigate(`/yes?${searchParams.toString()}`)
    } else if (relX > 0.65 && relY > 0.65) {
      navigate(`/no?${searchParams.toString()}`)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      
      // For opened state, provide keyboard alternatives
      if (currentState === 'opened') {
        // Y key for Yes, N key for No
        return
      }
      
      handleInteraction(e)
    }
    
    // Keyboard shortcuts for opened state
    if (currentState === 'opened') {
      if (e.key === 'y' || e.key === 'Y') {
        navigate(`/yes?${searchParams.toString()}`)
      } else if (e.key === 'n' || e.key === 'N') {
        navigate(`/no?${searchParams.toString()}`)
      }
    }
  }

  return (
    <div className="relative flex flex-col items-center">
      {/* Origami card - accessible button */}
      <button
        type="button"
        onClick={handleInteraction}
        onKeyDown={handleKeyDown}
        aria-label={STATE_LABELS[currentState]}
        aria-live="polite"
        className="cursor-pointer bg-transparent border-none p-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-valentine-brown focus-visible:ring-offset-2 focus-visible:ring-offset-valentine-bg rounded-lg"
        disabled={isAnimating}
      >
        <img
          src={STATE_IMAGES[currentState]}
          alt=""
          className="w-36 h-36 md:w-44 md:h-44 object-contain"
          style={{
            opacity: opacity,
            transition: reducedMotion ? 'none' : `opacity ${TRANSITION_DURATION}ms ease-out`,
          }}
          draggable={false}
        />
      </button>

      {/* Click hint - folded state */}
      {showClickHint && currentState === 'folded' && (
        <div className="flex items-center gap-1 mt-2 text-valentine-brown animate-pulse" aria-hidden="true">
          <span className="font-serif text-base">click</span>
          <img src={clickArrow} alt="" className="w-3 h-3" />
        </div>
      )}

      {/* Click hint - four state */}
      {currentState === 'four' && !isAnimating && (
        <div className="flex items-center gap-1 mt-2 text-valentine-brown animate-pulse" aria-hidden="true">
          <span className="font-serif text-base">click</span>
          <img src={clickArrow} alt="" className="w-3 h-3" />
        </div>
      )}

      {/* Keyboard instructions for opened state */}
      {currentState === 'opened' && (
        <p className="sr-only">
          Press Y for Yes or N for No. Or click the top-left for Yes, bottom-right for No.
        </p>
      )}
    </div>
  )
}

export default OrigamiCard
