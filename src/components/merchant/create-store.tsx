'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js'
import { motion } from 'framer-motion'
import { useToast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Upload, Plus, Download, FileText, Trash2, RefreshCw, DollarSign, Image as ImageIcon } from 'lucide-react'

interface StoreData {
  name: string
  description: string
  logo: File | null
  banner: File | null
  address: string
  email: string
  phone: string
  socialMedia: {
    facebook: string
    twitter: string
    instagram: string
  }
  merchantWallet: string
  paymentGateway: string
}

const BARK_PROTOCOL_FEE = 0.002 // 0.2%

const CreateStore: React.FC = () => {
  const [storeData, setStoreData] = useState<StoreData>({
    name: '',
    description: '',
    logo: null,
    banner: null,
    address: '',
    email: '',
    phone: '',
    socialMedia: {
      facebook: '',
      twitter: '',
      instagram: '',
    },
    merchantWallet: '',
    paymentGateway: 'solana-pay',
  })
  const [isCreating, setIsCreating] = useState(false)
  const [activeTab, setActiveTab] = useState('details')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)

  const router = useRouter()
  const { publicKey, signTransaction, connected } = useWallet()
  const { toast } = useToast()

  useEffect(() => {
    if (publicKey) {
      setStoreData(prev => ({ ...prev, merchantWallet: publicKey.toBase58() }))
    }
  }, [publicKey])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setStoreData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSocialMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setStoreData((prev) => ({
      ...prev,
      socialMedia: { ...prev.socialMedia, [name]: value },
    }))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'banner') => {
    const file = e.target.files?.[0] || null
    setStoreData((prev) => ({ ...prev, [type]: file }))
    if (type === 'logo' && file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setLogoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const validateForm = () => {
    if (!storeData.name || !storeData.description || !storeData.email || !storeData.merchantWallet) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      })
      return false
    }
    return true
  }

  const handleCreateStore = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    if (!publicKey || !signTransaction) {
      toast({
        title: 'Wallet not connected',
        description: 'Please connect your Solana wallet to create a store.',
        variant: 'destructive',
      })
      return
    }

    setIsCreating(true)

    try {
      const connection = new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL!, 'confirmed')
      const storeFee = 0.1 * LAMPORTS_PER_SOL // 0.1 SOL fee for store creation
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey(process.env.NEXT_PUBLIC_STORE_WALLET_ADDRESS!),
          lamports: storeFee,
        })
      )

      const { blockhash } = await connection.getRecentBlockhash()
      transaction.recentBlockhash = blockhash
      transaction.feePayer = publicKey

      const signedTransaction = await signTransaction(transaction)
      const txid = await connection.sendRawTransaction(signedTransaction.serialize())

      await connection.confirmTransaction(txid)

      // Here you would typically send the store data to your backend
      // For this example, we'll just simulate a successful store creation
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: 'Store Created!',
        description: `Your store "${storeData.name}" has been created successfully.`,
      })

      router.push('/merchant/dashboard')
    } catch (error) {
      console.error('Error creating store:', error)
      toast({
        title: 'Error',
        description: 'There was an error creating your store. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-[#F5F1EE] text-gray-800'} flex items-center justify-center px-4 py-12 transition-colors duration-300`}>
      <Card className={`w-full max-w-4xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl`}>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-3xl font-bold">Create Your Store</CardTitle>
            <div className="flex items-center space-x-2">
              <span className="text-sm">Dark Mode</span>
              <Switch
                checked={isDarkMode}
                onCheckedChange={setIsDarkMode}
                aria-label="Toggle dark mode"
              />
            </div>
          </div>
          <CardDescription>Fill in the details below to set up your online store.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="details">Store Details</TabsTrigger>
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
              <TabsTrigger value="payment">Payment</TabsTrigger>
              <TabsTrigger value="review">Review</TabsTrigger>
            </TabsList>
            <TabsContent value="details">
              <form onSubmit={handleCreateStore} className="space-y-4">
                <div>
                  <Label htmlFor="name">Store Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={storeData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="description">Store Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={storeData.description}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="address">Store Address</Label>
                  <Input
                    id="address"
                    name="address"
                    value={storeData.address}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Store Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={storeData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Store Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={storeData.phone}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label>Social Media</Label>
                  <div className="space-y-2">
                    <Input
                      name="facebook"
                      placeholder="Facebook URL"
                      value={storeData.socialMedia.facebook}
                      onChange={handleSocialMediaChange}
                    />
                    <Input
                      name="twitter"
                      placeholder="Twitter URL"
                      value={storeData.socialMedia.twitter}
                      onChange={handleSocialMediaChange}
                    />
                    <Input
                      name="instagram"
                      placeholder="Instagram URL"
                      value={storeData.socialMedia.instagram}
                      onChange={handleSocialMediaChange}
                    />
                  </div>
                </div>
              </form>
            </TabsContent>
            <TabsContent value="appearance">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="logo">Store Logo</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="logo"
                      type="file"
                      onChange={(e) => handleFileUpload(e, 'logo')}
                      accept="image/*"
                    />
                    <Button type="button" onClick={() => document.getElementById('logo')?.click()}>
                      <ImageIcon className="w-4 h-4 mr-2" />
                      Upload Logo
                    </Button>
                  </div>
                  {logoPreview && (
                    <div className="mt-4">
                      <img src={logoPreview} alt="Store Logo Preview" className="max-w-xs rounded-lg shadow-md" />
                    </div>
                  )}
                </div>
                <div>
                  <Label htmlFor="banner">Store Banner</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="banner"
                      type="file"
                      onChange={(e) => handleFileUpload(e, 'banner')}
                      accept="image/*"
                    />
                    <Button type="button" onClick={() => document.getElementById('banner')?.click()}>
                      <ImageIcon className="w-4 h-4 mr-2" />
                      Upload Banner
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="payment">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="merchantWallet">Merchant Wallet Address (SPL compliant)</Label>
                  <Input
                    id="merchantWallet"
                    name="merchantWallet"
                    value={storeData.merchantWallet}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="paymentGateway">Payment Gateway</Label>
                  <Select
                    value={storeData.paymentGateway}
                    onValueChange={(value) => setStoreData(prev => ({ ...prev, paymentGateway: value }))}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a payment gateway" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="solana-pay">Solana Pay</SelectItem>
                      <SelectItem value="usdc">USDC</SelectItem>
                      <SelectItem value="sol">SOL</SelectItem>
                      <SelectItem value="bark">BARK Token</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">BARK Protocol Commission: {BARK_PROTOCOL_FEE * 100}%</p>
                </div>
                <div className="flex justify-between items-center">
                  <span>Store Creation Fee: 0.1 SOL</span>
                  <WalletMultiButton />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="review">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Review Your Store Details</h3>
                <p><strong>Name:</strong> {storeData.name}</p>
                <p><strong>Description:</strong> {storeData.description}</p>
                <p><strong>Email:</strong> {storeData.email}</p>
                <p><strong>Merchant Wallet:</strong> {storeData.merchantWallet}</p>
                <p><strong>Payment Gateway:</strong> {storeData.paymentGateway}</p>
                {connected && (
                  <Button
                    type="submit"
                    onClick={handleCreateStore}
                    disabled={isCreating}
                    className="w-full"
                  >
                    {isCreating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating Store...
                      </>
                    ) : (
                      <>
                        <DollarSign className="mr-2 h-4 w-4" />
                        Create Store (0.1 SOL)
                      </>
                    )}
                  </Button>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => router.push('/')}>
            Cancel
          </Button>
          <Button onClick={() => {
            const tabs = ['details', 'appearance', 'payment', 'review']
            const currentIndex = tabs.indexOf(activeTab)
            setActiveTab(tabs[(currentIndex + 1) % tabs.length])
          }}>
            {activeTab === 'review' ? 'Back to Details' : 'Next'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default CreateStore