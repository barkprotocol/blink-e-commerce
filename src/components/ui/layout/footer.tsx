'use client';

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Twitter, Instagram, Github, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
}

export default function Footer() {
  return (
    <footer className="bg-[#F5F1EE] to-white dark:from-gray-900 dark:to-gray-800 border-t border-[#E5DCD5] dark:border-gray-700 py-12">
      <motion.div 
        className="container mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="text-center mb-8"
          variants={itemVariants}
        >
          <Image
            src="https://ucarecdn.com/0c2a1b21-f836-4343-9d35-19386c7f7f4d/barkprotocoldark.svg"
            alt="BARK Logo"
            width={150}
            height={48}
            className="mx-auto mb-4"
          />
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            Revolutionizing e-commerce with decentralized solutions on the Solana blockchain.
          </p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center mb-8">
          <FooterColumn title="Quick Links" links={[
            { href: "/", label: "Home" },
            { href: "/features", label: "Features" },
            { href: "/pages/services", label: "Services" },
            { href: "/pages/about", label: "Contact" },
          ]} />
          <FooterColumn title="Legal" links={[
            { href: "/pages/terms", label: "Terms of Service" },
            { href: "/pages/privacy", label: "Privacy Policy" },
            { href: "/pages/cookies", label: "Cookie Policy" },
          ]} />
          <FooterColumn title="Community" links={[
            { href: "https://twitter.com/bark_protocol", label: "Twitter", icon: <Twitter size={16} /> },
            { href: "https://medium.com/@barkprotocol", label: "Medium", icon: <ExternalLink size={16} /> },
            { href: "https://instagram.com/bark.protocol", label: "Instagram", icon: <Instagram size={16} /> },
          ]} />
          <FooterColumn title="Support" links={[
            { href: "/faq", label: "FAQ" },
            { href: "/support", label: "Help Center" },
            { href: "https://github.com/barkprotocol", label: "Developers", icon: <Github size={16} /> },
          ]} />
        </div>
        <motion.div 
          className="text-center text-sm text-gray-600 dark:text-gray-400 font-inter"
          variants={itemVariants}
        >
          <p className="mb-4">© {new Date().getFullYear()} BARK Protocol. All rights reserved.</p>
          <div className="flex justify-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="https://twitter.com/bark_protocol">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="https://instagram.com/bark.protocol">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="https://github.com/barkprotocol">
                <Github size={20} />
                <span className="sr-only">GitHub</span>
              </Link>
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  )
}

interface FooterLink {
  href: string
  label: string
  icon?: React.ReactNode
}

interface FooterColumnProps {
  title: string
  links: FooterLink[]
}

function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <motion.div variants={itemVariants}>
      <h3 className="font-semibold mb-4 font-syne text-lg text-gray-800 dark:text-white">{title}</h3>
      <ul className="space-y-2 text-sm">
        {links.map((link, index) => (
          <li key={index}>
            <Link 
              href={link.href} 
              className="text-gray-600 hover:text-[#8A7A6D] dark:text-gray-400 dark:hover:text-[#E5DCD5] transition-colors duration-200 font-poppins flex items-center justify-center"
            >
              {link.icon && <span className="mr-2">{link.icon}</span>}
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}