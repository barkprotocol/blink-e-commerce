'use client';

import React, { useState } from 'react'
import { Metadata } from 'next'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, ArrowUpDown } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Orders | Merchant Dashboard',
  description: 'Manage your store orders',
}

// Simulated order data
const orders = [
  { id: '1', customer: 'John Doe', product: 'T-Shirt', total: 25.99, status: 'Completed', date: '2023-06-01' },
  { id: '2', customer: 'Jane Smith', product: 'Jeans', total: 59.99, status: 'Processing', date: '2023-06-02' },
  { id: '3', customer: 'Bob Johnson', product: 'Sneakers', total: 89.99, status: 'Shipped', date: '2023-06-03' },
  { id: '4', customer: 'Alice Brown', product: 'Dress', total: 79.99, status: 'Pending', date: '2023-06-04' },
  { id: '5', customer: 'Charlie Wilson', product: 'Hat', total: 19.99, status: 'Completed', date: '2023-06-05' },
  { id: '6', customer: 'Eva Davis', product: 'Sunglasses', total: 39.99, status: 'Processing', date: '2023-06-06' },
  { id: '7', customer: 'Frank Miller', product: 'Watch', total: 129.99, status: 'Shipped', date: '2023-06-07' },
  { id: '8', customer: 'Grace Taylor', product: 'Backpack', total: 49.99, status: 'Pending', date: '2023-06-08' },
  { id: '9', customer: 'Henry Clark', product: 'Jacket', total: 99.99, status: 'Completed', date: '2023-06-09' },
  { id: '10', customer: 'Ivy Anderson', product: 'Scarf', total: 29.99, status: 'Processing', date: '2023-06-10' },
]

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [sortColumn, setSortColumn] = useState('date')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')
  const [currentPage, setCurrentPage] = useState(1)
  const ordersPerPage = 5

  const filteredOrders = orders.filter(order => 
    (order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
     order.product.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (statusFilter === '' || order.status === statusFilter)
  )

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1
    if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1
    return 0
  })

  const indexOfLastOrder = currentPage * ordersPerPage
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage
  const currentOrders = sortedOrders.slice(indexOfFirstOrder, indexOfLastOrder)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  const handleSort = (column: string) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(column)
      setSortDirection('asc')
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Orders</CardTitle>
        <CardDescription>Manage and view your store orders</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-2 md:space-y-0 md:space-x-2">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Statuses</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="Processing">Processing</SelectItem>
              <SelectItem value="Shipped">Shipped</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Order ID</TableHead>
                <TableHead>
                  <Button variant="ghost" onClick={() => handleSort('customer')}>
                    Customer
                    {sortColumn === 'customer' && <ArrowUpDown className="ml-2 h-4 w-4" />}
                  </Button>
                </TableHead>
                <TableHead>Product</TableHead>
                <TableHead>
                  <Button variant="ghost" onClick={() => handleSort('total')}>
                    Total
                    {sortColumn === 'total' && <ArrowUpDown className="ml-2 h-4 w-4" />}
                  </Button>
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead>
                  <Button variant="ghost" onClick={() => handleSort('date')}>
                    Date
                    {sortColumn === 'date' && <ArrowUpDown className="ml-2 h-4 w-4" />}
                  </Button>
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.product}</TableCell>
                  <TableCell>${order.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant={
                      order.status === 'Completed' ? 'default' :
                      order.status === 'Processing' ? 'secondary' :
                      order.status === 'Shipped' ? 'info' : 'warning'
                    }>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">View</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {indexOfFirstOrder + 1} to {Math.min(indexOfLastOrder, sortedOrders.length)} of {sortedOrders.length} orders
        </div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
            </PaginationItem>
            {Array.from({ length: Math.ceil(sortedOrders.length / ordersPerPage) }).map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink onClick={() => paginate(index + 1)} isActive={currentPage === index + 1}>
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(sortedOrders.length / ordersPerPage)} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </CardFooter>
    </Card>
  )
}