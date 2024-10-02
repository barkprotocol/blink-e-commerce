"use client"

import React, { useState } from 'react'
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

interface FilterProps {
  onFilterChange: (filters: FilterState) => void
}

interface FilterState {
  categories: string[]
  priceRange: [number, number]
}

const categories = ['Electronics', 'Clothing', 'Books', 'Home & Garden']
const maxPrice = 1000

export default function ProductFilters({ onFilterChange }: FilterProps) {
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: [0, maxPrice],
  })

  const handleCategoryChange = (category: string) => {
    const updatedCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category]
    
    const updatedFilters = { ...filters, categories: updatedCategories }
    setFilters(updatedFilters)
    onFilterChange(updatedFilters)
  }

  const handlePriceChange = (value: number[]) => {
    const updatedFilters = { ...filters, priceRange: value as [number, number] }
    setFilters(updatedFilters)
    onFilterChange(updatedFilters)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3 font-syne">Categories</h3>
        {categories.map((category) => (
          <div key={category} className="flex items-center space-x-2 mb-2">
            <Checkbox
              id={category}
              checked={filters.categories.includes(category)}
              onCheckedChange={() => handleCategoryChange(category)}
            />
            <Label htmlFor={category} className="font-poppins">{category}</Label>
          </div>
        ))}
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-3 font-syne">Price Range</h3>
        <Slider
          min={0}
          max={maxPrice}
          step={10}
          value={filters.priceRange}
          onValueChange={handlePriceChange}
          className="mb-2"
        />
        <div className="flex justify-between font-poppins">
          <span>${filters.priceRange[0]}</span>
          <span>${filters.priceRange[1]}</span>
        </div>
      </div>
    </div>
  )
}