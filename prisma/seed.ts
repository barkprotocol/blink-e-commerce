import { subDays } from "date-fns";
import prisma from "./db";
import { Product, Seller, SellerBlink, Order, ProductPurchaseTransaction, User } from "@prisma/client";

// Function to add sellers to the database
const addSeller = async () => {
  const sellerData = [
    {
      username: "test1",
      walletAddress: "CqEoCwC2GSCVZpBpY15Lrk2JJBCnRUp9qyyFnAUdtQEb",
    },
    {
      username: "test12",
      walletAddress: "RoJosZTJhUV1ysEPWgVfhDqiUGxgFUPjWaGZsPJVX39",
    },
    {
      username: "test2",
      walletAddress: "8oLAcfmq5jZHNxX7EG75SGBJhPdJUJ6LwDAhzwJq1cbJ",
    },
  ];

  for (const data of sellerData) {
    try {
      await prisma.seller.create({
        data: {
          username: data.username,
          walletAddress: data.walletAddress,
        },
      });
    } catch (error) {
      console.error(`Error adding seller ${data.username}:`, error);
    }
  }
};

// Function to add products to the database
const addProduct = async () => {
  const sellerData = [
    {
      username: "test1",
      walletAddress: "CqEoCwC2GSCVZpBpY15Lrk2JJBCnRUp9qyyFnAUdtQEb",
      url: "https://capsapparel.com/cdn/shop/products/SASUKESIDE.jpg?v=1698652673&width=600",
      name: "cap edition 1",
    },
    {
      username: "test12",
      walletAddress: "RoJosZTJhUV1ysEPWgVfhDqiUGxgFUPjWaGZsPJVX39",
      url: "https://capsapparel.com/cdn/shop/files/CHAMPAGNEFRONTBLACK.jpg?v=1689866825&width=800",
      name: "cap edition 2",
    },
    {
      username: "test2",
      walletAddress: "8oLAcfmq5jZHNxX7EG75SGBJhPdJUJ6LwDAhzwJq1cbJ",
      url: "https://capsapparel.com/cdn/shop/files/AKATSUKIBUCKET-Black.jpg?v=1721351545&width=800",
      name: "cap edition 3",
    },
  ];

  try {
    // Example of creating a specific product for the first seller
    const product = await prisma.product.create({
      data: {
        imageUrl: "https://capsapparel.com/cdn/shop/products/teddy-bear-sweater-black.jpg?v=1689860780&width=800",
        description: "Buy This sweater look cool, All are medium sizes",
        label: "Wann look cool they buy this",
        price: "2", // Store as string
        stock: "10", // Store as string
        title: "Teddy Sweater Shirts",
        sellerId: "CqEoCwC2GSCVZpBpY15Lrk2JJBCnRUp9qyyFnAUdtQEb",
        name: "teddy shirt",
      },
    });

    for (const data of sellerData) {
      try {
        await prisma.product.create({
          data: {
            name: data.name,
            imageUrl: data.url,
            description: "Buy This sweater look cool, All are medium sizes",
            label: "Wann look cool they buy this",
            price: "2", // Store as string
            stock: "10", // Store as string
            title: "Teddy Sweater Shirts",
            sellerId: data.walletAddress,
          },
        });
      } catch (error) {
        console.error(`Error adding product for seller ${data.username}:`, error);
      }
    }
  } catch (error) {
    console.error("Error creating product:", error);
  }
};

// Function to create seller blinks
const createSellerBlink = async () => {
  const sellerData = [
    {
      username: "test1",
      walletAddress: "CqEoCwC2GSCVZpBpY15Lrk2JJBCnRUp9qyyFnAUdtQEb",
      image: "https://avatars.githubusercontent.com/u/38688596?s=400&u=537ec3624a74119be8caba48e5ee38610ad1717a&v=4",
    },
    {
      username: "test12",
      walletAddress: "RoJosZTJhUV1ysEPWgVfhDqiUGxgFUPjWaGZsPJVX39",
      image: "https://avatars.githubusercontent.com/u/37742218?v=4",
    },
    {
      username: "test2",
      walletAddress: "8oLAcfmq5jZHNxX7EG75SGBJhPdJUJ6LwDAhzwJq1cbJ",
      image: "https://avatars.githubusercontent.com/u/3412179?v=4",
    },
  ];

  for (const data of sellerData) {
    try {
      await prisma.sellerBlink.create({
        data: {
          title: "Welcome to my store",
          description: "You can buy products which are sold by me",
          icon: data.image,
          label: "This is my inventory blink. You can now book my products from blink itself.",
          sellerWallet: data.walletAddress,
        },
      });

      await prisma.seller.update({
        where: {
          walletAddress: data.walletAddress,
        },
        data: {
          blinkCreated: true,
        },
      });
    } catch (error) {
      console.error(`Error creating seller blink for ${data.username}:`, error);
    }
  }
};

// Function to get a random order count
function getRandomOrderCount(): number {
  const min = 1;
  const max = 10;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to seed orders
async function seedOrders() {
  const sellerWalletAddress = "CqEoCwC2GSCVZpBpY15Lrk2JJBCnRUp9qyyFnAUdtQEb";

  // Get a sample product for creating orders
  const product = await prisma.product.findFirst({
    where: {
      sellerId: sellerWalletAddress,
    },
  });

  if (!product) {
    console.error("No product found for seeding orders.");
    return;
  }

  for (let i = 0; i < 7; i++) {
    const date = subDays(new Date(), i);
    const orderCount = getRandomOrderCount();

    for (let j = 0; j < orderCount; j++) {
      try {
        await prisma.order.create({
          data: {
            name: `Order ${i * 10 + j + 1}`,
            city: "CityName",
            state: "StateName",
            dropOfAddress: "123 Main St",
            ZipCode: "12345",
            orderstatus: "PROCESSING",
            buyerWallet: "3RSq8oquiYftGCcepmUoofxo73Nh7zTWtKVeHet1fzFt",
            productId: product.id,
            sellerId: sellerWalletAddress,
            createdAt: date,
          },
        });
      } catch (error) {
        console.error(`Error creating order ${i * 10 + j + 1}:`, error);
      }
    }
  }

  console.log("Orders seeded successfully!");
}

// Function to create a user
async function createUser() {
  try {
    const userWallet = "3RSq8oquiYftGCcepmUoofxo73Nh7zTWtKVeHet1fzFt";

    await prisma.user.create({
      data: {
        emailAddress: "asdads2@domain.com",
        name: "joey",
        userWallet: userWallet,
      },
    });
  } catch (error) {
    console.error("Error creating user:", error);
  }
}

// Main function to run all seed functions
(async () => {
  await addSeller();
  await addProduct();
  await createSellerBlink();
  await createUser();
  await seedOrders();
})();
