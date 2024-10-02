'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'
import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { Loader2, Wallet } from 'lucide-react'

const SolanaWalletConnector: React.FC = () => {
  const { publicKey, signTransaction, connected, disconnect } = useWallet()
  const { setVisible } = useWalletModal()
  const [balance, setBalance] = useState<number | null>(null)
  const [recipient, setRecipient] = useState('')
  const [amount, setAmount] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const connection = new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!, 'confirmed')

  const fetchBalance = useCallback(async () => {
    if (publicKey) {
      const balance = await connection.getBalance(publicKey)
      setBalance(balance / LAMPORTS_PER_SOL)
    }
  }, [publicKey, connection])

  useEffect(() => {
    fetchBalance()
  }, [fetchBalance])

  const handleConnectWallet = () => {
    setVisible(true)
  }

  const handleDisconnectWallet = () => {
    disconnect()
    setBalance(null)
  }

  const handleSendTransaction = async () => {
    if (!publicKey || !signTransaction) return

    setIsLoading(true)

    try {
      const recipientPubkey = new PublicKey(recipient)
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: recipientPubkey,
          lamports: parseFloat(amount) * LAMPORTS_PER_SOL
        })
      )

      const { blockhash } = await connection.getRecentBlockhash()
      transaction.recentBlockhash = blockhash
      transaction.feePayer = publicKey

      const signedTransaction = await signTransaction(transaction)
      const txid = await connection.sendRawTransaction(signedTransaction.serialize())

      await connection.confirmTransaction(txid)

      toast({
        title: "Transaction Successful",
        description: `Sent ${amount} SOL to ${recipient}`,
      })

      fetchBalance()
      setRecipient('')
      setAmount('')
    } catch (error) {
      console.error('Error sending transaction:', error)
      toast({
        title: "Transaction Failed",
        description: "There was an error sending your transaction. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md mx-auto">
      {connected ? (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-bold text-gray-700 dark:text-gray-300">Connected Wallet:</span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {publicKey?.toBase58().slice(0, 4)}...{publicKey?.toBase58().slice(-4)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-bold text-gray-700 dark:text-gray-300">Balance:</span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {balance !== null ? `${balance.toFixed(4)} SOL` : 'Loading...'}
            </span>
          </div>
          <Input
            type="text"
            placeholder="Recipient Address"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="w-full mt-2"
          />
          <Input
            type="number"
            placeholder="Amount (SOL)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full mt-2"
          />
          <Button
            onClick={handleSendTransaction}
            disabled={isLoading || !recipient || !amount}
            className="w-full bg-[#D0BFB4] text-gray-800 hover:bg-[#C1AEA1] transition-colors duration-300"
          >
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Send Transaction
          </Button>
          <Button
            onClick={handleDisconnectWallet}
            className="w-full bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors duration-300 mt-2"
          >
            Disconnect Wallet
          </Button>
        </div>
      ) : (
        <Button
          onClick={handleConnectWallet}
          className="w-full bg-[#D0BFB4] text-gray-800 hover:bg-[#C1AEA1] transition-colors duration-300"
        >
          <Wallet className="mr-2 h-4 w-4" />
          Connect Wallet
        </Button>
      )}
    </div>
  )
}

export default SolanaWalletConnector