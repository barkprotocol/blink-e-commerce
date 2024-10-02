import React from 'react'
import { Metadata } from 'next'
import ProductList from '@/components/product-list'
import ProductFilters from '@/components/product-filters'
import ProductSort from '@/components/product-sort'

export const metadata: Metadata = {
  title: 'Products | BARK Commerce',
  description: 'Explore our wide range of products available on BARK Commerce.',
}

export default function ProductsPage() {
  return (
    <div className="bg-[#F5F1EE] dark:bg-gray-900 min-h-screen">
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center font-syne text-gray-800 dark:text-white">
          Our Products
        </h1>
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="md:w-1/4">
            <ProductFilters />
          </aside>
          <div className="md:w-3/4">
            <div className="mb-6">
              <ProductSort />
            </div>
            <ProductList />
          </div>
        </div>
      </main>
    </div>
  )
}