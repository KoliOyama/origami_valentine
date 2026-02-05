import { useSearchParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { motion } from 'motion/react'
import { Restart } from '@solar-icons/react'
import PageContainer from './PageContainer'
import Button from './Button'
import AnimatedText from './AnimatedText'
import strokeHeart from '../assets/stroke_heart.svg'

/**
 * Reminder Screen - Save the date screen
 * Shows calendar with Feb 14 highlighted and share confirmation
 */
const ReminderScreen = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [copied, setCopied] = useState(false)

  const senderName = searchParams.get('from') || 'Someone special'

  const handleRestart = () => {
    // Go back to the card to replay the experience
    navigate(`/card?${searchParams.toString()}`)
  }

  const handleSaveTheDate = async () => {
    const shareMessage = `I said YES! 💕 Save the date - February 14th. See you then, ${senderName}! 🗓️`
    
    const shareData = {
      title: 'Valentine Confirmation 💕',
      text: shareMessage,
    }

    // Try native Web Share API first
    if (navigator.share && navigator.canShare?.(shareData)) {
      try {
        await navigator.share(shareData)
        return
      } catch (err) {
        // User cancelled or share failed
        if (err.name === 'AbortError') return
      }
    }

    // Fallback: Copy to clipboard
    try {
      await navigator.clipboard.writeText(shareMessage)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <PageContainer className="justify-start pt-8 relative">
      {/* Restart button - top right */}
      <motion.button
        onClick={handleRestart}
        className="absolute top-6 right-6 w-12 h-12 rounded-full bg-valentine-brown text-white flex items-center justify-center hover:opacity-90 transition-opacity cursor-pointer"
        aria-label="Replay the card"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.8 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Restart size={24} />
      </motion.button>

      {/* Main content */}
      <div className="flex flex-col items-center justify-center flex-1 w-full">
        {/* "It's your reminder to" */}
        <AnimatedText 
          as="p" 
          delay={0.1}
          className="font-sans text-base text-valentine-brown/80 text-center leading-relaxed mt-12"
        >
          It's your
          <br />
          reminder to
        </AnimatedText>

        {/* "be my" in script font */}
        <AnimatedText 
          as="h2" 
          delay={0.2}
          className="font-script text-5xl md:text-6xl text-valentine-brown mt-6"
        >
          be my
        </AnimatedText>

        {/* Calendar dates row */}
        <motion.div 
          className="flex items-center justify-center gap-2 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {/* Date 12 - very faded */}
          <motion.div 
            className="w-10 h-10 flex items-center justify-center rounded-lg border border-valentine-brown/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <span className="font-serif text-sm text-valentine-brown/20">12</span>
          </motion.div>

          {/* Date 13 */}
          <motion.div 
            className="w-10 h-10 flex items-center justify-center rounded-lg border border-valentine-brown/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
          >
            <span className="font-serif text-sm text-valentine-red/60">13</span>
          </motion.div>

          {/* Date 14 - inside heart */}
          <motion.div 
            className="relative flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <img 
              src={strokeHeart} 
              alt="" 
              className="w-20 h-18"
              aria-hidden="true"
            />
            <span className="absolute font-serif text-lg text-valentine-red">14</span>
          </motion.div>

          {/* Date 15 */}
          <motion.div 
            className="w-10 h-10 flex items-center justify-center rounded-lg border border-valentine-brown/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
          >
            <span className="font-serif text-sm text-valentine-red/60">15</span>
          </motion.div>

          {/* Date 16 - very faded */}
          <motion.div 
            className="w-10 h-10 flex items-center justify-center rounded-lg border border-valentine-brown/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <span className="font-serif text-sm text-valentine-brown/20">16</span>
          </motion.div>
        </motion.div>

        {/* "Valentine" in script font */}
        <AnimatedText 
          as="h2" 
          delay={0.5}
          className="font-script text-5xl md:text-6xl text-valentine-brown mt-8"
        >
          Valentine
        </AnimatedText>
      </div>

      {/* Save the date button - bottom */}
      <motion.div 
        className="flex justify-center pb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.7 }}
      >
        <Button onClick={handleSaveTheDate}>
          {copied ? 'Message copied!' : 'Save the date'}
        </Button>
      </motion.div>
    </PageContainer>
  )
}

export default ReminderScreen
