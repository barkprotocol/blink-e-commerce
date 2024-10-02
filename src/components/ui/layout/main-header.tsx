'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu, Search, ShoppingCart, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Shop', href: '/shop' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

export function MainHeader() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const pathname = usePathname()
  const { connected } = useWallet()

  return (
    <header className="bg-gradient-to-r from-[#F5F1EE] to-[#E5D9D0] shadow-sm">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex w-full items-center justify-between border-b border-[#D0BFB4] py-6 lg:border-none">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="sr-only">COMMERCE</span>
              <Image
                src="https://ucarecdn.com/f242e5dc-8813-47b4-af80-6e6dd43945a9/barkicon.png"
                alt="BARK Platform Logo"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
              <span className="ml-2 text-xl font-bold text-gray-900">BARK</span>
            </Link>
            <div className="ml-10 hidden space-x-8 lg:block">
              {navigation.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "text-base font-medium text-gray-800 hover:text-[#8A7A6D] transition-colors duration-200 relative",
                    pathname === link.href && "font-semibold"
                  )}
                >
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
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search"
              className="hover:bg-[#D0BFB4] transition-colors duration-200"
            >
              <Search className="h-5 w-5 text-gray-800" />
            </Button>
            <Link href="/cart">
              <Button 
                variant="ghost" 
                size="icon" 
                aria-label="Shopping Cart"
                className="hover:bg-[#D0BFB4] transition-colors duration-200"
              >
                <ShoppingCart className="h-5 w-5 text-gray-800" />
              </Button>
            </Link>
            <WalletMultiButton className="!bg-[#8A7A6D] !text-white hover:!bg-[#76685C] !transition-colors !duration-300 !rounded-md !px-4 !py-2 !text-sm !font-medium" />
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-x-6 py-4 lg:hidden">
          {navigation.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-base font-medium text-gray-800 hover:text-[#8A7A6D] transition-colors duration-200"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </nav>
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-white rounded-lg shadow-xl p-6">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 rounded-full border-2 border-[#D0BFB4] focus:border-[#8A7A6D] focus:ring-[#8A7A6D]"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4"
              onClick={() => setIsSearchOpen(false)}
              aria-label="Close search"
            >
              <X className="h-6 w-6 text-gray-800" />
            </Button>
          </div>
        </div>
      )}
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
                className="text-lg font-medium text-gray-800 hover:text-[#8A7A6D] transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  )
}