import { motion } from 'motion/react'

/**
 * Animated text component with fade and slide up effect
 * @param {string} as - HTML element type (h1, h2, p, span)
 * @param {number} delay - Animation delay in seconds
 */
const AnimatedText = ({ 
  children, 
  as = 'span', 
  delay = 0, 
  className = '',
  direction = 'up' // 'up', 'down', 'left', 'right'
}) => {
  const directions = {
    up: { y: 20, x: 0 },
    down: { y: -20, x: 0 },
    left: { x: 20, y: 0 },
    right: { x: -20, y: 0 },
  }

  const Component = motion[as] || motion.span

  return (
    <Component
      initial={{ 
        opacity: 0, 
        ...directions[direction]
      }}
      animate={{ 
        opacity: 1, 
        x: 0, 
        y: 0 
      }}
      exit={{ 
        opacity: 0, 
        ...directions[direction]
      }}
      transition={{ 
        duration: 0.25, 
        delay,
        ease: [0.25, 0.46, 0.45, 0.94] // easeOutQuad
      }}
      className={className}
    >
      {children}
    </Component>
  )
}

export default AnimatedText
