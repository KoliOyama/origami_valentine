import { useSearchParams } from 'react-router-dom'
import { useState } from 'react'
import { motion } from 'motion/react'
import PageContainer from './PageContainer'
import Button from './Button'
import AnimatedText from './AnimatedText'
import shareEnvelope from '../assets/share_page_envelope.svg'

/**
 * Share Screen - Displayed after card creation
 * Shows "Ready!" with envelope and Share button
 */
const ShareScreen = () => {
  const [searchParams] = useSearchParams()
  const [copied, setCopied] = useState(false)
  
  const receiverName = searchParams.get('to') || ''
  const senderName = searchParams.get('from') || ''

  // Generate the shareable card URL
  const getShareUrl = () => {
    const params = new URLSearchParams({
      to: receiverName,
      from: senderName
    })
    return `${window.location.origin}/card?${params.toString()}`
  }

  const handleShare = async () => {
    const shareUrl = getShareUrl()
    const shareData = {
      title: 'A special question awaits... 💕',
      text: `${senderName} sent you something special! Open it to see their message.`,
      url: shareUrl
    }

    // Try native Web Share API first
    if (navigator.share && navigator.canShare?.(shareData)) {
      try {
        await navigator.share(shareData)
        return
      } catch (err) {
        // User cancelled or share failed - fall through to clipboard
        if (err.name === 'AbortError') return
      }
    }

    // Fallback: Copy to clipboard
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <PageContainer className="justify-between py-20">
      {/* Top section with title */}
      <div className="flex-1 flex flex-col items-center justify-start pt-8">
        <AnimatedText 
          as="h1" 
          delay={0.1}
          className="font-serif text-4xl md:text-5xl text-valentine-brown"
        >
          Ready!
        </AnimatedText>
      </div>

      {/* Center section with envelope */}
      <motion.div 
        className="flex-1 flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
      >
        <img 
          src={shareEnvelope} 
          alt="Valentine envelope ready to share" 
          className="w-32 h-32 md:w-40 md:h-40"
        />
      </motion.div>

      {/* Bottom section with button */}
      <motion.div 
        className="flex-1 flex flex-col items-center justify-end"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        <Button onClick={handleShare}>
          {copied ? 'Link copied!' : 'Share'}
        </Button>
      </motion.div>
    </PageContainer>
  )
}

export default ShareScreen
