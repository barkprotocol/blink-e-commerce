'use client'

import React from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'
import { Wallet } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface WalletButtonProps {
  className?: string
}

const WalletButton: React.FC<WalletButtonProps> = ({ className = '' }) => {
  const { publicKey, connecting, connected, disconnecting } = useWallet()
  const { setVisible } = useWalletModal()

  const handleClick = () => {
    setVisible(true)
  }

  const getButtonText = () => {
    if (connecting) return 'Connecting...'
    if (disconnecting) return 'Disconnecting...'
    if (connected) return `${publicKey!.toBase58().slice(0, 4)}...${publicKey!.toBase58().slice(-4)}`
    return 'Connect Wallet'
  }

  return (
    <Button
      onClick={handleClick}
      className={`bg-background hover:bg-muted text-foreground rounded-md px-6 py-2 text-sm font-medium transition-all duration-300 border border-input hover:border-accent flex items-center ${className}`}
      disabled={connecting || disconnecting}
    >
      <Wallet className="mr-2 h-4 w-4" />
      {getButtonText()}
    </Button>
  )
}

export default WalletButton