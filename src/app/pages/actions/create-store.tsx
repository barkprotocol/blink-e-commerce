'use client'

import React, { useState, useEffect } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

const CreateStore: React.FC = () => {
  const [storeName, setStoreName] = useState('')
  const [storeDescription, setStoreDescription] = useState('')
  const [isCreating, setIsCreating] = useState(false)
  const [balance, setBalance] = useState<number | null>(null)
  const { publicKey, signTransaction, connected } = useWallet()
  const { toast } = useToast()

  useEffect(() => {
    const fetchBalance = async () => {
      if (publicKey) {
        const connection = new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!, 'confirmed')
        const balance = await connection.getBalance(publicKey)
        setBalance(balance / LAMPORTS_PER_SOL)
      }
    }

    fetchBalance()
  }, [publicKey])

  const handleCreateStore = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!publicKey || !signTransaction) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to create a store.",
        variant: "destructive",
      })
      return
    }

    if (balance !== null && balance < 0.01) {
      toast({
        title: "Insufficient balance",
        description: "You need at least 0.05 SOL to create a store.",
        variant: "destructive",
      })
      return
    }

    setIsCreating(true)

    try {
      const connection = new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!, 'confirmed')
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey('gEb7nD9yLkau1P4uyMdke9byJNrat61suH4vYiPUuiR'),
          lamports: 0.05 * LAMPORTS_PER_SOL,
        })
      )

      const { blockhash } = await connection.getRecentBlockhash()
      transaction.recentBlockhash = blockhash
      transaction.feePayer = publicKey

      const signedTransaction = await signTransaction(transaction)
      const txid = await connection.sendRawTransaction(signedTransaction.serialize())

      await connection.confirmTransaction(txid)

      // Simulating API call to create store
      await new Promise(resolve => setTimeout(resolve, 1000))

      toast({
        title: "Store Created!",
        description: `Your store "${storeName}" has been created successfully.`,
      })

      // Reset form
      setStoreName('')
      setStoreDescription('')
      
      // Update balance
      const newBalance = await connection.getBalance(publicKey)
      setBalance(newBalance / LAMPORTS_PER_SOL)
    } catch (error) {
      console.error('Error creating store:', error)
      toast({
        title: "Error",
        description: "There was an error creating your store. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F1EE] dark:bg-gray-900 flex items-center justify-center px-4">
      <motion.div 
        className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-6 text-center font-syne text-gray-800 dark:text-white">Create Your Store</h1>
        <form onSubmit={handleCreateStore} className="space-y-4">
          <div>
            <Label htmlFor="storeName" className="text-gray-700 dark:text-gray-300">Store Name</Label>
            <Input
              id="storeName"
              type="text"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              required
              className="w-full mt-1 bg-gray-50 dark:bg-gray-700 border-[#D0BFB4] dark:border-gray-600"
            />
          </div>
          <div>
            <Label htmlFor="storeDescription" className="text-gray-700 dark:text-gray-300">Store Description</Label>
            <Textarea
              id="storeDescription"
              value={storeDescription}
              onChange={(e) => setStoreDescription(e.target.value)}
              required
              className="w-full mt-1 bg-gray-50 dark:bg-gray-700 border-[#D0BFB4] dark:border-gray-600"
              rows={4}
            />
          </div>
          <div className="flex justify-between items-center">
            <WalletMultiButton className="bg-[#D0BFB4] text-gray-800 hover:bg-[#C1AEA1] transition-colors duration-300" />
            {connected && balance !== null && (
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Balance: {balance.toFixed(4)} SOL
              </span>
            )}
          </div>
          <Button
            type="submit"
            disabled={isCreating || !publicKey}
            className="w-full bg-[#D0BFB4] text-gray-800 hover:bg-[#C1AEA1] transition-colors duration-300 font-inter"
          >
            {isCreating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              'Create Store'
            )}
          </Button>
        </form>
      </motion.div>
    </div>
  )
}

export default CreateStore