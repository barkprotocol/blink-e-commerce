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
    console.log("Processing POST request with product ID:", params.productid);
    
    // Parse request body
    const body: ActionPostRequest = await req.json();
    let account: PublicKey;
    
    try {
      account = new PublicKey(body.account);
    } catch (error) {
      return Response.json(
        { message: "Invalid public key" } as ActionError,
        { headers: ACTIONS_CORS_HEADERS }
      );
    }
    
    // Fetch product details from the database
    const product = await prisma.product.findUnique({
      where: { id: params.productid },
    });

    if (!product) {
      return Response.json(
        { message: "Product not found" } as ActionError,
        { headers: ACTIONS_CORS_HEADERS }
      );
    }

    // Create transaction
    const connection = getConnection();
    const transaction = new Transaction();
    transaction.add(
      ComputeBudgetProgram.setComputeUnitPrice({ microLamports: 5000 }),
      new TransactionInstruction({
        programId: new PublicKey(MEMO_PROGRAM_ID),
        keys: [],
        data: Buffer.from(JSON.stringify(params), "utf-8"),
      })
    );

    transaction.feePayer = account;
    transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;

    // Prepare the next action link
    let next: NextActionLink = {
      type: "inline",
      action: {
        icon: product.imageUrl || "https://avatars.githubusercontent.com/u/37742218?v=4",
        description: `${product.description}, Available stock: ${product.stock}` || "No description available",
        label: product.label || "No label available",
        title: product.title || "No title available",
        type: "action",
        links: {
          actions: [
            {
              label: `Purchase product for ${product.price || "1"} SOL`,
              href: `/api/actions/${params.username}/product/${params.productid}/purchase?name={name}&email={email}&address={address}&state={state}&zipcode={zipcode}&city={city}&amount=${product.price}`,
              parameters: [
                {
                  name: "name",
                  label: "Enter your name",
                  required: true,
                  patternDescription: "Ex: Joey",
                },
                {
                  name: "email",
                  label: "Enter your email",
                  required: true,
                  patternDescription: "Ex: hello@xxx.com",
                },
                {
                  name: "address",
                  label: "Enter your address",
                  required: true,
                  patternDescription: "Ex: Woodland Street",
                },
                {
                  name: "state",
                  label: "Enter your state",
                  required: true,
                  patternDescription: "Ex: Ohio",
                },
                {
                  name: "city",
                  label: "Enter your city",
                  required: true,
                  patternDescription: "Ex: Cleveland",
                },
                {
                  name: "zipcode",
                  label: "Enter your zip code",
                  required: true,
                  patternDescription: "Ex: 44129",
                },
              ],
            },
          ],
        },
      },
    };

    // Create and return the response
    const payload = await createPostResponse({
      fields: {
        transaction,
        message: "",
        links: { next },
      },
    });

    return Response.json(payload, { headers: ACTIONS_CORS_HEADERS });

  } catch (error) {
    console.error("Error processing request:", error);
    return Response.json(
      { message: "Error processing request" } as ActionError,
      { headers: ACTIONS_CORS_HEADERS }
    );
  }
};
