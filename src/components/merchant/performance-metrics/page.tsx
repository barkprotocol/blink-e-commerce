import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowUpRight, ArrowDownRight, DollarSign, ShoppingCart, Users, TrendingUp } from 'lucide-react'

const metrics = [
  { title: 'Total Revenue', value: '$12,345', change: '+15%', icon: DollarSign, trend: 'up' },
  { title: 'Orders', value: '156', change: '+8%', icon: ShoppingCart, trend: 'up' },
  { title: 'Customers', value: '1,024', change: '+12%', icon: Users, trend: 'up' },
  { title: 'Conversion Rate', value: '3.2%', change: '-2%', icon: TrendingUp, trend: 'down' },
]

export default function PerformanceMetrics() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
            <metric.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <p className={`text-xs ${metric.trend === 'up' ? 'text-green-500' : 'text-red-500'} flex items-center`}>
              {metric.trend === 'up' ? <ArrowUpRight className="mr-1 h-4 w-4" /> : <ArrowDownRight className="mr-1 h-4 w-4" />}
              {metric.change}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}