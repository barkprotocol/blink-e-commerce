'use client';

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the email to your backend
    console.log('Subscribing email:', email)
    toast({
      title: "Subscribed!",
      description: "Thank you for subscribing to our newsletter.",
    })
    setEmail('')
  }

  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Stay Updated with Blink Protocol
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Subscribe to our newsletter for the latest updates, features, and e-commerce insights.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full sm:w-96"
            />
            <Button type="submit" className="bg-[#D0BFB4] text-gray-900 hover:bg-[#C1AEA1] w-full sm:w-auto">
              Subscribe
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}