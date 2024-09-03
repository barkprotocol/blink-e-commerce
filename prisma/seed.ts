import { PrismaClient } from "@prisma/client";

// Create a singleton PrismaClient instance
const prisma = new PrismaClient();

async function main() {
  try {
    // Seed users
    const user1 = await prisma.user.create({
      data: {
        walletAddress: "user-wallet-address-1",
        name: "User One",
        emailAddress: "userone@example.com",
      },
    });

    const user2 = await prisma.user.create({
      data: {
        walletAddress: "user-wallet-address-2",
        name: "User Two",
        emailAddress: "usertwo@example.com",
      },
    });

    // Seed sellers
    const seller1 = await prisma.seller.create({
      data: {
        username: "sellerone",
        walletAddress: "seller-wallet-address-1",
        blinkCreated: true,
      },
    });

    const seller2 = await prisma.seller.create({
      data: {
        username: "sellertwo",
        walletAddress: "seller-wallet-address-2",
        blinkCreated: false,
      },
    });

    // Seed products using create for individual records
    const product1 = await prisma.product.create({
      data: {
        name: "Product1",
        title: "Product 1",
        description: "Description for Product 1",
        label: "Label1",
        imageUrl: "http://example.com/image1.jpg",
        price: 100.00,
        stock: 10,
        sellerId: seller1.walletAddress,
      },
    });

    const product2 = await prisma.product.create({
      data: {
        name: "Product2",
        title: "Product 2",
        description: "Description for Product 2",
        label: "Label2",
        imageUrl: "http://example.com/image2.jpg",
        price: 200.00,
        stock: 20,
        sellerId: seller2.walletAddress,
      },
    });

    // Seed orders
    await prisma.order.create({
      data: {
        name: "Order1",
        city: "CityName",
        state: "StateName",
        dropOffAddress: "BARK Main St",
        zipCode: "12345",
        orderStatus: "PROCESSING",
        buyerWallet: user1.walletAddress,
        productId: product1.id,
        sellerId: seller1.walletAddress,
      },
    });

  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
