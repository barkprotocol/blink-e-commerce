"use client";

import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { 
  BarChart, 
  DollarSign, 
  ShoppingBag, 
  Users, 
  TrendingUp, 
  Package, 
  AlertCircle 
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'

export const metadata: Metadata = {
  title: 'Merchant Dashboard | BARK Commerce',
  description: 'View your store performance and manage your e-commerce business.',
}

interface DashboardCard {
  title: string
  value: string
  icon: React.ReactNode
  description: string
}

interface RecentOrder {
  id: string
  customer: string
  product: string
  date: string
  status: 'completed' | 'processing' | 'shipped'
  amount: string
}

const dashboardCards: DashboardCard[] = [
  {
    title: 'Total Revenue',
    value: '$12,345',
    icon: <DollarSign className="h-4 w-4 text-muted-foreground" />,
    description: '+20.1% from last month'
  },
  {
    title: 'Orders',
    value: '345',
    icon: <ShoppingBag className="h-4 w-4 text-muted-foreground" />,
    description: '+12.5% from last month'
  },
  {
    title: 'Customers',
    value: '1,234',
    icon: <Users className="h-4 w-4 text-muted-foreground" />,
    description: '+8.3% from last month'
  },
  {
    title: 'Conversion Rate',
    value: '3.2%',
    icon: <TrendingUp className="h-4 w-4 text-muted-foreground" />,
    description: '+1.2% from last month'
  },
]

const recentOrders: RecentOrder[] = [
  { id: '1234', customer: 'John Doe', product: 'Product A', date: '2023-05-01', status: 'completed', amount: '$99.99' },
  { id: '1235', customer: 'Jane Smith', product: 'Product B', date: '2023-05-02', status: 'processing', amount: '$149.99' },
  { id: '1236', customer: 'Bob Johnson', product: 'Product C', date: '2023-05-03', status: 'shipped', amount: '$79.99' },
  { id: '1237', customer: 'Alice Brown', product: 'Product D', date: '2023-05-04', status: 'completed', amount: '$199.99' },
  { id: '1238', customer: 'Charlie Wilson', product: 'Product E', date: '2023-05-05', status: 'processing', amount: '$129.99' },
]

export default function MerchantDashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Button>Download Report</Button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {dashboardCards.map((card, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {card.title}
              </CardTitle>
              {card.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground">
                {card.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <BarChart className="h-[350px] w-full" />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Order</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        order.status === 'completed' 
                          ? 'bg-green-100 text-green-800' 
                          : order.status === 'processing'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {order.status === 'completed' && <Package className="mr-1 h-3 w-3" />}
                        {order.status === 'processing' && <AlertCircle className="mr-1 h-3 w-3" />}
                        {order.status === 'shipped' && <TrendingUp className="mr-1 h-3 w-3" />}
                        {order.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">{order.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Button asChild variant="outline" className="w-full">
            <Link href="/pages/add-product">Add New Product</Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/pages/manage-orders">Manage Orders</Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/pages/update-inventory">Update Inventory</Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/pages/view-analytics">View Detailed Analytics</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}