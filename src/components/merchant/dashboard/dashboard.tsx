'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { PlusCircle, RefreshCw } from 'lucide-react'
import SalesChart from './sales-chart'
import RecentOrders from './recent-orders'
import ProductInventory from './product-inventory'
import PerformanceMetrics from './performance-metrics'

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
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Merchant Dashboard</h1>
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
              </CardHeader>
              <CardContent>
                <SalesChart />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <RecentOrders />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Product Inventory</CardTitle>
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
            </CardHeader>
            <CardContent>
              <SalesChart />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Order Management</CardTitle>
            </CardHeader>
            <CardContent>
              <RecentOrders />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="inventory">
          <Card>
            <CardHeader>
              <CardTitle>Inventory Management</CardTitle>
            </CardHeader>
            <CardContent>
              <ProductInventory />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}