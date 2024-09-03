import {
  ActionError,
  ActionGetResponse,
  ActionPostRequest,
  ActionPostResponse,
  ACTIONS_CORS_HEADERS,
  createPostResponse,
  MEMO_PROGRAM_ID,
  NextActionLink,
} from "@solana/actions";
import {
  ComputeBudgetProgram,
  PublicKey,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";

import { getConnection } from "@/lib/constants";
import prisma from "prisma/db";

export const GET = async (
  req: Request,
  {
    params,
  }: {
    params: {
      username: string;
    };
  }
) => {
  try {
    const seller = await prisma.seller.findUnique({
      where: {
        username: params.username,
      },
      include: {
        blink: true,
      },
    });

    if (!seller || !seller.blinkCreated || !seller.blink) {
      return Response.json(
        {
          message: "User not found",
        } as ActionError,
        {
          headers: ACTIONS_CORS_HEADERS,
        }
      );
    }

    const payload: ActionGetResponse = {
      icon: seller.blink.icon,
      title: seller.blink.title,
      label: seller.blink.label,
      description: seller.blink.description,
      links: {
        actions: [
          {
            href: `/api/actions/${params.username}?navigate=products`,
            label: "Checkout to products",
          },
          {
            href: `/api/actions/${params.username}?navigate=orders`,
            label: "Check your orders",
          },
        ],
      },
    };

    return Response.json(payload, {
      headers: ACTIONS_CORS_HEADERS,
    });
  } catch (error) {
    console.error("Error fetching seller details:", error);
    return Response.json(
      { message: "Something went wrong" } as ActionError,
      {
        headers: ACTIONS_CORS_HEADERS,
      }
    );
  }
};

export const OPTIONS = GET;

export const POST = async (req: Request, { params }: any) => {
  try {
    const url = new URL(req.url);
    const route = url.searchParams.get("navigate");

    if (!route) {
      return Response.json(
        { message: "No route specified" } as ActionError,
        {
          headers: ACTIONS_CORS_HEADERS,
        }
      );
    }

    const seller = await prisma.seller.findUnique({
      where: {
        username: params.username,
      },
      include: {
        blink: true,
      },
    });

    if (!seller || !seller.blinkCreated || !seller.blink) {
      return Response.json(
        {
          message: "User not found",
        } as ActionError,
        {
          headers: ACTIONS_CORS_HEADERS,
        }
      );
    }

    const body: ActionPostRequest = await req.json();

    let account: PublicKey;
    try {
      account = new PublicKey(body.account);
    } catch (error) {
      return Response.json(
        {
          message: "Invalid public key",
        } as ActionError,
        {
          headers: ACTIONS_CORS_HEADERS,
        }
      );
    }

    console.log("Fetching products and orders");
    const products = await prisma.product.findMany({
      where: {
        sellerId: seller.walletAddress,
      },
    });

    const orders = await prisma.order.findMany({
      where: {
        buyerWallet: body.account,
        orderStatus: "PROCESSING",
      },
      include: {
        product: true,
      },
    });

    let nextLink: NextActionLink = {
      type: "inline",
      action: {
        icon: "",
        description: "",
        label: "",
        title: "",
        type: "action",
        links: {
          actions: [],
        },
      },
    };

    if (route === "products") {
      if (products.length === 0) {
        nextLink = {
          type: "inline",
          action: {
            type: "completed",
            icon: "https://imgs.search.brave.com/mTigptQqts4F_6klqySaDOFw3rN35C_WULPGgqdB1Jg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTMy/NjE5NjkyMS9waG90/by9vcGVuZWQtZW1w/dHktY2FyZGJvYXJk/LWJveC1vbi1ncmVl/bi5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9d1k3eUpiZjFB/WDhuLXNMb2lpRHNI/c1pfS2RBRXpGdW40/RWpoczJnQXZhWT0",
            title: "Products Empty",
            description: "This seller is not selling anything.",
            label: "Nothing to show here",
          },
        };
      } else {
        nextLink = {
          type: "inline",
          action: {
            icon: seller.blink.icon,
            description: seller.blink.description,
            label: seller.blink.label,
            title: seller.blink.title,
            type: "action",
            links: {
              actions: [
                {
                  href: `/api/actions/${params.username}/product/{productId}`,
                  label: "Select Product",
                  parameters: [
                    {
                      type: "select",
                      name: "productId",
                      label: "Select the product",
                      options: products.map((data) => ({
                        label: data.name,
                        value: data.id,
                      })),
                    },
                  ],
                },
              ],
            },
          },
        };
      }
    } else if (route === "orders") {
      if (orders.length === 0) {
        nextLink = {
          type: "inline",
          action: {
            type: "completed",
            icon: "https://imgs.search.brave.com/mTigptQqts4F_6klqySaDOFw3rN35C_WULPGgqdB1Jg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTMy/NjE5NjkyMS9waG90/by9vcGVuZWQtZW1w/dHktY2FyZGJvYXJk/LWJveC1vbi1ncmVl/bi5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9d1k3eUpiZjFB/WDhuLXNMb2lpRHNI/c1pfS2RBRXpGdW40/RWpoczJnQXZhWT0",
            title: "You don't have any orders",
            description: "Please buy from someone's inventory to check orders.",
            label: "Nothing to show here",
          },
        };
      } else {
        nextLink = {
          type: "inline",
          action: {
            icon: seller.blink.icon,
            description:
              "Orders with only processing status can be viewed here and can be canceled.",
            label: "You can check your processing orders and cancel them",
            title: "Check out your orders",
            type: "action",
            links: {
              actions: [
                {
                  href: `/api/actions/${params.username}/orders/{orderid}`,
                  label: "Select Order",
                  parameters: [
                    {
                      type: "select",
                      name: "orderid",
                      label: "Select orders",
                      options: orders.map((data) => ({
                        label: data.product.name,
                        value: data.id,
                      })),
                    },
                  ],
                },
              ],
            },
          },
        };
      }
    }

    const connection = getConnection();
    const transaction = new Transaction();
    transaction.add(
      ComputeBudgetProgram.setComputeUnitPrice({
        microLamports: 5,
      }),
      new TransactionInstruction({
        programId: new PublicKey(MEMO_PROGRAM_ID),
        keys: [],
        data: Buffer.from(route, "utf-8"),
      })
    );

    transaction.feePayer = account;
    transaction.recentBlockhash = (
      await connection.getLatestBlockhash()
    ).blockhash;

    const payload: ActionPostResponse = await createPostResponse({
      fields: {
        transaction,
        message: "All good",
        links: {
          next: nextLink,
        },
      },
    });

    return Response.json(payload, {
      headers: ACTIONS_CORS_HEADERS,
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return Response.json(
      { message: "Something went wrong" } as ActionError,
      {
        headers: ACTIONS_CORS_HEADERS,
      }
    );
  }
};
