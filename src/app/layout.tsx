import './globals.css'
import { Syne, Poppins, Inter } from 'next/font/google'
import Header from '@/components/ui/layout/header'
import Footer from '@/components/ui/layout/footer'
import WalletProvider from '@/components/providers/wallet-provider'
import { ThemeProvider } from '@/components/theme-provider'
import { ErrorBoundary } from '@/components/error-boundary'
import Script from 'next/script'

const syne = Syne({ subsets: ['latin'], variable: '--font-syne' })
const poppins = Poppins({ 
  subsets: ['latin'], 
  weight: ['300', '400', '600'], 
  variable: '--font-poppins',
  display: 'swap',
})
const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter',
  display: 'swap',
})

export const metadata = {
  title: 'BARK - Revolutionize Your E-commerce with Solana',
  description: 'BARK empowers merchants with lightning-fast transactions, custom stores, and seamless social sharing on the Solana blockchain.',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  themeColor: '#F5F1EE',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.barkprotocol.com',
    site_name: 'BARK Protocol',
    images: [
      {
        url: 'https://www.barkprotocol.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'BARK Protocol',
      },
    ],
  },
  twitter: {
    handle: '@bark_protocol',
    site: '@bark_protocol',
    cardType: 'summary_large_image',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${syne.variable} ${poppins.variable} ${inter.variable}`}>
      <head>
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="bg-background text-foreground">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:p-4 focus:bg-background focus:text-foreground">
          Skip to main content
        </a>
        <ErrorBoundary>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <WalletProvider>
              <div className="flex flex-col min-h-screen">
                <Header />
                <main id="main-content" className="flex-grow">{children}</main>
                <Footer />
              </div>
            </WalletProvider>
          </ThemeProvider>
        </ErrorBoundary>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>
      </body>
    </html>
  )
}