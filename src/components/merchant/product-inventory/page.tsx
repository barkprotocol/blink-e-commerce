import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

const inventoryItems = [
  { id: '1', name: 'T-Shirt', sku: 'TS-001', quantity: 100, price: '$25.99' },
  { id: '2', name: 'Jeans', sku: 'JN-001', quantity: 50, price: '$59.99' },
  { id: '3', name: 'Sneakers', sku: 'SN-001', quantity: 30, price: '$89.99' },
  { id: '4', name: 'Dress', sku: 'DR-001', quantity: 25, price: '$79.99' },
  { id: '5', name: 'Hat', sku: 'HT-001', quantity: 75, price: '$19.99' },
]

export default function ProductInventory() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Inventory</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inventoryItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.sku}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}