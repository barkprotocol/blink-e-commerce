'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js'
import { motion, AnimatePresence } from 'framer-motion'
import { useToast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { SolanaQRCode } from '@/components/qr-code'
import { Loader2, Upload, Plus, Download, FileText, Trash2, RefreshCw, DollarSign, Image as ImageIcon, Mail, Phone, Globe, Facebook, Twitter, Instagram } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import Papa from 'papaparse'

interface Product {
  name: string
  price: number
  description: string
}

const CreateStore: React.FC = () => {
  const [storeName, setStoreName] = useState('')
  const [storeDescription, setStoreDescription] = useState('')
  const [storeAddress, setStoreAddress] = useState('')
  const [storeEmail, setStoreEmail] = useState('')
  const [storePhone, setStorePhone] = useState('')
  const [storeUrl, setStoreUrl] = useState('')
  const [storeDomain, setStoreDomain] = useState('')
  const [storeFacebook, setStoreFacebook] = useState('')
  const [storeTwitter, setStoreTwitter] = useState('')
  const [storeInstagram, setStoreInstagram] = useState('')
  const [isCreating, setIsCreating] = useState(false)
  const [balance, setBalance] = useState<number | null>(null)
  const [banner, setBanner] = useState<File | null>(null)
  const [logo, setLogo] = useState<File | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [isImporting, setIsImporting] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [paymentQRCode, setPaymentQRCode] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState('details')
  const [progress, setProgress] = useState(0)
  const { publicKey, signTransaction, connected } = useWallet()
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)

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

  useEffect(() => {
    const calculateProgress = () => {
      let completedSteps = 0
      if (storeName) completedSteps++
      if (storeDescription) completedSteps++
      if (storeAddress) completedSteps++
      if (storeEmail) completedSteps++
      if (storePhone) completedSteps++
      if (storeUrl) completedSteps++
      if (storeDomain) completedSteps++
      if (banner) completedSteps++
      if (logo) completedSteps++
      if (products.length > 0) completedSteps++
      setProgress((completedSteps / 10) * 100)
    }

    calculateProgress()
  }, [storeName, storeDescription, storeAddress, storeEmail, storePhone, storeUrl, storeDomain, banner, logo, products])

  const validateForm = () => {
    if (!storeName) {
      toast({ title: "Error", description: "Store name is required", variant: "destructive" })
      return false
    }
    if (!storeDescription) {
      toast({ title: "Error", description: "Store description is required", variant: "destructive" })
      return false
    }
    if (!storeEmail || !/\S+@\S+\.\S+/.test(storeEmail)) {
      toast({ title: "Error", description: "Valid store email is required", variant: "destructive" })
      return false
    }
    if (products.length === 0) {
      toast({ title: "Error", description: "At least one product is required", variant: "destructive" })
      return false
    }
    return true
  }

  const handleCreateStore = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    if (!publicKey || !signTransaction) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to create a store.",
        variant: "destructive",
      })
      return
    }

    if (balance !== null && balance < 0.05) {
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
      const storeFee = 0.05 * LAMPORTS_PER_SOL
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

      // Generate Solana Pay QR code for store payments
      const storePaymentUrl = `https://test.shop.barkprotocol.net/${publicKey.toBase58()}`
      setPaymentQRCode(storePaymentUrl)

      toast({
        title: "Store Created!",
        description: `Your store "${storeName}" has been created successfully with ${products.length} products.`,
      })

      // Reset form
      setStoreName('')
      setStoreDescription('')
      setStoreAddress('')
      setStoreEmail('')
      setStorePhone('')
      setStoreUrl('')
      setStoreDomain('')
      setStoreFacebook('')
      setStoreTwitter('')
      setStoreInstagram('')
      setBanner(null)
      setLogo(null)
      setProducts([])
      setPreviewUrl(null)
      
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

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>, setFile: (file: File | null) => void) => {
    const file = event.target.files?.[0] || null
    setFile(file)
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => setPreviewUrl(e.target?.result as string)
      reader.readAsDataURL(file)
    }
  }, [])

  const handleAddProduct = useCallback(() => {
    setProducts(prev => [...prev, { name: '', price: 0, description: '' }])
  }, [])

  const handleProductChange = useCallback((index: number, field: keyof Product, value: string | number) => {
    setProducts(prev => prev.map((product, i) => i === index ? { ...product, [field]: value } : product))
  }, [])

  const handleRemoveProduct = useCallback((index: number) => {
    setProducts(prev => prev.filter((_, i) => i !== index))
  }, [])

  const handleDownloadTemplate = useCallback(() => {
    const csvContent = "Name,Price,Description\nExample Product,9.99,This is an example product description"
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement("a")
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob)
      link.setAttribute("href", url)
      link.setAttribute("download", "product_template.csv")
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }, [])

  const handleImportCSV = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setIsImporting(true)
      Papa.parse(file, {
        complete: (results) => {
          const importedProducts = results.data.slice(1).map((row: any) => ({
            name: row[0] || '',
            price: parseFloat(row[1]) || 0,
            description: row[2] || ''
          }))
          setProducts(prev => [...prev, ...importedProducts])
          setIsImporting(false)
          toast({
            title: "Products Imported",
            description: `Successfully imported ${importedProducts.length} products.`,
          })
        },
        header: true,
        error: (error) => {
          console.error('Error parsing CSV:', error)
          setIsImporting(false)
          toast({
            title: "Import Error",
            description: "There was an error importing the CSV file. Please check the file format and try again.",
            variant: "destructive",
          })
        }
      })
    }
  }, [toast])

  const handleGenerateRandomStore = useCallback(() => {
    const randomName = `${['Cool', 'Awesome', 'Amazing', 'Fantastic'][Math.floor(Math.random() * 4)]} ${['Store', 'Shop', 'Marketplace', 'Emporium'][Math.floor(Math.random() * 4)]}`
    const randomDescription = `Welcome to ${randomName}! We offer a wide range of products for all your needs.`
    const randomProducts = Array(3).fill(null).map(() => ({
      name: `${['Super', 'Ultra', 'Mega', 'Hyper'][Math.floor(Math.random() * 4)]} ${['Widget', 'Gadget', 'Gizmo', 'Doohickey'][Math.floor(Math.random() * 4)]}`,
      price: Math.floor(Math.random() * 100) + 0.99,
      description: `This is a fantastic product that you absolutely need!`
    }))

    setStoreName(randomName)
    setStoreDescription(randomDescription)
    setProducts(randomProducts)

    toast({
      title: "Random Store Generated",
      description: "A random store has been generated. Feel free to edit the details!",
    })
  }, [toast])

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-[#F5F1EE] text-gray-800'} flex items-center justify-center px-4 py-12 transition-colors duration-300`}>
      <Card className={`w-full max-w-4xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl`}>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-3xl font-bold font-syne">Create Your Store</CardTitle>
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
          <Progress value={progress} className="w-full mt-4" />
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Store Details</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="payment">Payment</TabsTrigger>
            </TabsList>
            <TabsContent value="details">
              <form onSubmit={handleCreateStore} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="storeName" className="text-lg font-semibold mb-2 block">Store Name</Label>
                    <Input
                      id="storeName"
                      type="text"
                      value={storeName}
                      onChange={(e) => setStoreName(e.target.value)}
                      required
                      className={`w-full ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-[#D0BFB4]'}`}
                      placeholder="Enter your store name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="storeDescription" className="text-lg font-semibold mb-2 block">Store Description</Label>
                    <Textarea
                      id="storeDescription"
                      value={storeDescription}
                      onChange={(e) => setStoreDescription(e.target.value)}
                      required
                      className={`w-full ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-[#D0BFB4]'}`}
                      rows={4}
                      placeholder="Describe your store"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="storeAddress" className="text-lg font-semibold mb-2 block">Store Address</Label>
                    <Input
                      id="storeAddress"
                      type="text"
                      value={storeAddress}
                      onChange={(e) => setStoreAddress(e.target.value)}
                      className={`w-full ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-[#D0BFB4]'}`}
                      placeholder="Enter store address"
                    />
                  </div>
                  <div>
                    <Label htmlFor="storeEmail" className="text-lg font-semibold mb-2 block">Store Email</Label>
                    <Input
                      id="storeEmail"
                      type="email"
                      value={storeEmail}
                      onChange={(e) => setStoreEmail(e.target.value)}
                      className={`w-full ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-[#D0BFB4]'}`}
                      placeholder="Enter store email"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="storePhone" className="text-lg font-semibold mb-2 block">Store Phone</Label>
                    <Input
                      id="storePhone"
                      type="tel"
                      value={storePhone}
                      onChange={(e) => setStorePhone(e.target.value)}
                      className={`w-full ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-[#D0BFB4]'}`}
                      placeholder="Enter store phone number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="storeUrl" className="text-lg font-semibold mb-2 block">Store URL</Label>
                    <Input
                      id="storeUrl"
                      type="url"
                      value={storeUrl}
                      onChange={(e) => setStoreUrl(e.target.value)}
                      className={`w-full ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-[#D0BFB4]'}`}
                      placeholder="Enter store URL"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="storeDomain" className="text-lg font-semibold mb-2 block">Store Domain</Label>
                    <Input
                      id="storeDomain"
                      type="text"
                      value={storeDomain}
                      onChange={(e) => setStoreDomain(e.target.value)}
                      className={`w-full ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-[#D0BFB4]'}`}
                      placeholder="Enter store domain"
                    />
                  </div>
                  <div>
                    <Label htmlFor="storeFacebook" className="text-lg font-semibold mb-2 block">Facebook</Label>
                    <Input
                      id="storeFacebook"
                      type="url"
                      value={storeFacebook}
                      onChange={(e) => setStoreFacebook(e.target.value)}
                      className={`w-full ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-[#D0BFB4]'}`}
                      placeholder="Enter Facebook URL"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="storeTwitter" className="text-lg font-semibold mb-2 block">Twitter</Label>
                    <Input
                      id="storeTwitter"
                      type="url"
                      value={storeTwitter}
                      onChange={(e) => setStoreTwitter(e.target.value)}
                      className={`w-full ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-[#D0BFB4]'}`}
                      placeholder="Enter Twitter URL"
                    />
                  </div>
                  <div>
                    <Label htmlFor="storeInstagram" className="text-lg font-semibold mb-2 block">Instagram</Label>
                    <Input
                      id="storeInstagram"
                      type="url"
                      value={storeInstagram}
                      onChange={(e) => setStoreInstagram(e.target.value)}
                      className={`w-full ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-[#D0BFB4]'}`}
                      placeholder="Enter Instagram URL"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="banner" className="text-lg font-semibold mb-2 block">Store Banner</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="banner"
                        type="file"
                        onChange={(e) => handleFileUpload(e, setBanner)}
                        className={`w-full ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-[#D0BFB4]'}`}
                        accept="image/*"
                      />
                      <Button type="button" onClick={() => document.getElementById('banner')?.click()} className="bg-[#D0BFB4] text-gray-800 hover:bg-[#C1AEA1]">
                        <ImageIcon className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="logo" className="text-lg font-semibold mb-2 block">Store Logo</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="logo"
                        type="file"
                        onChange={(e) => handleFileUpload(e, setLogo)}
                        className={`w-full ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-[#D0BFB4]'}`}
                        accept="image/*"
                      />
                      <Button type="button" onClick={() => document.getElementById('logo')?.click()} className="bg-[#D0BFB4] text-gray-800 hover:bg-[#C1AEA1]">
                        <ImageIcon className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </div>
                {previewUrl && (
                  <div className="mt-4">
                    <img src={previewUrl} alt="Preview" className="max-w-full h-auto rounded-lg shadow-md" />
                  </div>
                )}
              </form>
            </TabsContent>
            <TabsContent value="products">
              <div>
                <Label className="text-lg font-semibold mb-2 block">Products</Label>
                <AnimatePresence>
                  {products.map((product, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className={`flex items-center space-x-2 mt-2 p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
                    >
                      <Input
                        type="text"
                        value={product.name}
                        onChange={(e) => handleProductChange(index, 'name', e.target.value)}
                        placeholder="Product Name"
                        className={`flex-grow ${isDarkMode ? 'bg-gray-600 border-gray-500' : 'bg-white border-[#D0BFB4]'}`}
                      />
                      <Input
                        type="number"
                        value={product.price}
                        onChange={(e) => handleProductChange(index, 'price', parseFloat(e.target.value))}
                        placeholder="Price"
                        className={`w-24 ${isDarkMode ? 'bg-gray-600 border-gray-500' : 'bg-white border-[#D0BFB4]'}`}
                      />
                      <Button
                        type="button"
                        onClick={() => handleRemoveProduct(index)}
                        className="bg-red-500 hover:bg-red-600 text-white"
                        aria-label={`Remove product ${product.name}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  ))}
                </AnimatePresence>
                <div className="flex space-x-2 mt-4">
                  <Button
                    type="button"
                    onClick={handleAddProduct}
                    className="bg-[#D0BFB4] text-gray-800 hover:bg-[#C1AEA1] transition-colors duration-300"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Product
                  </Button>
                  <Button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-[#D0BFB4] text-gray-800 hover:bg-[#C1AEA1] transition-colors duration-300"
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Import CSV
                  </Button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImportCSV}
                    className="hidden"
                    accept=".csv"
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="payment">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <WalletMultiButton className="!bg-[#D0BFB4] !text-gray-800 hover:!bg-[#C1AEA1] transition-colors duration-300" />
                  {connected && balance !== null && (
                    <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Balance: {balance.toFixed(4)} SOL
                    </span>
                  )}
                </div>
                <Button
                  type="submit"
                  disabled={isCreating || !connected}
                  className={`w-full ${isDarkMode ? 'bg-[#D0BFB4] hover:bg-[#C1AEA1]' : 'bg-[#D0BFB4] hover:bg-[#C1AEA1]'} text-gray-800 transition-colors duration-300 font-inter`}
                  onClick={handleCreateStore}
                >
                  {isCreating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Create Store
                    </>
                  )}
                </Button>
                {paymentQRCode && (
                  <div className="mt-8">
                    <h2 className="text-2xl font-bold mb-4">Store Payment QR Code</h2>
                    <SolanaQRCode url={paymentQRCode} size={256} />
                    <p className="mt-4 text-center">Scan this QR code to make payments to your store using Solana Pay</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            type="button"
            onClick={handleDownloadTemplate}
            className={`${isDarkMode ? 'bg-gray-600 hover:bg-gray-700' : 'bg-[#D0BFB4] hover:bg-[#C1AEA1]'} text-gray-800 transition-colors duration-300 font-inter`}
          >
            <Download className="mr-2 h-4 w-4" />
            Download Template
          </Button>
          <Button
            type="button"
            onClick={handleGenerateRandomStore}
            className={`${isDarkMode ? 'bg-gray-600 hover:bg-gray-700' : 'bg-[#D0BFB4] hover:bg-[#C1AEA1]'} text-gray-800 transition-colors duration-300 font-inter`}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Generate Random Store
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default CreateStore