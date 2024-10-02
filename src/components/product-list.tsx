'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useToast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Loader2, ShoppingCart } from 'lucide-react'

interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // In a real application, this would be an API call
        const response = await fetch('/api/products')
        if (!response.ok) {
          throw new Error('Failed to fetch products')
        }
        const data = await response.json()
        setProducts(data)
      } catch (err) {
        setError('Failed to load products. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const handleAddToCart = (product: Product) => {
    // In a real application, this would add the product to the cart
    console.log(`Adding ${product.name} to cart`)
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    )
  }

  if (error) {
    return (
      <div role="alert" className="text-center py-4 text-red-500">
        {error}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <motion.div
          key={product.id}
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
            <p className="text-gray-600 dark:text-gray-300 mb-4">{product.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-gray-900 dark:text-white">${product.price.toFixed(2)}</span>
              <Button
                onClick={() => handleAddToCart(product)}
                className="bg-[#D0BFB4] text-gray-800 hover:bg-[#C1AEA1] transition-colors duration-300"
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default ProductList