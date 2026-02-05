import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import PageContainer from './PageContainer'
import Button from './Button'
import AnimatedText from './AnimatedText'

/**
 * 404 Not Found page
 * Shown when user navigates to an invalid route
 */
const NotFound = () => {
  const navigate = useNavigate()

  return (
    <PageContainer className="justify-center">
      <div className="flex flex-col items-center text-center">
        <AnimatedText 
          as="h1" 
          delay={0.1}
          className="font-serif text-6xl md:text-7xl text-valentine-brown mb-4"
        >
          404
        </AnimatedText>
        
        <AnimatedText 
          as="p" 
          delay={0.2}
          className="font-sans text-lg text-valentine-brown/70 mb-8"
        >
          This page got lost in the love letters...
        </AnimatedText>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Button onClick={() => navigate('/')}>
            Create a Valentine
          </Button>
        </motion.div>
      </div>
    </PageContainer>
  )
}

export default NotFound
