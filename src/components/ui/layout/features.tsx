'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Zap, ShoppingBag, Share2, Rocket, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

export default function Features() {
  return (
    <section className="bg-[#F5F1EE] dark:bg-gray-900 py-20">
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
            Our Features
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 dark:text-gray-300 font-poppins max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Discover the powerful tools that make Buy in a Blink the ultimate e-commerce solution on Solana.
          </motion.p>
        </motion.div>
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <FeatureCard
            icon={<Zap className="h-8 w-8 text-[#D0BFB4]" />}
            title="Lightning Fast"
            description="Enjoy transactions that happen in the blink of an eye, thanks to Solana's high-speed blockchain."
          />
          <FeatureCard
            icon={<ShoppingBag className="h-8 w-8 text-[#D0BFB4]" />}
            title="Custom Stores"
            description="Create a distinctive online presence with custom branding and product listings tailored to your business."
          />
          <FeatureCard
            icon={<Share2 className="h-8 w-8 text-[#D0BFB4]" />}
            title="Social Sharing"
            description="Increase your store's visibility with easy-to-share custom links across all your social media platforms."
          />
          <FeatureCard
            icon={<Rocket className="h-8 w-8 text-[#D0BFB4]" />}
            title="Dynamic Previews"
            description="Turn shared links into engaging, interactive previews that captivate your audience and drive sales."
          />
        </motion.div>
      </div>
    </section>
  )
}

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <motion.div variants={itemVariants}>
      <Card className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-[#E5DCD5] dark:border-gray-700 h-full flex flex-col">
        <CardHeader className="bg-[#F5F1EE] dark:bg-gray-700 p-6 flex-grow">
          <motion.div 
            className="flex items-center justify-center mb-6 bg-white dark:bg-gray-600 rounded-full w-20 h-20 mx-auto shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {icon}
          </motion.div>
          <CardTitle className="text-2xl font-bold font-syne text-gray-800 dark:text-white text-center mb-2">{title}</CardTitle>
          <CardDescription className="text-sm text-gray-600 dark:text-gray-300 font-poppins text-center">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 bg-white dark:bg-gray-800">
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