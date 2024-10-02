import React from 'react'
import { Metadata } from 'next'
import { Sidebar } from '@/components/merchant/sidebar'

export const metadata: Metadata = {
  title: 'Merchant Dashboard | BARK E-Commerce',
  description: 'Manage your store, products, and orders',
}

export default function MerchantLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}