'use client';

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { CheckCircle } from 'lucide-react'

const features = [
  'Solana-powered transactions',
  'Custom store builder',
  'Social media integration',
  'Analytics dashboard',
  'Multi-currency support',
  'Mobile-optimized stores',
]

export default function Features() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <div className="mb-12 lg:mb-0">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
            >
              Powerful Features for Modern E-commerce
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-600 mb-8"
            >
              Blink Protocol offers a comprehensive suite of features designed to elevate your online business.
            </motion.p>
            <motion.ul 
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {features.map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <CheckCircle className="h-6 w-6 text-[#8A7A6D] flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
          <div className="mt-10 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <Image
                src="https://ucarecdn.com/0e6bcb9f-f4a7-4745-b3ac-4ae2f8a034c6/barkswaphoodiewhite.png"
                alt="Blink Protocol Features"
                width={600}
                height={400}
                className="rounded-lg shadow-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#8A7A6D] to-transparent opacity-20 rounded-lg"></div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}