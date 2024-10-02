'use client'

import React, { Suspense, useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Image from 'next/image'
import { Loader2, Store, Zap, HelpCircle, CreditCard } from 'lucide-react'
import { useInView } from 'react-intersection-observer'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const CreateStore = dynamic(() => import('@/components/create-store'), {
  loading: () => <Loader2 className="h-8 w-8 animate-spin" />,
})
const SubscriptionPlans = dynamic(() => import('@/components/ui/layout/subscription-plans'), {
  loading: () => <Loader2 className="h-8 w-8 animate-spin" />,
})
const Features = dynamic(() => import('@/components/ui/layout/shop-features'), {
  loading: () => <Loader2 className="h-8 w-8 animate-spin" />,
})
const HowItWorks = dynamic(() => import('@/components/ui/layout/how-it-works'), {
  loading: () => <Loader2 className="h-8 w-8 animate-spin" />,
})

export default function CreateStoreContent() {
  const [activeSection, setActiveSection] = useState<string | null>(null)

  const sections = [
    { id: "store-creation", label: "Store Creation", icon: <Store className="w-4 h-4" /> },
    { id: "features", label: "Features", icon: <Zap className="w-4 h-4" /> },
    { id: "how-it-works", label: "How It Works", icon: <HelpCircle className="w-4 h-4" /> },
    { id: "subscription-plans", label: "Subscription Plans", icon: <CreditCard className="w-4 h-4" /> },
  ]

  const handleIntersection = (inView: boolean, entry: IntersectionObserverEntry) => {
    if (inView) {
      setActiveSection(entry.target.id)
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.5 }
    )

    sections.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-[#F5F1EE] dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center mb-4 sm:mb-0">
            <Image
              src="https://ucarecdn.com/f242e5dc-8813-47b4-af80-6e6dd43945a9/barkicon.png"
              alt="BARK E-Commerce Logo"
              width={40}
              height={40}
              className="mr-2"
            />
            <h1 className="text-3xl font-semibold text-gray-800 dark:text-white">Create Your Store</h1>
          </div>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link href="/" className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors">
                  Go to Main
                </Link>
              </li>
              <li>
                <Link href="/merchant/dashboard" className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors">
                  Merchant Dashboard
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <nav className="mb-8 overflow-x-auto sticky top-20 bg-[#F5F1EE] dark:bg-gray-900 z-10 py-4" aria-label="Page sections">
          <ul className="flex flex-nowrap justify-start sm:justify-center space-x-4 min-w-max">
            {sections.map(({ id, label, icon }) => (
              <li key={id}>
                <Link 
                  href={`#${id}`}
                  className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md shadow-sm transition-colors
                    ${activeSection === id 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
                    }
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                >
                  {icon}
                  <span className="ml-2">{label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {sections.map(({ id, label }) => {
          const [ref, inView] = useInView({
            threshold: 0.5,
            onChange: (inView, entry) => handleIntersection(inView, entry),
          })

          return (
            <section key={id} id={id} ref={ref} className="mb-12 scroll-mt-40">
              <div className="flex flex-col items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">{label}</h2>
                <Badge variant={activeSection === id ? "default" : "secondary"}>
                  {activeSection === id ? "Active" : "Inactive"}
                </Badge>
              </div>
              <Suspense fallback={<div className="flex justify-center items-center h-64"><Loader2 className="h-8 w-8 animate-spin" /></div>}>
                {id === "store-creation" && <CreateStore />}
                {id === "features" && (
                  <div className="text-center">
                    <Features />
                  </div>
                )}
                {id === "how-it-works" && <HowItWorks />}
                {id === "subscription-plans" && <SubscriptionPlans />}
              </Suspense>
            </section>
          )
        })}
      </main>

      <footer className="bg-white dark:bg-gray-800 shadow-md mt-12">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-gray-600 dark:text-gray-300">© {new Date().getFullYear()} BARK Protocol. All rights reserved.</p>
          <div className="mt-4 flex flex-wrap justify-center space-x-4">
            <Button asChild variant="link">
              <Link href="/pages/terms">Terms of Service</Link>
            </Button>
            <Button asChild variant="link">
              <Link href="/pages/privacy">Privacy Policy</Link>
            </Button>
            <Button asChild variant="link">
              <Link href="/pages/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </footer>
    </div>
  )
}