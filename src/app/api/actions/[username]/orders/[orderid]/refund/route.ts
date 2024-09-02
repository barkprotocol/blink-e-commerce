import { trimUuidToHalf } from "@/lib/helpers";
import {
  ActionError,
  ActionPostRequest,
  createActionHeaders,
  createPostResponse,
} from "@solana/actions";
import { PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { getConnection } from "@/lib/constants";
import prisma from "prisma/db";
import { program } from "anchor/setup";

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
    console.log("Handling refund request");

    // Parse request body
    const body: ActionPostRequest = await req.json();

    // Validate and create PublicKey for account
    let account: PublicKey;
    try {
      account = new PublicKey(body.account);
    } catch (error) {
      return Response.json(
        { message: 'Invalid "account" provided' } as ActionError,
        { headers }
      );
    }

    console.log("Account PublicKey:", account.toBase58());

    // Fetch order details from the database
    const order = await prisma.order.findUnique({
      where: { id: params.orderid },
    });

    console.log("Fetched order:", order);

    if (!order || order.orderstatus !== "PROCESSING") {
      return Response.json(
        { message: "Order not found or not in a refundable state" } as ActionError,
        { headers }
      );
    }

    // Generate program addresses
    const message = trimUuidToHalf(order.id);
    const orderPda = PublicKey.findProgramAddressSync(
      [Buffer.from("order"), new PublicKey(body.account).toBuffer(), Buffer.from(message)],
      program.programId
    )[0];

    const orderVault = PublicKey.findProgramAddressSync(
      [Buffer.from("orderVault"), orderPda.toBuffer()],
      program.programId
    )[0];

    console.log("Order PDA:", orderPda.toBase58());
    console.log("Order Vault PDA:", orderVault.toBase58());

    // Create transaction instruction for canceling the order
    const anchorInstruction = await program.methods
      .cancelOrder(message)
      .accountsPartial({
        order: orderPda,
        orderVault,
        user: account,
        systemProgram: SystemProgram.programId,
      })
      .instruction();

    // Prepare transaction
    const connection = getConnection();
    const transaction = new Transaction().add(anchorInstruction);

    transaction.feePayer = account;
    transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;

    // Create and return response payload
    const payload = await createPostResponse({
      fields: {
        transaction,
        message: "Amount released",
        links: {
          next: {
            type: "post",
            href: `/api/actions/refunddone?orderid=${order.id}`,
          },
        },
      },
    });

    return Response.json(payload, { headers });
  } catch (error) {
    console.error("Error processing refund request:", error);
    return Response.json(
      { message: "An error occurred while processing the refund" } as ActionError,
      { headers }
    );
  }
};
