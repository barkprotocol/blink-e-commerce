import React from 'react'
import { Metadata } from 'next'
import DashboardLayout from '@/components/merchant/dashboard-layout'
import SalesOverview from '@/components/merchant/sales-overview'
import RecentOrders from '@/components/merchant/recent-orders'
import ProductInventory from '@/components/merchant/product-inventory'
import PerformanceMetrics from '@/components/merchant/performance-metrics'

export const metadata: Metadata = {
  title: 'Merchant Dashboard | Your E-Commerce Platform',
  description: 'Manage your store, view sales, and track inventory.',
}

export default function MerchantDashboardPage() {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <SalesOverview />
        <PerformanceMetrics />
        <RecentOrders />
        <ProductInventory />
      </div>
    </DashboardLayout>
  )
}