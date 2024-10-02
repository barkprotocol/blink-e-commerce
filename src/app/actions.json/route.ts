import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'

const prisma = new PrismaClient()

// Helper function to handle errors
function handleError(error: unknown) {
  console.error('Error:', error)
  return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 })
}

// Store setup
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, password } = body

    const store = await prisma.store.create({
      data: {
        name,
        owner: {
          create: {
            email,
            password, // Note: In a real application, ensure the password is hashed
          }
        }
      }
    })

    return NextResponse.json(store, { status: 201 })
  } catch (error) {
    return handleError(error)
  }
}

// Product management
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, title, description, price, stock, categoryId } = body

    const product = await prisma.product.update({
      where: { id },
      data: { title, description, price, stock, categoryId }
    })

    return NextResponse.json(product)
  } catch (error) {
    return handleError(error)
  }
}

// Get store details or products
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const storeId = searchParams.get('storeId')
    const productId = searchParams.get('productId')

    if (storeId) {
      const store = await prisma.store.findUnique({
        where: { id: storeId },
        include: { products: true, categories: true }
      })
      return NextResponse.json(store)
    } else if (productId) {
      const product = await prisma.product.findUnique({
        where: { id: productId }
      })
      return NextResponse.json(product)
    } else {
      return NextResponse.json({ error: 'Missing storeId or productId parameter' }, { status: 400 })
    }
  } catch (error) {
    return handleError(error)
  }
}

// Delete a product
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const productId = searchParams.get('productId')

    if (!productId) {
      return NextResponse.json({ error: 'Missing productId parameter' }, { status: 400 })
    }

    await prisma.product.delete({
      where: { id: productId }
    })

    return NextResponse.json({ message: 'Product deleted successfully' })
  } catch (error) {
    return handleError(error)
  }
}

// Generate custom store link
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { storeId, customLink } = body

    const updatedStore = await prisma.store.update({
      where: { id: storeId },
      data: { customLink }
    })

    return NextResponse.json(updatedStore)
  } catch (error) {
    return handleError(error)
  }
}

// Process payment
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { orderId, amount, currency } = body

    // Simulate payment processing
    const paymentId = uuidv4()
    const paymentStatus = 'completed'

    const payment = await prisma.payment.create({
      data: {
        id: paymentId,
        orderId,
        amount,
        currency,
        status: paymentStatus
      }
    })

    return NextResponse.json(payment, { status: 201 })
  } catch (error) {
    return handleError(error)
  }
}