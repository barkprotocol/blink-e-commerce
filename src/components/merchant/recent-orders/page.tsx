import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

const recentOrders = [
  { id: '1', customer: 'John Doe', product: 'T-Shirt', total: '$25.99', status: 'Completed' },
  { id: '2', customer: 'Jane Smith', product: 'Jeans', total: '$59.99', status: 'Processing' },
  { id: '3', customer: 'Bob Johnson', product: 'Sneakers', total: '$89.99', status: 'Shipped' },
  { id: '4', customer: 'Alice Brown', product: 'Dress', total: '$79.99', status: 'Pending' },
  { id: '5', customer: 'Charlie Wilson', product: 'Hat', total: '$19.99', status: 'Completed' },
]

export default function RecentOrders() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.product}</TableCell>
                <TableCell>{order.total}</TableCell>
                <TableCell>{order.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}