'use client'

import React, { useState, useCallback } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js'
import { createQR, encodeURL, TransactionRequestURLFields } from '@solana/pay'
import { motion, AnimatePresence } from 'framer-motion'
import { useToast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Loader2, CreditCard, AlertCircle } from 'lucide-react'
import { SolanaQRCode } from '@/components/qr-code'

interface CheckoutFormProps {
  cartItems: Array<{ id: string; name: string; price: number; quantity: number }>
  onCheckoutComplete: () => void
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ cartItems, onCheckoutComplete }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [qrCode, setQrCode] = useState<string | null>(null)
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const { publicKey, signTransaction, connected } = useWallet()
  const { toast } = useToast()

  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!publicKey || !signTransaction) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to complete the checkout.",
        variant: "destructive",
      })
      return
    }

    if (!agreeToTerms) {
      toast({
        title: "Terms and Conditions",
        description: "Please agree to the terms and conditions to proceed.",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)

    try {
      const connection = new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!, 'confirmed')
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey(process.env.NEXT_PUBLIC_STORE_WALLET_ADDRESS!),
          lamports: totalAmount * LAMPORTS_PER_SOL,
        })
      )

      const { blockhash } = await connection.getRecentBlockhash()
      transaction.recentBlockhash = blockhash
      transaction.feePayer = publicKey

      const signedTransaction = await signTransaction(transaction)
      const txid = await connection.sendRawTransaction(signedTransaction.serialize())

      await connection.confirmTransaction(txid)

      // Generate Solana Pay QR code
      const url = encodeURL({
        recipient: new PublicKey(process.env.NEXT_PUBLIC_STORE_WALLET_ADDRESS!),
        amount: totalAmount,
        reference: new PublicKey(txid),
        label: `Payment for Order`,
        message: 'Thanks for your purchase!',
      } as TransactionRequestURLFields)

      setQrCode(url.toString())

      toast({
        title: "Payment Successful",
        description: "Your order has been placed successfully.",
      })

      onCheckoutComplete()
    } catch (error) {
      console.error('Error processing payment:', error)
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Checkout</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleInputChange}
              required
              className="w-full mt-1"
            />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleInputChange}
              required
              className="w-full mt-1"
            />
          </div>
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full mt-1"
          />
        </div>
        <div>
          <Label htmlFor="address">Address</Label>
          <Textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
            className="w-full mt-1"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              name="city"
              type="text"
              value={formData.city}
              onChange={handleInputChange}
              required
              className="w-full mt-1"
            />
          </div>
          <div>
            <Label htmlFor="country">Country</Label>
            <Select
              id="country"
              name="country"
              value={formData.country}
              onValueChange={(value) => setFormData(prev => ({ ...prev, country: value }))}
              required
              className="w-full mt-1"
            >
              <option value="">Select a country</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="UK">United Kingdom</option>
              {/* Add more countries as needed */}
            </Select>
          </div>
        </div>
        <div>
          <Label htmlFor="postalCode">Postal Code</Label>
          <Input
            id="postalCode"
            name="postalCode"
            type="text"
            value={formData.postalCode}
            onChange={handleInputChange}
            required
            className="w-full mt-1"
          />
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Order Summary</h3>
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center mb-2">
              <span>{item.name} x {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="flex justify-between items-center font-bold mt-4">
            <span>Total</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>
        </div>
        <div className="flex items-center">
          <Checkbox 
            id="terms" 
            checked={agreeToTerms}
            onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
            className="mr-2" 
          />
          <Label htmlFor="terms" className="text-sm">
            I agree to the terms and conditions
          </Label>
        </div>
        <div className="flex justify-between items-center">
          <WalletMultiButton className="!bg-[#D0BFB4] !text-gray-800 hover:!bg-[#C1AEA1] transition-colors duration-300" />
          <Button
            type="submit"
            disabled={isProcessing || !connected || !agreeToTerms}
            className="bg-[#D0BFB4] text-gray-800 hover:bg-[#C1AEA1] transition-colors duration-300"
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <CreditCard className="mr-2 h-4 w-4" />
                Pay Now
              </>
            )}
          </Button>
        </div>
      </form>
      <AnimatePresence>
        {qrCode && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-8"
          >
            <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Scan to Pay</h3>
            <div className="flex justify-center">
              <SolanaQRCode url={qrCode} size={256} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {!connected && (
        <div className="mt-4 p-4 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center">
          <AlertCircle className="h-5 w-5 text-yellow-800 dark:text-yellow-200 mr-2" />
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            Please connect your wallet to proceed with the payment.
          </p>
        </div>
      )}
    </motion.div>
  )
}

export default CheckoutForm