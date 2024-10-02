'use client';

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Zap, ShoppingBag, Share2 } from 'lucide-react'

const features = [
  {
    icon: Zap,
    title: 'Lightning-Fast Transactions',
    description: 'Experience the speed of Solana with near-instant transactions and minimal fees.',
  },
  {
    icon: ShoppingBag,
    title: 'Custom Stores',
    description: 'Create and customize your own e-commerce store with ease, tailored to your brand.',
  },
  {
    icon: Share2,
    title: 'Social Sharing',
    description: 'Seamlessly share your products and store across social media platforms.',
  },
]

export default function About() {
  return (
    <section className="bg-[#F5F1EE] py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose BARK Protocol?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            BARK Protocol combines the power of Solana blockchain with user-friendly e-commerce solutions.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-[#F5F1EE] rounded-full flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-[#C1AEA1]" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}