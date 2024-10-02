'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function About() {
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
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2 
            className="text-4xl font-bold mb-4 font-syne text-gray-800 dark:text-white"
            variants={itemVariants}
          >
            How It Works
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 dark:text-gray-300 font-poppins max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Get your e-commerce business up and running on Solana in just three simple steps.
          </motion.p>
        </motion.div>
        <motion.div 
          className="grid md:grid-cols-3 gap-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <StepCard
            number="1"
            title="Create Your Store"
            description="Get started by setting up your store quickly and easily. Add your products and customize your brand."
          />
          <StepCard
            number="2"
            title="Share Your Links"
            description="Generate and share unique links for your store and products to reach a wider audience effortlessly."
          />
          <StepCard
            number="3"
            title="Sell & Earn"
            description="Start selling and receive instant payments through Solana, making your transactions seamless and efficient."
          />
        </motion.div>
      </div>
    </section>
  )
}

interface StepCardProps {
  number: string
  title: string
  description: string
}

function StepCard({ number, title, description }: StepCardProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { duration: 0.5, ease: "easeOut" }
        }
      }}
    >
      <Card className="bg-white dark:bg-gray-700 border border-[#E5DCD5] dark:border-gray-600 shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col">
        <CardHeader className="bg-[#F5F1EE] dark:bg-gray-600 p-6 flex-grow">
          <div className="bg-[#D0BFB4] dark:bg-[#8C7D73] rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-md">
            <span className="text-3xl font-bold text-white font-syne">{number}</span>
          </div>
          <CardTitle className="text-2xl font-bold mb-4 font-syne text-center text-gray-800 dark:text-white">{title}</CardTitle>
          <p className="text-gray-600 dark:text-gray-300 text-center font-poppins">{description}</p>
        </CardHeader>
        <CardContent className="p-6 bg-white dark:bg-gray-700">
          <motion.div 
            className="text-sm text-[#D0BFB4] dark:text-[#E5DCD5] font-inter text-center hover:underline cursor-pointer flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More
            <ArrowRight className="ml-2 h-4 w-4" />
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}