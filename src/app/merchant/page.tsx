'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { PlusCircle, RefreshCw } from 'lucide-react'
import SalesOverview from '@/components/merchant/sales-overview'
import RecentOrders from '@/components/merchant/recent-orders'
import ProductInventory from '@/components/merchant/product-inventory'
import PerformanceMetrics from '@/components/merchant/performance-metrics'

export default function MerchantDashboard() {
  const [isRefreshing, setIsRefreshing] = React.useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    // Simulating a refresh action
    setTimeout(() => {
      setIsRefreshing(false)
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Merchant Dashboard</h1>
        <div className="flex space-x-2">
          <Button onClick={handleRefresh} disabled={isRefreshing}>
            {isRefreshing ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Refreshing...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh Data
              </>
            )}
          </Button>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>
      </div>

      <PerformanceMetrics />

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Sales Overview</CardTitle>
                <CardDescription>Your store's performance at a glance</CardDescription>
              </CardHeader>
              <CardContent>
                <SalesOverview />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Latest customer purchases</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentOrders />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Product Inventory</CardTitle>
                <CardDescription>Stock levels and popular items</CardDescription>
              </CardHeader>
              <CardContent>
                <ProductInventory />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="sales">
          <Card>
            <CardHeader>
              <CardTitle>Detailed Sales Analysis</CardTitle>
              <CardDescription>In-depth look at your sales performance</CardDescription>
            </CardHeader>
            <CardContent>
              <SalesOverview detailed />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Order Management</CardTitle>
              <CardDescription>Track and manage customer orders</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentOrders showAll />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="inventory">
          <Card>
            <CardHeader>
              <CardTitle>Inventory Management</CardTitle>
              <CardDescription>Monitor and update your product stock</CardDescription>
            </CardHeader>
            <CardContent>
              <ProductInventory showAll />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}