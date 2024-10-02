import React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export function CreateButton() {
  const router = useRouter()

  const handleCreateClick = () => {
    router.push('/create-shop')
  }

  return (
    <Button onClick={handleCreateClick} className="bg-[#D0BFB4] text-gray-800 hover:bg-[#C1AEA1]">
      Create Shop
    </Button>
  )
}