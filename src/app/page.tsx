import type { Metadata } from 'next'
import Hero from '@/components/ui/layout/hero'
import About from '@/components/ui/layout/about'
import Features from '@/components/ui/layout/features'
import CTA from '@/components/ui/layout/cta'
import Newsletter from '@/components/ui/layout/newsletter'

export const metadata: Metadata = {
  title: 'Blink Protocol - Revolutionize Your E-commerce with Solana',
  description: 'BARKs Blink Protocol empowers merchants with lightning-fast transactions, custom stores, and seamless social sharing on the Solana blockchain.',
  keywords: ['Solana', 'E-commerce', 'Blockchain', 'Fast transactions', 'Custom stores'],
  openGraph: {
    title: 'Buy in a Blink - Revolutionize Your E-commerce with Solana',
    description: 'Lightning-fast transactions, custom stores, and seamless social sharing on the Solana blockchain.',
    type: 'website',
    url: 'https://blinkprotocol.app',
    images: [
      {
        url: 'https://blinkprotocol.app/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Blink Protocol',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blink Protocol - Revolutionize Your E-commerce with Solana',
    description: 'Lightning-fast transactions, custom stores, and seamless social sharing on the Solana blockchain.',
    images: ['https://blinkprotocol.app/twitter-image.jpg'],
  },
}

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Hero />
      <About />
      <Features />
      <CTA />
      <Newsletter />
    </main>
  )
}