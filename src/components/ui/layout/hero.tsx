'use client';

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, ShoppingBag, Info } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-[bg-[#F5F1EE]] via-[#E5D9D0] to-[#F5F1EE]] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10">
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
          >
            Revolutionize Your E-commerce with{' '}
            <span className="text-[#8A7A6D] bg-clip-text text-transparent bg-gradient-to-r from-[#A18C7F] to-[#8A7A6D]">
              Solana
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto"
          >
            Lightning-fast transactions, custom stores, and seamless social sharing on the Solana blockchain.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4"
          >
            <Button asChild size="lg" className="bg-[#8A7A6D] text-white hover:bg-[#76685C] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              <Link href="/create-store" className="flex items-center">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Create Your Shop
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-2 border-[#8A7A6D] text-[#8A7A6D] hover:bg-[#8A7A6D] hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              <Link href="/about" className="flex items-center">
                <Info className="mr-2 h-5 w-5" />
                Learn More
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
      <div 
        className="absolute inset-0 bg-[url('/hero-pattern.svg')] opacity-15 z-0"
        style={{ backgroundSize: '100px 100px' }}
        aria-hidden="true"
      ></div>
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent z-10"></div>
    </section>
  )
}