'use client';

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

export default function CTA() {
  return (
    <section className="bg-[#F5F1EE] dark:bg-gray-800 py-20">
      <div className="container mx-auto px-4 text-center">
        <motion.h2 
          className="text-4xl sm:text-5xl font-bold mb-6 font-syne text-gray-800 dark:text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Ready to Get Started?
        </motion.h2>
        <motion.p 
          className="text-xl mb-8 max-w-2xl mx-auto font-poppins text-gray-600 dark:text-gray-300"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Join thousands of merchants already transforming their e-commerce experiences with Buy in a Blink.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button 
            size="lg" 
            className="bg-[#D0BFB4] text-gray-800 hover:bg-[#C1AEA1] transition-all duration-300 font-inter shadow-md hover:shadow-lg hover:-translate-y-1 group"
            asChild
          >
            <Link href="/create-store">
              Create Your Store Now 
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}