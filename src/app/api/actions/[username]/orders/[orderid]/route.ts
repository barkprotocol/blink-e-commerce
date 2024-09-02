import {
  ActionError,
  ActionPostRequest,
  ACTIONS_CORS_HEADERS,
  createActionHeaders,
  createPostResponse,
  MEMO_PROGRAM_ID,
  NextActionLink,
} from "@solana/actions";
import { getConnection } from "@/lib/constants";
import {
  ComputeBudgetProgram,
  PublicKey,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import prisma from "prisma/db";

const headers = createActionHeaders();

export const OPTIONS = () => {
  return Response.json(
    { message: "" } as ActionError,
    { headers }
  );
};

export const POST = async (
  req: Request,
  { params }: { params: { username: string; orderid: string } }
) => {
  try {
    // Parse request body
    const body: ActionPostRequest = await req.json();

    // Validate and create account PublicKey
    let account: PublicKey;
    try {
      account = new PublicKey(body.account);
    } catch (error) {
      return Response.json(
        { message: "Invalid public key" } as ActionError,
        { headers: ACTIONS_CORS_HEADERS }
      );
    }

    // Fetch order details from the database
    const order = await prisma.order.findUnique({
      where: { id: params.orderid },
      include: { product: true },
    });

    if (!order) {
      return Response.json(
        { message: "Order not found" } as ActionError,
        { headers }
      );
    }

    // Create next action link
    const next: NextActionLink = {
      type: "inline",
      action: {
        icon: order.product.imageUrl,
        description: order.product.description,
        label: order.product.label,
        title: order.product.title,
        type: "action",
        links: {
          actions: [
            {
              label: "Cancel Order",
              href: `/api/actions/${params.username}/orders/${params.orderid}/refund`,
            },
          ],
        },
      },
    };

    // Create and sign Solana transaction
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

    // Create response payload
    const payload = await createPostResponse({
      fields: {
        transaction,
        links: { next },
      },
    });

    return Response.json(payload, { headers });
  } catch (error) {
    console.error("Error in POST request:", error);
    return Response.json(
      { message: "An error occurred while processing your request" } as ActionError,
      { headers }
    );
  }
};
