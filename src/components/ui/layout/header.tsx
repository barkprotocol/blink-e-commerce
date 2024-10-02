'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, PlusCircle } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet'
import { ThemeToggle } from '@/components/theme-toggle'
import WalletButton from '@/components/ui/wallet-button'

const logoUrl = "https://ucarecdn.com/f242e5dc-8813-47b4-af80-6e6dd43945a9/barkicon.png"

const MainHeader = () => {
  return (
    <header className="bg-background border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Image src={logoUrl} alt="BARK COMMERCE Logo" width={32} height={32} />
          <div className="flex items-baseline">
            <span className="text-2xl font-bold text-primary font-syne">BARK</span>
            <span className="text-2xl font-light text-muted-foreground ml-1 font-syne">COMMERCE</span>
          </div>
        </Link>
        <nav className="hidden md:flex space-x-6 absolute left-1/2 transform -translate-x-1/2">
          <Link href="/" className="text-foreground hover:text-primary transition-colors duration-200">
            Home
          </Link>
          <Link href="/pages/shop" className="text-foreground hover:text-primary transition-colors duration-200">
            Shop
          </Link>
          <Link href="/about" className="text-foreground hover:text-primary transition-colors duration-200">
            About
          </Link>
          <Link href="/contact" className="text-foreground hover:text-primary transition-colors duration-200">
            Contact
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" className="hidden md:flex items-center">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Store
          </Button>
          <WalletButton />
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col space-y-4">
                <Link href="/" className="text-foreground hover:text-primary transition-colors duration-200">
                  Home
                </Link>
                <Link href="/pages/shop" className="text-foreground hover:text-primary transition-colors duration-200">
                  Shop
                </Link>
                <Link href="/about" className="text-foreground hover:text-primary transition-colors duration-200">
                  About
                </Link>
                <Link href="/contact" className="text-foreground hover:text-primary transition-colors duration-200">
                  Contact
                </Link>
                <Button variant="outline" size="sm" className="flex items-center justify-center">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create Store
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

const ShopHeader = () => {
  return (
    <header className="bg-background border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/merchant/dashboard" className="flex items-center space-x-2">
          <Image src={logoUrl} alt="BARK COMMERCE Merchant Dashboard Logo" width={32} height={32} />
          <div className="flex items-baseline">
            <span className="text-2xl font-bold text-primary font-syne">BARK</span>
            <span className="text-2xl font-light text-muted-foreground ml-1 font-syne">COMMERCE</span>
          </div>
        </Link>
        <nav className="hidden md:flex space-x-6 absolute left-1/2 transform -translate-x-1/2">
          <Link href="/merchant/products" className="text-foreground hover:text-primary transition-colors duration-200">
            Products
          </Link>
          <Link href="/merchant/orders" className="text-foreground hover:text-primary transition-colors duration-200">
            Orders
          </Link>
          <Link href="/merchant/analytics" className="text-foreground hover:text-primary transition-colors duration-200">
            Analytics
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" className="hidden md:flex items-center">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Product
          </Button>
          <WalletButton />
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col space-y-4">
                <Link href="/merchant/products" className="text-foreground hover:text-primary transition-colors duration-200">
                  Products
                </Link>
                <Link href="/merchant/orders" className="text-foreground hover:text-primary transition-colors duration-200">
                  Orders
                </Link>
                <Link href="/merchant/analytics" className="text-foreground hover:text-primary transition-colors duration-200">
                  Analytics
                </Link>
                <Button variant="outline" size="sm" className="flex items-center justify-center">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Product
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

export default function Header() {
  const pathname = usePathname()
  const isCreateShop = pathname === '/create-shop'

  return (
    <>
      {isCreateShop ? <ShopHeader /> : <MainHeader />}
    </>
  )
}