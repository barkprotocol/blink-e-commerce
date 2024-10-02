'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
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
      transition: { duration: 0.8, ease: "easeOut" }
    }
  }

  return (
    <section className="relative overflow-hidden bg-[#F5F1EE] dark:bg-gray-900 py-20 sm:py-32">
      <div className="container mx-auto px-4">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="text-center lg:text-left">
            <motion.h1 
              className="text-4xl sm:text-5xl font-bold mb-6 font-syne text-gray-800 dark:text-white"
              variants={itemVariants}
            >
              Revolutionize Your E-commerce with Solana
            </motion.h1>
            <motion.p 
              className="text-xl mb-8 max-w-2xl mx-auto lg:mx-0 font-poppins text-gray-600 dark:text-gray-300"
              variants={itemVariants}
            >
              Buy in a Blink empowers merchants with lightning-fast transactions, custom stores, and seamless social sharing on the Solana blockchain.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4"
              variants={itemVariants}
            >
              <Button 
                size="lg" 
                className="bg-[#D0BFB4] text-gray-800 hover:bg-[#C1AEA1] transition-all duration-300 font-inter transform hover:scale-105"
                asChild
              >
                <Link href="/pages/create-store/">Create Your Store</Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-[#D0BFB4] text-gray-800 hover:bg-[#F5F1EE] dark:border-[#A69589] dark:text-[#D0BFB4] dark:hover:bg-gray-800 transition-all duration-300 font-inter transform hover:scale-105"
                asChild
              >
                <Link href="/pages/products">Explore Products</Link>
              </Button>
            </motion.div>
          </div>
          <motion.div
            variants={itemVariants}
            className="relative h-[400px] sm:h-[500px] rounded-lg overflow-hidden shadow-2xl"
          >
            <Image
              src="https://ucarecdn.com/750e9f1b-edfc-4ac8-a5b4-3286c7de98d6/barkmascottrasparentbg.png"
              alt="BARK mascot representing our e-commerce platform"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
              className="rounded-lg object-contain"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#D0BFB4]/20 to-gray-400/20 mix-blend-multiply" />
          </motion.div>
        </motion.div>
      </div>
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0" aria-hidden="true">
        <motion.div 
          className="absolute -top-1/2 -left-1/4 w-1/2 h-1/2 bg-[#E5DCD5] dark:bg-[#8C7D73] rounded-full opacity-20 blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div 
          className="absolute -bottom-1/2 -right-1/4 w-1/2 h-1/2 bg-gray-200 dark:bg-gray-700 rounded-full opacity-20 blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </section>
  )
}