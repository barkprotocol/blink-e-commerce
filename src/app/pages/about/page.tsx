import React from 'react'
import { Metadata } from 'next'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'About Us | BARK Commerce',
  description: 'Learn about BARK Commerce and our mission to revolutionize e-commerce with Solana blockchain technology.',
}

export default function AboutPage() {
  return (
    <div className="bg-[#F5F1EE] dark:bg-gray-900 min-h-screen">
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center font-syne text-gray-800 dark:text-white">
          About BARK Commerce
        </h1>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <Image
              src="https://ucarecdn.com/b065ba1f-6279-4677-ae8f-0ebc1facb68d/bark_icon.png"
              alt="BARK Commerce Logo"
              width={300}
              height={300}
              className="mx-auto rounded-lg shadow-lg"
            />
          </div>
          <div>
            <p className="text-lg mb-6 font-poppins text-gray-600 dark:text-gray-300">
              BARK Commerce is at the forefront of revolutionizing e-commerce through the power of Solana blockchain technology. Our platform, "Buy in a Blink," empowers merchants with lightning-fast transactions, custom stores, and seamless social sharing capabilities.
            </p>
            <p className="text-lg mb-6 font-poppins text-gray-600 dark:text-gray-300">
              Founded in 2024, our mission is to make online selling and buying as easy and secure as possible, leveraging the speed and efficiency of the Solana network.
            </p>
            <Button 
              className="bg-[#D0BFB4] text-gray-800 hover:bg-[#C1AEA1] transition-colors duration-300 font-inter"
            >
              Learn More About Solana
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}