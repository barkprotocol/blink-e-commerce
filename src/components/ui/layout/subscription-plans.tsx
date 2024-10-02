'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js'
import { createQR, encodeURL, TransactionRequestURLFields } from '@solana/pay'
import { loadStripe } from '@stripe/stripe-js'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Check, X, CreditCard, Wallet } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface Plan {
  id: string
  name: string
  price: number
  features: string[]
  limitations: string[]
  recommended?: boolean
}

const plans: Plan[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 9.99,
    features: ['Up to 100 products', 'Basic analytics', 'Email support', 'Standard themes'],
    limitations: ['No custom domain', 'Limited integrations'],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 29.99,
    features: ['Unlimited products', 'Advanced analytics', 'Priority support', 'Custom domain', 'All themes'],
    limitations: ['Limited API access'],
    recommended: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 99.99,
    features: ['Unlimited products', 'Advanced analytics', '24/7 support', 'Custom domain', 'All themes', 'Full API access', 'Dedicated account manager'],
    limitations: [],
  },
]

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

const SubscriptionPlans: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [qrCode, setQrCode] = useState<string | null>(null)
  const { publicKey, signTransaction, connected } = useWallet()
  const { toast } = useToast()

  const handleSubscribe = async (plan: Plan) => {
    setSelectedPlan(plan.id)
    setIsPaymentModalOpen(true)
  }

  const handleStripePayment = async (plan: Plan) => {
    const stripe = await stripePromise
    if (!stripe) return

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planId: plan.id,
          planName: plan.name,
          planPrice: plan.price,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create checkout session')
      }

      const session = await response.json()

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      })

      if (result.error) {
        throw new Error(result.error.message)
      }
    } catch (error) {
      console.error('Error processing Stripe payment:', error)
      toast({
        title: "Payment Failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      })
    }
  }

  const handleSolanaPayment = async (plan: Plan) => {
    if (!publicKey || !signTransaction) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your Solana wallet to proceed with the payment.",
        variant: "destructive",
      })
      return
    }

    try {
      const connection = new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!, 'confirmed')
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey(process.env.NEXT_PUBLIC_STORE_WALLET_ADDRESS!),
          lamports: plan.price * LAMPORTS_PER_SOL,
        })
      )

      const { blockhash } = await connection.getRecentBlockhash()
      transaction.recentBlockhash = blockhash
      transaction.feePayer = publicKey

      const signedTransaction = await signTransaction(transaction)
      const txid = await connection.sendRawTransaction(signedTransaction.serialize())

      await connection.confirmTransaction(txid)

      const url = encodeURL({
        recipient: new PublicKey(process.env.NEXT_PUBLIC_STORE_WALLET_ADDRESS!),
        amount: plan.price,
        reference: new PublicKey(txid),
        label: `Payment for ${plan.name} Plan`,
        message: 'Thanks for your subscription!',
      } as TransactionRequestURLFields)

      const qr = createQR(url, 256, 'white', 'black')
      setQrCode(qr.toDataURL())

      toast({
        title: "Payment Successful",
        description: `You've successfully subscribed to the ${plan.name} plan.`,
      })
    } catch (error) {
      console.error('Error processing Solana payment:', error)
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Choose Your Plan
          </h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            Select the perfect plan for your business needs
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="flex"
            >
              <Card className={`flex flex-col justify-between w-full ${plan.recommended ? 'border-primary shadow-lg' : ''}`}>
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <CardDescription className="mt-2">
                    <span className="text-4xl font-extrabold">${plan.price}</span>
                    <span className="text-base font-medium text-gray-500 dark:text-gray-400">/month</span>
                  </CardDescription>
                  {plan.recommended && (
                    <Badge className="absolute top-4 right-4" variant="secondary">
                      Recommended
                    </Badge>
                  )}
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" aria-hidden="true" />
                        <span>{feature}</span>
                      </li>
                    ))}
                    {plan.limitations.map((limitation, index) => (
                      <li key={index} className="flex items-center text-gray-500">
                        <X className="h-5 w-5 text-red-500 mr-2" aria-hidden="true" />
                        <span>{limitation}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={() => handleSubscribe(plan)}
                    className="w-full bg-primary hover:bg-primary-dark text-white"
                    disabled={selectedPlan === plan.id}
                  >
                    {selectedPlan === plan.id ? 'Current Plan' : 'Subscribe'}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
      <Dialog open={isPaymentModalOpen} onOpenChange={setIsPaymentModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Choose Payment Method</DialogTitle>
            <DialogDescription>
              Select your preferred payment method to complete the subscription.
            </DialogDescription>
          </DialogHeader>
          <Tabs defaultValue="stripe">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="stripe">Stripe</TabsTrigger>
              <TabsTrigger value="solana">Solana</TabsTrigger>
            </TabsList>
            <TabsContent value="stripe">
              <Button onClick={() => handleStripePayment(plans.find(p => p.id === selectedPlan)!)} className="w-full">
                <CreditCard className="mr-2 h-4 w-4" />
                Pay with Stripe
              </Button>
            </TabsContent>
            <TabsContent value="solana">
              <Button onClick={() => handleSolanaPayment(plans.find(p => p.id === selectedPlan)!)} className="w-full">
                <Wallet className="mr-2 h-4 w-4" />
                Pay with Solana
              </Button>
              {qrCode && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-2">Scan to Pay with Solana</h3>
                  <div className="flex justify-center">
                    <img src={qrCode} alt="Solana Pay QR Code" className="rounded-lg" />
                  </div>
                </div>
              )}
              <div className="mt-4">
                <WalletMultiButton className="!bg-[#D0BFB4] !text-gray-800 hover:!bg-[#C1AEA1] transition-colors duration-300" />
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default SubscriptionPlans