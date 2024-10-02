import React, { Suspense } from 'react'
import { Metadata } from 'next'
import ProductList from '@/components/product-list'
import ProductFilters from '@/components/product-filters'
import ProductSort from '@/components/product-sort'
import { ErrorBoundary } from 'react-error-boundary'
import { motion } from 'framer-motion'

export const metadata: Metadata = {
  title: 'Products | BARK Commerce',
  description: 'Explore our wide range of products available on BARK Commerce.',
}

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert" className="text-center py-4">
      <p className="text-red-500">Something went wrong:</p>
      <pre className="text-sm text-red-400">{error.message}</pre>
      <button
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={resetErrorBoundary}
      >
        Try again
      </button>
    </div>
  )
}

function LoadingFallback() {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  )
}

export default function ProductsPage() {
  return (
    <div className="bg-[#F5F1EE] dark:bg-gray-900 min-h-screen">
      <main className="container mx-auto px-4 py-16">
        <motion.h1 
          className="text-4xl md:text-5xl font-bold mb-8 text-center font-syne text-gray-800 dark:text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Our Products
        </motion.h1>
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="md:w-1/4">
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <Suspense fallback={<LoadingFallback />}>
                <ProductFilters />
              </Suspense>
            </ErrorBoundary>
          </aside>
          <div className="md:w-3/4">
            <div className="mb-6">
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Suspense fallback={<LoadingFallback />}>
                  <ProductSort />
                </Suspense>
              </ErrorBoundary>
            </div>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <Suspense fallback={<LoadingFallback />}>
                <ProductList />
              </Suspense>
            </ErrorBoundary>
          </div>
        </div>
      </main>
    </div>
  )
}