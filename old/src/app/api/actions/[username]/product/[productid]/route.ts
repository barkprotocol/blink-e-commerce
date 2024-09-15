import {
  ActionError,
  ActionPostRequest,
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

export const OPTIONS = () => {
  return Response.json(null, {
    headers: ACTIONS_CORS_HEADERS,
  });
};

export const POST = async (
  req: Request,
  {
    params,
  }: {
    params: {
      username: string;
      productid: string;
    };
  }
) => {
  try {
    const url = new URL(req.url);
    console.log("Processing POST request with URL:", req.url);
    console.log("Request parameters:", params);

    // Parse the request body
    const body: ActionPostRequest = await req.json();
    console.log("Request body:", body);

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

    // Retrieve product details
    const product = await prisma.product.findUnique({
      where: {
        id: params.productid,
      },
    });

    if (!product) {
      return Response.json(
        { message: "Product not found" } as ActionError,
        {
          headers: ACTIONS_CORS_HEADERS,
        }
      );
    }

    const connection = getConnection();
    const transaction = new Transaction();

    // Add compute budget instruction
    transaction.add(
      ComputeBudgetProgram.setComputeUnitPrice({
        microLamports: 5000,
      }),
      new TransactionInstruction({
        programId: new PublicKey(MEMO_PROGRAM_ID),
        keys: [],
        data: Buffer.from(JSON.stringify(params), "utf-8"),
      })
    );

    // Set fee payer and recent blockhash
    transaction.feePayer = account;
    transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;

    // Construct the next action link
    const next: NextActionLink = {
      type: "inline",
      action: {
        icon:
          product?.imageUrl ||
          "https://avatars.githubusercontent.com/u/37742218?v=4",
        description: `Description: ${product?.description || "N/A"}, Available stock: ${product?.stock || "N/A"}`,
        label: product?.label || "Product",
        title: product?.title || "Product Title",
        type: "action",
        links: {
          actions: [
            {
              label: `Purchase product for ${product?.price || "1"} SOL`,
              href: `/api/actions/${params.username}/product/${params.productid}/purchase?name={name}&email={email}&address={address}&state={state}&zipcode={zipcode}&city={city}&amount=${product.price}`,
              parameters: [
                { name: "name", label: "Enter your name", required: true, patternDescription: "Ex: JOEY" },
                { name: "email", label: "Enter your email", required: true, patternDescription: "Ex: hello@xxx.com" },
                { name: "address", label: "Enter your address", required: true, patternDescription: "Ex: Woodland Street" },
                { name: "state", label: "Enter your state", required: true, patternDescription: "Ex: Ohio" },
                { name: "city", label: "Enter your city", required: true, patternDescription: "Ex: Cleveland" },
                { name: "zipcode", label: "Enter your zip code", required: true, patternDescription: "Ex: 44129" },
              ],
            },
          ],
        },
      },
    };

    // Create the response payload
    const payload = await createPostResponse({
      fields: {
        transaction,
        message: "",
        links: {
          next,
        },
      },
    });

    return Response.json(payload, {
      headers: ACTIONS_CORS_HEADERS,
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return Response.json(
      {
        message: "Error processing request",
        details: error instanceof Error ? error.message : "Unknown error",
      } as ActionError,
      {
        headers: ACTIONS_CORS_HEADERS,
      }
    );
  }
};
