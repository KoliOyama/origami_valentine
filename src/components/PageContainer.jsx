import { motion, useReducedMotion } from 'motion/react'
import fullHeart from '../assets/full_heart.svg'

/**
 * Layout wrapper with pink background, centered content, and page transitions
 * Full viewport height, mobile-first responsive
 * Respects user's reduced motion preferences
 */
const PageContainer = ({ children, className = '' }) => {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div 
      initial={{ opacity: shouldReduceMotion ? 1 : 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: shouldReduceMotion ? 1 : 0 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.15, ease: 'easeOut' }}
      className="min-h-screen w-full bg-valentine-bg flex flex-col"
    >
      <main 
        className={`
          flex-1 w-full
          flex flex-col items-center
          px-6 py-12
          ${className}
        `}
      >
        {children}
      </main>
      
      {/* Footer */}
      <footer className="w-full py-4 text-center">
        <p className="font-sans text-[12px] text-valentine-brown/60 flex items-center justify-center gap-1">
          Made with{' '}
          <img src={fullHeart} alt="love" className="w-3 h-3 inline-block" />
          {' '}by{' '}
          <a 
            href="https://linktr.ee/kolioyama" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-valentine-brown/80 hover:text-valentine-brown transition-colors"
          >
            Koli Oyama
          </a>
        </p>
      </footer>
    </motion.div>
  )
}

export default PageContainer
