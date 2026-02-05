import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import PageContainer from './PageContainer'
import InputField from './InputField'
import Button from './Button'
import AnimatedText from './AnimatedText'
import fullHeart from '../assets/full_heart.svg'

/**
 * Invitation Form Screen - Entry point for creating a valentine
 * Sender enters receiver's name and their own name
 */
const InvitationForm = () => {
  const navigate = useNavigate()
  const [receiverName, setReceiverName] = useState('')
  const [senderName, setSenderName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!receiverName.trim() || !senderName.trim()) return
    
    // Navigate to share screen with names as URL params
    const params = new URLSearchParams({
      to: receiverName.trim(),
      from: senderName.trim()
    })
    navigate(`/share?${params.toString()}`)
  }

  return (
    <PageContainer className="justify-start pt-16">
      {/* Title */}
      <AnimatedText 
        as="h1" 
        delay={0.1}
        className="font-serif text-3xl md:text-4xl text-valentine-brown text-center leading-tight"
      >
        Create your
        <br />
        Origami Valentine
      </AnimatedText>

      {/* Heart decoration */}
      <motion.div 
        className="mt-8 mb-6"
        initial={{ opacity: 0, scale: 0, rotate: -180 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ 
          duration: 0.6, 
          delay: 0.3,
          ease: [0.34, 1.56, 0.64, 1]
        }}
      >
        <img 
          src={fullHeart} 
          alt="" 
          className="w-16 h-14"
          aria-hidden="true"
        />
      </motion.div>

      {/* Form card */}
      <motion.form 
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white rounded-2xl p-6 shadow-sm"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {/* Instructions */}
        <p className="font-sans text-sm text-neutral-700 mb-6">
          Enter your lover's name and yours. They will both appear on the first page of the invitation
        </p>

        {/* Input fields */}
        <div className="flex flex-col gap-4 mb-6">
          <InputField
            label="To"
            name="receiverName"
            placeholder="Receiver's name"
            value={receiverName}
            onChange={(e) => setReceiverName(e.target.value)}
            required
          />
          
          <InputField
            label="From"
            name="senderName"
            placeholder="Your name"
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
            required
          />
        </div>

        {/* Submit button */}
        <Button type="submit" fullWidth>
          Create
        </Button>
      </motion.form>
    </PageContainer>
  )
}

export default InvitationForm
