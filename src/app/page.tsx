import type { Metadata } from 'next'
import About from '@/components/ui/layout/about'
import Features from '@/components/ui/layout/features'
import CTA from '@/components/ui/layout/cta'
import Newsletter from '@/components/ui/layout/newsletter'

export const metadata: Metadata = {
  title: 'BARK Protocol - Revolutionize Your E-commerce with Solana',
  description: 'BARK Protocol empowers merchants with lightning-fast transactions, custom stores, and seamless social sharing on the Solana blockchain.',
  keywords: ['Solana', 'E-commerce', 'Blockchain', 'Fast transactions', 'Custom stores'],
  openGraph: {
    title: 'Buy in a Blink - Revolutionize Your E-commerce with Solana',
    description: 'Lightning-fast transactions, custom stores, and seamless social sharing on the Solana blockchain.',
    type: 'website',
    url: 'https://barkprotocol.app',
    images: [
      {
        url: 'https://brkkprotocol.app/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'BARK Protocol',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BARK Protocol - Revolutionize Your E-commerce with Solana',
    description: 'Lightning-fast transactions, custom stores, and seamless social sharing on the Solana blockchain.',
    images: ['https://barkprotocol.app/twitter-image.jpg'],
  },
  robots: 'index, follow',
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#F5F1EE',
}

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <About />
      <Features />
      <CTA />
      <Newsletter />
    </main>
  )
}