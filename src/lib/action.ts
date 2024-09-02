"use server";

import prisma from "prisma/db";
import {
  ProductInput,
  SellerBlinkInput,
  SellerInput,
  UserInput,
} from "./validation";
import {
  subDays,
  startOfDay,
  endOfDay,
  format,
  eachDayOfInterval,
} from "date-fns";

export const createSellerProduct = async (
  sellerWallet: string,
  productData: ProductInput
) => {
  try {
    const seller = await prisma.seller.findUnique({
      where: {
        walletAddress: sellerWallet,
      },
    });

    if (!seller) {
      return {
        message: "Seller not present; cannot add the product.",
      };
    }

    const product = await prisma.product.create({
      data: {
        ...productData,
        sellerId: seller.walletAddress,
      },
    });

    return {
      msg: "Product created successfully",
      product,
      err: false,
    };
  } catch (error) {
    console.error("Error creating product:", error);
    return {
      msg: "Something went wrong while creating the product.",
      err: true,
    };
  }
};

export const createSeller = async (sellerData: SellerInput) => {
  try {
    const sellerExists = await prisma.seller.findUnique({
      where: {
        walletAddress: sellerData.walletAddress,
      },
    });

    if (sellerExists) {
      return { msg: "Wallet address already taken", err: true };
    }

    const seller = await prisma.seller.create({
      data: sellerData,
    });

    return {
      msg: "Account created successfully",
      seller,
      err: false,
    };
  } catch (error) {
    console.error("Error creating seller account:", error);
    return {
      msg: "Something went wrong while creating the seller account.",
      err: true,
    };
  }
};

export const doNothing = async () => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Inside server action");
    return { msg: "Hello" };
  } catch (error) {
    console.error("Error in doNothing function:", error);
    return { msg: "Error", err: true };
  }
};

export const createUser = async (userData: UserInput) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        userWallet: userData.walletAddress,
      },
    });

    if (user) {
      return {
        msg: "User already present",
        err: true,
      };
    }

    const newUser = await prisma.user.create({
      data: {
        emailAddress: userData.emailAddress,
        userWallet: userData.walletAddress,
        name: userData.name,
      },
    });

    return {
      msg: "User created successfully",
      err: false,
      newUser,
    };
  } catch (error) {
    console.error("Error creating user:", error);
    return {
      msg: "Error",
      err: true,
    };
  }
};

export const createSellerBlink = async (sellerBlinkData: SellerBlinkInput) => {
  try {
    const seller = await prisma.seller.findUnique({
      where: {
        walletAddress: sellerBlinkData.sellerWallet,
      },
    });

    if (!seller) {
      return { msg: "First create a seller account", err: true };
    }

    if (seller.blinkCreated) {
      return {
        msg: "Blink already created; update if needed.",
        err: true,
      };
    }

    const sellerBlink = await prisma.sellerBlink.create({
      data: sellerBlinkData,
    });

    await prisma.seller.update({
      where: {
        walletAddress: seller.walletAddress,
      },
      data: {
        blinkCreated: true,
      },
    });

    return {
      msg: "Blink created for the user",
      data: sellerBlink,
      err: false,
    };
  } catch (error) {
    console.error("Error creating blink:", error);
    return { msg: "Something went wrong while creating blink", err: true };
  }
};

export const checkSellerUsername = async (username?: string) => {
  try {
    if (!username) {
      return {
        msg: "Username input required",
        err: true,
      };
    }

    const data = await prisma.seller.findUnique({
      where: {
        username,
      },
    });

    if (data) {
      return {
        msg: "Username already taken",
        err: true,
      };
    }

    return {
      msg: "Username not taken",
      err: false,
    };
  } catch (error) {
    console.error("Error checking seller username:", error);
    return {
      msg: "Something went wrong",
      err: true,
    };
  }
};

export const checkSellerPresent = async (address: string) => {
  try {
    if (!address) {
      return {
        msg: "Address input required",
        err: true,
        user: false,
      };
    }

    const data = await prisma.seller.findUnique({
      where: {
        walletAddress: address,
      },
    });

    if (!data) {
      return {
        msg: "Seller not present",
        user: false,
        err: false,
      };
    }

    return {
      msg: "Seller present",
      err: false,
      user: data,
    };
  } catch (error) {
    console.error("Error checking if seller is present:", error);
    return {
      msg: "Something went wrong",
      err: true,
    };
  }
};

export const getTheUser = async (address: string) => {
  try {
    const user = await prisma.seller.findUnique({
      where: {
        walletAddress: address,
      },
    });

    if (!user) {
      return {
        msg: "No seller present in the database",
        err: true,
      };
    }

    return {
      msg: "Successfully fetched",
      err: false,
      data: user,
    };
  } catch (error) {
    console.error("Error fetching seller:", error);
    return {
      msg: "Something went wrong",
      err: true,
    };
  }
};

