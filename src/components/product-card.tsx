'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useToast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'

interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
}

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const { toast } = useToast()

  const handleAddToCart = () => {
    onAddToCart(product)
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative h-48">
        <Image
          src={product.image}
          alt={product.name}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{product.name}</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-gray-900 dark:text-white">${product.price.toFixed(2)}</span>
          <Button
            onClick={handleAddToCart}
            className="bg-[#D0BFB4] text-gray-800 hover:bg-[#C1AEA1] transition-colors duration-300"
          >
            <ShoppingCart className="mr-2 h-4 w-4" aria-hidden="true" />
            <span className="sr-only">Add {product.name} to Cart</span>
            Add to Cart
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

export default ProductCard