'use client'

import React from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'
import { Button } from '@/components/ui/button'
import { Loader2, Wallet } from 'lucide-react'

interface WalletButtonProps {
  className?: string
}

const WalletButton: React.FC<WalletButtonProps> = ({ className = '' }) => {
  const { publicKey, connecting, connected, disconnecting } = useWallet()
  const { setVisible } = useWalletModal()

  const handleClick = () => {
    if (connected) {
      // If connected, we'll show the modal which has a disconnect option
      setVisible(true)
    } else {
      // If not connected, we'll open the connect modal
      setVisible(true)
    }
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
      className={`bg-[#D0BFB4] text-gray-800 hover:bg-[#C1AEA1] transition-colors duration-300 font-inter flex items-center justify-center ${className}`}
      disabled={connecting || disconnecting}
    >
      {connecting || disconnecting ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Wallet className="mr-2 h-4 w-4" />
      )}
      {getButtonText()}
    </Button>
  )
}

export default WalletButton