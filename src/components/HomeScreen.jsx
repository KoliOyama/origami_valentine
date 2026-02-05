import { useSearchParams } from 'react-router-dom'
import { motion } from 'motion/react'
import PageContainer from './PageContainer'
import OrigamiCard from './OrigamiCard'
import AnimatedText from './AnimatedText'

/**
 * Home Screen - Receiver's landing page
 * Shows "To [Name]", origami card, and "From [Name]"
 */
const HomeScreen = () => {
  const [searchParams] = useSearchParams()
  
  const receiverName = searchParams.get('to') || 'You'
  const senderName = searchParams.get('from') || 'Someone special'

  return (
    <PageContainer className="justify-between py-20">
      {/* To name - top */}
      <motion.div 
        className="flex-1 flex items-end justify-center pb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <AnimatedText 
          as="h1" 
          delay={0.2}
          className="font-serif text-3xl md:text-4xl text-valentine-brown"
        >
          To {receiverName}
        </AnimatedText>
      </motion.div>

      {/* Origami card - center */}
      <motion.div 
        className="flex-1 flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <OrigamiCard searchParams={searchParams} />
      </motion.div>

      {/* From name - bottom */}
      <motion.div 
        className="flex-1 flex items-start justify-center pt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <AnimatedText 
          as="p" 
          delay={0.5}
          className="font-serif text-3xl md:text-4xl text-valentine-brown"
        >
          From {senderName}
        </AnimatedText>
      </motion.div>
    </PageContainer>
  )
}

export default HomeScreen
