import { subDays } from "date-fns";
import prisma from "./db";
import { Product } from "@prisma/client";

// Define a variable to hold the product ID globally
let productid: Product;

/**
 * Add sellers to the database.
 * Each seller is identified by a username and a wallet address.
 */
const addSeller = async () => {
  const sellerData = [
    {
      username: "test1",
      walletAddress: "DLgacSweX6fmAbnzwoFnVwcuGRMwFvdCzzwhrXuE5pPc",
    },
    {
      username: "test12",
      walletAddress: "6wtjr73tjd8Fwqoy3N3PEvGWnWoUmMRCDEQPdNR6P2V",
    },
    {
      username: "test2",
      walletAddress: "AHGQshvqZyqfxJbgWhDrMkACVkmHkbn7kkQQ9kkiqSk3",
    },
  ];

  // Iterate over the seller data and add each seller to the database
  for (const data of sellerData) {
    await prisma.seller.create({
      data: {
        username: data.username,
        walletAddress: data.walletAddress,
      },
    });
  }
};

/**
 * Add products to the database.
 * Products are associated with sellers and have details like name, image URL, and price.
 */
const addProduct = async () => {
  const sellerData = [
    {
      username: "test1",
      walletAddress: "DLgacSweX6fmAbnzwoFnVwcuGRMwFvdCzzwhrXuE5pPc",
      url: "https://capsapparel.com/cdn/shop/products/SASUKESIDE.jpg?v=1698652673&width=600",
      name: "cap edition 1",
    },
    {
      username: "test12",
      walletAddress: "6wtjr73tjd8Fwqoy3N3PEvGWnWoUmMRCDEQPdNR6P2V",
      url: "https://capsapparel.com/cdn/shop/files/CHAMPAGNEFRONTBLACK.jpg?v=1689866825&width=800",
      name: "cap edition 2",
    },
    {
      username: "test2",
      walletAddress: "AHGQshvqZyqfxJbgWhDrMkACVkmHkbn7kkQQ9kkiqSk3",
      url: "https://capsapparel.com/cdn/shop/files/AKATSUKIBUCKET-Black.jpg?v=1721351545&width=800",
      name: "cap edition 2",
    },
  ];

  console.log("inside add product");

  try {
    // Add a default product
    productid = await prisma.product.create({
      data: {
        imageUrl: "https://capsapparel.com/cdn/shop/products/teddy-bear-sweater-black.jpg?v=1689860780&width=800",
        description: "Buy This sweater look cool, All are medium sizes",
        label: "Want to look cool? Buy this",
        price: "2",
        stock: "10",
        title: "BARK Sweater Shirts",
        sellerId: "DLgacSweX6fmAbnzwoFnVwcuGRMwFvdCzzwhrXuE5pPc",
        name: "BARK shirt",
      },
    });

    // Add products based on the seller data
    for (const data of sellerData) {
      await prisma.product.create({
        data: {
          name: data.name,
          imageUrl: data.url,
          description: "Buy This BARK cap and look stylish. All are one size fits all.",
          label: "Look stylish with this cap",
          price: "2",
          stock: "10",
          title: data.name,
          sellerId: data.walletAddress,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

/**
 * Create Seller Blinks.
 * A "Blink" is a personalized store page for each seller.
 */
const createSellerBlink = async () => {
  try {
    const sellerData = [
      {
        username: "test1",
        walletAddress: "DLgacSweX6fmAbnzwoFnVwcuGRMwFvdCzzwhrXuE5pPc",
        image: "https://avatars.githubusercontent.com/u/38688596?s=400&u=537ec3624a74119be8caba48e5ee38610ad1717a&v=4",
      },
      {
        username: "test12",
        walletAddress: "6wtjr73tjd8Fwqoy3N3PEvGWnWoUmMRCDEQPdNR6P2V",
        image: "https://avatars.githubusercontent.com/u/37742218?v=4",
      },
      {
        username: "test2",
        walletAddress: "AHGQshvqZyqfxJbgWhDrMkACVkmHkbn7kkQQ9kkiqSk3",
        image: "https://avatars.githubusercontent.com/u/3412179?v=4",
      },
    ];

    console.log("inside create Blink");

    // Create blinks for each seller
    for (const data of sellerData) {
      await prisma.sellerBlink.create({
        data: {
          title: "Welcome to my store",
          description: "You can buy products which are sold by me",
          icon: data.image,
          label: "This is my inventory blink, you can now book my products directly from this blink",
          sellerWallet: data.walletAddress,
        },
      });

      // Update seller's blink creation status
      await prisma.seller.update({
        where: {
          walletAddress: data.walletAddress,
        },
        data: {
          blinkCreated: true,
        },
      });
    }
  } catch (error) {
    console.log("error is", error);
  }
};

/**
 * Generate random order counts.
 */
function getRandomOrderCount(): number {
  const min = 1;
  const max = 10;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Seed orders for testing purposes.
 */
async function seedOrders() {
  for (let i = 0; i < 7; i++) {
    const date = subDays(new Date(), i);
    const orderCount = getRandomOrderCount();

    for (let j = 0; j < orderCount; j++) {
      await prisma.order.create({
        data: {
          name: `Order ${i * 10 + j + 1}`,
          city: "CityName",
          state: "StateName",
          dropOfAddress: "BARK Main St",
          ZipCode: "12345",
          orderstatus: "PROCESSING",
          buyerWallet: "3RSq8oquiYftGCcepmUoofxo73Nh7zTWtKVeHet1fzFt",
          productId: productid.id,
          sellerId: "DLgacSweX6fmAbnzwoFnVwcuGRMwFvdCzzwhrXuE5pPc",
          createdAt: date,
        },
      });
    }
  }

  console.log("Orders seeded successfully!");
}

/**
 * Create a user for testing purposes.
 */
async function createUser() {
  try {
    const user = "3RSq8oquiYftGCcepmUoofxo73Nh7zTWtKVeHet1fzFt";

    await prisma.user.create({
      data: {
        emailAddress: "bark1@",
        name: "BARK",
        userWallet: user,
      },
    });
  } catch (error) {
    console.log(error);
  }
}

/**
 * Main function to run all the above functions sequentially.
 */
(async () => {
  await addSeller();
  await addProduct();
  await createSellerBlink();
  await createUser();
  await seedOrders();
})();
