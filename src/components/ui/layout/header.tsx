'use client';

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useWallet } from '@solana/wallet-adapter-react'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = [
  { href: "/features", label: "Features" },
  { href: "/pages/products", label: "Pricing" },
  { href: "/pages/about", label: "About" },
  { href: "/faq", label: "FAQ" },
]

export default function Header() {
  const { connected } = useWallet()
  const { setVisible } = useWalletModal()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const handleWalletClick = () => {
    setVisible(true)
  }

  const renderNavItems = (mobile: boolean = false) => (
    <>
      {navItems.map((item) => (
        <NavLink key={item.href} href={item.href} onClick={mobile ? toggleMenu : undefined}>
          {item.label}
        </NavLink>
      ))}
      <Button 
        onClick={handleWalletClick}
        className="bg-[#D0BFB4] text-gray-800 hover:bg-[#C1AEA1] transition-colors duration-200 rounded-md px-4 py-2 text-sm font-medium"
      >
        Select Wallet
      </Button>
    </>
  )

  return (
    <header className="bg-[#F5F1EE] dark:bg-gray-800 shadow-md py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="https://ucarecdn.com/b065ba1f-6279-4677-ae8f-0ebc1facb68d/bark_icon.png"
              alt="BARK Icon"
              width={40}
              height={40}
              className="w-auto"
            />
            <span className="text-xl font-bold text-gray-900 dark:text-white font-syne">COMMERCE</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            {renderNavItems()}
          </nav>
          <Button 
            variant="ghost" 
            className="md:hidden text-gray-800 dark:text-white hover:bg-[#E5DCD5] dark:hover:bg-gray-700"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mt-4 bg-[#F5F1EE] dark:bg-gray-800 shadow-lg rounded-b-lg"
          >
            <nav className="flex flex-col items-center space-y-4 py-4">
              {renderNavItems(true)}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}

function NavLink({ href, children, onClick }: NavLinkProps) {
  return (
    <Link 
      href={href} 
      className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors duration-200 font-medium font-inter"
      onClick={onClick}
    >
      {children}
    </Link>
  )
}