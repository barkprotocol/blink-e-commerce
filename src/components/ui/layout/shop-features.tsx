"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ShoppingBag, CreditCard, BarChart2, Globe, Zap, Lock } from 'lucide-react'

interface Feature {
  icon: React.ReactNode
  title: string
  description: string
}

const ShopFeatures: React.FC = () => {
  const features: Feature[] = [
    {
      icon: <ShoppingBag className="h-6 w-6 text-[#8A7A6D]" />,
      title: 'Easy Store Setup',
      description: 'Create your online store in minutes with our intuitive interface and customizable templates.',
    },
    {
      icon: <CreditCard className="h-6 w-6 text-[#8A7A6D]" />,
      title: 'Secure Payments',
      description: 'Accept payments securely with built-in Solana Pay support and other popular payment methods.',
    },
    {
      icon: <BarChart2 className="h-6 w-6 text-[#8A7A6D]" />,
      title: 'Advanced Analytics',
      description: 'Gain valuable insights into your store\'s performance with detailed analytics and reports.',
    },
    {
      icon: <Globe className="h-6 w-6 text-[#8A7A6D]" />,
      title: 'Custom Domain',
      description: 'Use your own domain name to give your store a professional and branded appearance.',
    },
    {
      icon: <Zap className="h-6 w-6 text-[#8A7A6D]" />,
      title: 'Fast Performance',
      description: 'Enjoy lightning-fast load times and smooth user experience with our optimized platform.',
    },
    {
      icon: <Lock className="h-6 w-6 text-[#8A7A6D]" />,
      title: 'Secure and Reliable',
      description: 'Rest easy knowing your store is protected by top-notch security measures and regular backups.',
    },
  ]

  return (
    <section className="py-16 bg-gradient-to-b from-[#F5F1EE] to-white">
      <div className="container mx-auto px-4 space-y-12">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
            Powerful Features for Your Online Store
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to create, manage, and grow your e-commerce business with ease and confidence.
          </p>
        </motion.div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full transition-shadow hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    {feature.icon}
                    <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ShopFeatures