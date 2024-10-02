'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

const NewsletterForm: React.FC = () => {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      console.log('Subscribing email:', email)
      setMessage('Thank you for subscribing to our newsletter.')
      setEmail('')
    } catch (error) {
      setMessage('There was an error subscribing to the newsletter. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-grow"
          aria-label="Email address"
        />
        <Button 
          type="submit" 
          className="bg-[#D0BFB4] text-gray-800 hover:bg-[#C1AEA1] transition-colors duration-300"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Subscribing...
            </>
          ) : (
            'Subscribe'
          )}
        </Button>
      </div>
      {message && (
        <p className="text-sm text-center text-gray-600 dark:text-gray-300">
          {message}
        </p>
      )}
      <p className="text-xs text-center text-gray-500 dark:text-gray-400">
        We respect your privacy. Unsubscribe at any time.
      </p>
    </form>
  )
}

export default function Newsletter() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  }

  return (
    <section className="bg-[#F5F1EE] dark:bg-gray-800 py-20">
      <motion.div 
        className="container mx-auto px-4 max-w-2xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h2 
          className="text-4xl sm:text-5xl font-bold mb-6 text-center font-syne text-gray-800 dark:text-white"
          variants={itemVariants}
        >
          Stay Updated
        </motion.h2>
        <motion.p 
          className="text-center mb-8 font-poppins text-gray-600 dark:text-gray-300 text-lg sm:text-xl"
          variants={itemVariants}
        >
          Subscribe to our newsletter for the latest updates and features.
        </motion.p>
        <motion.div 
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <NewsletterForm />
        </motion.div>
      </motion.div>
    </section>
  )
}