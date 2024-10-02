'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu, Store, Package, Settings, HelpCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Dashboard', href: '/merchant/dashboard', icon: Store },
  { name: 'Products', href: '/merchant/products', icon: Package },
  { name: 'Settings', href: '/merchant/settings', icon: Settings },
]

export function ShopHeader() {
  const pathname = usePathname()
  const { connected } = useWallet()

  return (
    <header className="bg-gradient-to-r from-[#F5F1EE] to-[#E5D9D0] shadow-sm">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex w-full items-center justify-between border-b border-[#D0BFB4] py-6 lg:border-none">
          <div className="flex items-center">
            <Link href="/merchant/dashboard" className="flex items-center">
              <span className="sr-only">Merchant Dashboard</span>
              <Image
                src="https://ucarecdn.com/f242e5dc-8813-47b4-af80-6e6dd43945a9/barkicon.png"
                alt="Merchant Logo"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
              <span className="ml-2 text-xl font-bold text-gray-900">Merchant</span>
            </Link>
            <div className="ml-10 hidden space-x-8 lg:block">
              {navigation.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "text-base font-medium text-gray-800 hover:text-[#8A7A6D] relative inline-flex items-center transition-colors duration-200",
                    pathname === link.href && "font-semibold"
                  )}
                >
                  <link.icon className="h-5 w-5 mr-2" />
                  {link.name}
                  {pathname === link.href && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#8A7A6D]"
                      layoutId="underline"
                    />
                  )}
                </Link>
              ))}
            </div>
          </div>
          <div className="ml-10 space-x-4 flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              aria-label="Help"
              className="hover:bg-[#D0BFB4] transition-colors duration-200"
            >
              <HelpCircle className="h-5 w-5 text-gray-800" />
            </Button>
            <WalletMultiButton className="!bg-[#8A7A6D] !text-white hover:!bg-[#76685C] !transition-colors !duration-300 !rounded-md !px-4 !py-2 !text-sm !font-medium" />
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-x-6 py-4 lg:hidden">
          {navigation.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-base font-medium text-gray-800 hover:text-[#8A7A6D] inline-flex items-center transition-colors duration-200"
            >
              <link.icon className="h-5 w-5 mr-2" />
              {link.name}
            </Link>
          ))}
        </div>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            className="lg:hidden absolute top-4 right-4"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6 text-gray-800" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] sm:w-[400px]">
          <nav className="flex flex-col gap-4 mt-8">
            {navigation.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-lg font-medium text-gray-800 hover:text-[#8A7A6D] inline-flex items-center transition-colors duration-200"
              >
                <link.icon className="h-6 w-6 mr-3" />
                {link.name}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  )
}