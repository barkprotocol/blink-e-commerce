'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Store, ShoppingCart, BarChart2, Settings, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ThemeToggle } from '@/components/theme-toggle'

const navItems = [
  { href: '/merchant', label: 'Dashboard', icon: Store },
  { href: '/merchant/orders', label: 'Orders', icon: ShoppingCart },
  { href: '/merchant/analytics', label: 'Analytics', icon: BarChart2 },
  { href: '/merchant/settings', label: 'Settings', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full flex-col border-r bg-background">
      <div className="p-6">
        <h2 className="text-2xl font-semibold tracking-tight">Merchant Dashboard</h2>
      </div>
      <ScrollArea className="flex-1">
        <nav className="grid gap-1 px-2">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <span
                className={`flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                  pathname === item.href
                    ? 'bg-secondary text-secondary-foreground'
                    : 'text-muted-foreground hover:bg-secondary hover:text-secondary-foreground'
                }`}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </span>
            </Link>
          ))}
        </nav>
      </ScrollArea>
      <div className="mt-auto p-4">
        <ThemeToggle />
        <Button variant="ghost" className="w-full justify-start mt-2">
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  )
}