import { subDays } from "date-fns";
import prisma from "./db";

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
      walletAddress: "8oLAcfmq5jZHNxX7EG75SGBJhPdJUJ6LwDAhzwJq1cbJ",
      username: "test2",
    },
  ];

  await Promise.all(sellerData.map(data => 
    prisma.seller.create({
      data: {
        username: data.username,
        walletAddress: data.walletAddress,
      },
    })
  ));
};

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
      walletAddress: "8oLAcfmq5jZHNxX7EG75SGBJhPdJUJ6LwDAhzwJq1cbJ",
      username: "test2",
      url: "https://capsapparel.com/cdn/shop/files/AKATSUKIBUCKET-Black.jpg?v=1721351545&width=800",
      name: "cap edition 2",
    },
  ];

  console.log("inside add product");
  try {
    const initialProduct = await prisma.product.create({
      data: {
        imageUrl: "https://capsapparel.com/cdn/shop/products/teddy-bear-sweater-black.jpg?v=1689860780&width=800",
        description: "Buy This sweater look cool, All are medium sizes",
        label: "Wann look cool they buy this",
        price: 2, // Decimal
        stock: 10, // Integer
        title: "Teddy Sweater Shirts",
        sellerId: "CqEoCwC2GSCVZpBpY15Lrk2JJBCnRUp9qyyFnAUdtQEb",
        name: "teddy shirt",
      },
    });

    await Promise.all(sellerData.map(data =>
      prisma.product.create({
        data: {
          name: data.name,
          imageUrl: data.url,
          description: "Buy This sweater look cool, All are medium sizes",
          label: "Wann look cool they buy this",
          price: 2, // Decimal
          stock: 10, // Integer
          title: "Teddy Sweater Shirts",
          sellerId: data.walletAddress,
        },
      })
    ));
  } catch (error) {
    console.log("Error adding product:", error);
  }
};

const createSellerBlink = async () => {
  try {
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
        walletAddress: "8oLAcfmq5jZHNxX7EG75SGBJhPdJUJ6LwDAhzwJq1cbJ",
        username: "test2",
        image: "https://avatars.githubusercontent.com/u/3412179?v=4",
      },
    ];

    console.log("inside create blink");