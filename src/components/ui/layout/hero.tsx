'use client';

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, ShoppingBag, Info } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative bg-[#F5F1EE] overflow-hidden py-24 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1E1E1E] mb-6 font-syne"
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
            className="text-xl md:text-2xl text-[#1E1E1E] mb-8 max-w-3xl mx-auto font-poppins"
          >
            Lightning-fast transactions, custom stores, and seamless social sharing on the Solana blockchain.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4"
          >
            <Button asChild size="lg" className="bg-[#8A7A6D] text-white hover:bg-[#76685C] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-poppins">
              <Link href="/create-store" className="flex items-center">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Create Your Shop
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-2 border-[#8A7A6D] text-[#8A7A6D] hover:bg-[#8A7A6D] hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-poppins">
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
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#F5F1EE] to-transparent z-10"></div>
    </section>
  )
}