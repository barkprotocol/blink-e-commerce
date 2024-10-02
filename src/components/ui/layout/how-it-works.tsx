"use client";

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, ShoppingBag, Package, Wallet, Megaphone } from 'lucide-react'

const steps = [
  {
    title: 'Create Your Store',
    description: 'Fill in your store details and customize its appearance.',
    icon: ShoppingBag,
  },
  {
    title: 'Add Products',
    description: 'Upload your products with descriptions and prices.',
    icon: Package,
  },
  {
    title: 'Set Up Payments',
    description: 'Connect your Solana wallet for seamless transactions.',
    icon: Wallet,
  },
  {
    title: 'Launch and Promote',
    description: 'Publish your store and start promoting it to customers.',
    icon: Megaphone,
  },
]

const HowItWorks: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-[#F5F1EE]">
      <div className="container mx-auto px-4 space-y-12">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
            Decentralized Commerce
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get your e-commerce store up and running in just a few simple steps.
          </p>
        </motion.div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <Card className="h-full transition-shadow hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex-shrink-0 w-12 h-12 bg-[#8A7A6D] text-white rounded-full flex items-center justify-center">
                      <step.icon className="h-6 w-6" />
                    </div>
                    {index < steps.length - 1 && (
                      <ArrowRight className="h-6 w-6 text-[#8A7A6D] hidden md:block" />
                    )}
                  </div>
                  <CardTitle className="mt-4 text-xl font-semibold">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{step.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks