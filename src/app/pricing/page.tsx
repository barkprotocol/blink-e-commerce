import { Metadata } from 'next'
import Link from 'next/link'
import { Check } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Pricing Plans | Your E-Commerce Platform',
  description: 'Choose the perfect pricing plan for your online store.',
}

interface PricingPlan {
  name: string
  price: number
  description: string
  features: string[]
  cta: string
}

const pricingPlans: PricingPlan[] = [
  {
    name: 'Starter',
    price: 9.99,
    description: 'Perfect for small businesses just getting started',
    features: [
      'Up to 100 products',
      'Basic analytics',
      'Standard themes',
      '24/7 support',
    ],
    cta: 'Start your 14-day free trial',
  },
  {
    name: 'Growth',
    price: 29.99,
    description: 'For growing businesses ready to scale',
    features: [
      'Up to 1,000 products',
      'Advanced analytics',
      'Premium themes',
      'Priority support',
      'API access',
    ],
    cta: 'Scale your business now',
  },
  {
    name: 'Enterprise',
    price: 99.99,
    description: 'For large businesses with custom needs',
    features: [
      'Unlimited products',
      'Custom analytics',
      'Custom themes',
      'Dedicated support team',
      'Full API access',
      'White-label solution',
    ],
    cta: 'Contact sales for custom pricing',
  },
]

export default function PricingPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-8">Choose Your Plan</h1>
      <p className="text-xl text-center text-gray-600 dark:text-gray-300 mb-12">
        Select the perfect plan to power your online store
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {pricingPlans.map((plan, index) => (
          <Card key={plan.name} className="flex flex-col">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
              <CardDescription className="text-lg">
                ${plan.price.toFixed(2)} / month
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-gray-600 dark:text-gray-300 mb-4">{plan.description}</p>
              <ul className="space-y-2">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="/signup">
                  {plan.cta}
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-semibold mb-4">Not sure which plan is right for you?</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Our team is here to help you choose the best plan for your business needs.
        </p>
        <Button asChild variant="outline">
          <Link href="/contact">
            Contact Sales
          </Link>
        </Button>
      </div>
    </div>
  )
}