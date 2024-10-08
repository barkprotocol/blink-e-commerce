import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const products = [
  {
    name: 'Basic Store',
    description: 'Perfect for small businesses just starting out.',
    price: '0.1 SOL/month',
    features: ['Custom domain', 'Up to 100 products', 'Basic analytics'],
  },
  {
    name: 'Pro Store',
    description: 'Ideal for growing businesses with more needs.',
    price: '0.5 SOL/month',
    features: ['Everything in Basic', 'Up to 1000 products', 'Advanced analytics', 'Priority support'],
  },
  {
    name: 'Enterprise Store',
    description: 'For large businesses with complex requirements.',
    price: 'Custom pricing',
    features: ['Everything in Pro', 'Unlimited products', 'Custom integrations', 'Dedicated account manager'],
  },
  {
    name: 'Marketplace',
    description: 'Create your own multi-vendor marketplace.',
    price: '1 SOL/month',
    features: ['Host multiple vendors', 'Revenue sharing', 'Advanced seller management'],
  },
  {
    name: 'NFT Store',
    description: 'Sell digital assets and NFTs with ease.',
    price: '0.3 SOL/month',
    features: ['NFT minting', 'Auction functionality', 'Royalty management'],
  },
  {
    name: 'Social Commerce',
    description: 'Integrate your store with social media platforms.',
    price: '0.2 SOL/month',
    features: ['Social media integration', 'Influencer collaboration tools', 'Shoppable posts'],
  },
]

export default function Products() {
  return (
    <section className="bg-white py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center mb-12 font-syne text-[#1E1E1E]"
        >
          Our Products
        </motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <CardTitle className="font-syne text-[#1E1E1E]">{product.name}</CardTitle>
                  <CardDescription className="font-poppins">{product.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-2xl font-bold mb-4 font-syne  text-[#8A7A6D]">{product.price}</p>
                  <ul className="list-disc list-inside space-y-2 font-poppins">
                    {product.features.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-[#8A7A6D] text-white hover:bg-[#76685C] transition-all duration-300 font-poppins">
                    Get Started
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}