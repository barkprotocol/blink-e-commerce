import React from 'react'
import { Metadata } from 'next'
import DashboardLayout from '@/components/merchant/dashboard-layout'
import SalesChart from '@/components/merchant/analytics/sales-chart'
import TopProducts from '@/components/merchant/analytics/top-products'
import CustomerAcquisition from '@/components/merchant/analytics/customer-acquisition'
import ConversionRate from '@/components/merchant/analytics/conversion-rate'

export const metadata: Metadata = {
  title: 'Analytics | Merchant Dashboard',
  description: 'View your store\'s performance metrics and analytics.',
}

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Analytics</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <SalesChart />
        <TopProducts />
        <CustomerAcquisition />
        <ConversionRate />
      </div>
    </DashboardLayout>
  )
}