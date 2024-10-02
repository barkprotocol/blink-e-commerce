import './globals.css'
import { Syne, Poppins, Inter } from 'next/font/google'
import Header from '@/components/ui/layout/header'
import Footer from '@/components/ui/layout/footer'
import WalletProvider from '@/components/providers/wallet-provider'
import { ThemeProvider } from '@/components/theme-provider'
import { ErrorBoundary } from '@/components/error-boundary'

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
  description: 'Buy in a Blink empowers merchants with lightning-fast transactions, custom stores, and seamless social sharing on the Solana blockchain.',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  themeColor: '#F5F1EE',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${syne.variable} ${poppins.variable} ${inter.variable}`}>
      <body className="bg-background text-foreground">
        <ErrorBoundary>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <WalletProvider>
              <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow">{children}</main>
                <Footer />
              </div>
            </WalletProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}