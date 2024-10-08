import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Shield, ArrowRight } from 'lucide-react'

export default function PaymentCard() {
  return (
    <Card className="w-full max-w-md mx-auto bg-white shadow-xl">
      <CardHeader className="text-center">
        <div className="mx-auto bg-[#8A7A6D] text-white p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
          <Shield size={32} />
        </div>
        <CardTitle className="text-2xl font-bold font-syne text-[#1E1E1E]">Secure Payments</CardTitle>
        <CardDescription className="text-[#1E1E1E] font-poppins">
          Solana-Powered Escrow Service
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-[#1E1E1E] mb-4 font-poppins">
          Protect both buyers and sellers with our automated escrow services that hold payments until delivery is confirmed.
        </p>
        <ul className="text-left space-y-2 mb-6 font-poppins">
          <li className="flex items-center">
            <ArrowRight size={16} className="text-[#8A7A6D] mr-2" />
            Funds are locked in smart contracts
          </li>
          <li className="flex items-center">
            <ArrowRight size={16} className="text-[#8A7A6D] mr-2" />
            Automatic release upon confirmation
          </li>
          <li className="flex items-center">
            <ArrowRight size={16} className="text-[#8A7A6D] mr-2" />
            Dispute resolution system
          </li>
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-[#8A7A6D] text-white hover:bg-[#76685C] transition-all duration-300 font-poppins">
          Learn More About Escrow
        </Button>
      </CardFooter>
    </Card>
  )
}