export const getSellerBlink = async (address: string) => {
  try {
    const data = await prisma.sellerBlink.findUnique({
      where: {
        sellerWallet: address,
      },
    });

    if (!data) {
      return {
        msg: "Seller hasn't created a blink yet",
        err: true,
        blink: null,
      };
    }

    return {
      msg: "Successfully fetched",
      err: false,
      blink: data,
    };
  } catch (error) {
    console.error("Error fetching seller blink:", error);
    return {
      msg: "Something went wrong",
      err: true,
      blink: null,
    };
  }
};

interface UpdateInput {
  title?: string;
  description?: string;
  label?: string;
  icon?: string;
}

export const updateSellerBlink = async (data: UpdateInput, address: string) => {
  try {
    const blink = await prisma.sellerBlink.findUnique({
      where: {
        sellerWallet: address,
      },
    });

    if (!blink) {
      return {
        msg: "User wallet not found",
        err: true,
      };
    }

    const updatedBlink = await prisma.sellerBlink.update({
      where: {
        sellerWallet: address,
      },
      data,
    });

    return {
      msg: "Successfully updated",
      err: false,
    };
  } catch (error) {
    console.error("Error updating seller blink:", error);
    return {
      msg: "Update went wrong",
      err: true,
    };
  }
};

export const getAllProducts = async (pubkey: string) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        sellerId: pubkey,
      },
    });

    return {
      msg: "Successfully fetched",
      err: false,
      data: products,
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      msg: "Something went wrong",
      err: true,
    };
  }
};

export const editProduct = async (
  productId: string,
  productData: ProductInput
) => {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      return {
        msg: "Product not present",
        err: true,
      };
    }

    const updatedProduct = await prisma.product.update({
      where: {
        id: productId,
      },
      data: productData,
    });

    return {
      msg: "Product updated successfully",
      err: false,
      data: updatedProduct,
    };
  } catch (error) {
    console.error("Error updating product:", error);
    return {
      msg: "Something went wrong",
      err: true,
    };
  }
};

export const updateOrderStatus = async (orderId: string, newStatus: string) => {
  try {
    await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        orderstatus: newStatus,
      },
    });

    return {
      msg: "Order status updated successfully",
      err: false,
    };
  } catch (error) {
    console.error("Error updating order status:", error);
    return {
      msg: `Something went wrong: ${error.message}`,
      err: true,
    };
  }
};

export const getOrderBySeller = async (sellerId: string) => {
  try {
    const orders = await prisma.order.findMany({
      where: {
        product: {
          sellerId,
        },
      },
      include: {
        user: true,
        product: true,
      },
    });

    return {
      msg: "Successfully fetched",
      err: false,
      data: orders,
    };
  } catch (error) {
    console.error("Error fetching orders by seller:", error);
    return {
      msg: "Something went wrong",
      err: true,
    };
  }
};

export const deleteProduct = async (productId: string) => {
  try {
    await prisma.product.delete({
      where: {
        id: productId,
      },
    });

    return {
      msg: "Product deleted successfully",
      err: false,
    };
  } catch (error) {
    console.error("Error deleting product:", error);
    return {
      msg: "Something went wrong",
      err: true,
    };
  }
};

export async function getSellerOrdersOf7Days(sellerAddress: string) {
  try {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 6); // 7 days including today

    const result: { [key: string]: { count: number; totalPrice: number } } = {};
    const days = eachDayOfInterval({ start: startDate, end: endDate });

    days.forEach((day) => {
      const formattedDate = format(day, "yyyy-MM-dd");
      result[formattedDate] = { count: 0, totalPrice: 0 };
    });

    const orders = await prisma.order.findMany({
      where: {
        sellerId: sellerAddress,
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        product: true,
      },
    });

    orders.forEach((order) => {
      const orderDate = format(order.createdAt, "yyyy-MM-dd");
      const productPrice = parseFloat(order.product.price);

      if (!result[orderDate]) {
        result[orderDate] = { count: 0, totalPrice: 0 };
      }

      result[orderDate].count += 1;
      result[orderDate].totalPrice += productPrice;
    });

    const totalOrders = Object.values(result).reduce(
      (sum, day) => sum + day.count,
      0
    );
    const finalTotalPrice = Object.values(result).reduce(
      (sum, day) => sum + day.totalPrice,
      0
    );

    const formattedResult = Object.entries(result).map(([date, data]) => ({
      date,
      orders: data.count,
      totalPrice: data.totalPrice,
    }));

    return {
      totalOrders,
      dailyCounts: formattedResult,
      finalTotalPrice,
    };
  } catch (error) {
    console.error("Error fetching seller orders of the last 7 days:", error);
    return {
      msg: "Something went wrong",
      err: true,
    };
  }
}

export async function getRecentOrders(address: string) {
  try {
    const orders = await prisma.order.findMany({
      where: {
        sellerId: address,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    });

    return {
      msg: "Orders fetched successfully",
      err: false,
      data: orders,
    };
  } catch (error) {
    console.error("Error fetching recent orders:", error);
    return {
      msg: "Error occurred",
      err: true,
      data: null,
    };
  }
}
