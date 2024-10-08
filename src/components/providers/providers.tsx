'use client';

import React from 'react'
import { ThemeProvider } from 'next-themes'
import { WalletProvider } from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets'
import { ConnectionProvider } from '@solana/wallet-adapter-react'
import { clusterApiUrl } from '@solana/web3.js'

// Import wallet adapter CSS
import '@solana/wallet-adapter-react-ui/styles.css'

const wallets = [
  new PhantomWalletAdapter(),
  new SolflareWalletAdapter(),
]

// You can also provide a custom RPC endpoint
const endpoint = clusterApiUrl('devnet') // Use 'mainnet-beta' for production

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

export default Providers