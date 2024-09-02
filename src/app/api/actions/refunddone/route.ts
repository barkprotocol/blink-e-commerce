import {
  ActionError,
  CompletedAction,
  createActionHeaders,
  NextActionPostRequest,
} from "@solana/actions";
import {
  PublicKey,
  ParsedTransaction,
} from "@solana/web3.js";
import { getConnection } from "@/lib/constants";
import { trimUuidToHalf } from "@/lib/helpers";
import prisma from "prisma/db";
import { program, programId } from "anchor/setup";

const headers = createActionHeaders();

export const GET = async (req: Request) => {
  return Response.json({ message: "Method not supported" } as ActionError, {
    status: 403,
    headers,
  });
};

export const OPTIONS = async () => Response.json(null, { headers });

export const POST = async (req: Request) => {
  try {
    const body: NextActionPostRequest = await req.json();
    console.log("Received request body:", body);

    const url = new URL(req.url);
    const account = new PublicKey(body.account);
    const signature = body.signature;

    if (!signature) {
      throw new Error('Invalid "signature" provided');
    }

    const orderId = new URLSearchParams(url.search).get("orderid");
    if (!orderId) {
      return Response.json(
        { message: "Order ID is required" } as ActionError,
        { status: 400, headers }
      );
    }

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { product: true },
    });

    if (!order) {
      return Response.json(
        { message: "Order not found" } as ActionError,
        { status: 400, headers }
      );
    }

    const connection = getConnection();
    const transaction = await connection.getParsedTransaction(signature, "confirmed");

    if (!transaction) {
      return Response.json(
        { message: "Transaction not found or not confirmed" } as ActionError,
        { status: 400, headers }
      );
    }

    const message = trimUuidToHalf(orderId);
    const orderPda = PublicKey.findProgramAddressSync(
      [Buffer.from("order"), account.toBuffer(), Buffer.from(message)],
      program.programId
    )[0];

    const orderVault = PublicKey.findProgramAddressSync(
      [Buffer.from("orderVault"), orderPda.toBuffer()],
      program.programId
    )[0];

    console.log("Program PDA:", orderPda.toBase58());
    console.log("Order Vault PDA:", orderVault.toBase58());

    const accounts = transaction.transaction.message.accountKeys;
    console.log("Transaction accounts:", accounts.map(acc => acc.pubkey.toBase58()));

    const programAccount = accounts.find(acc => acc.pubkey.equals(programId));
    const signerAccount = accounts.find(acc => acc.pubkey.equals(account));
    const orderPdaAccount = accounts.find(acc => acc.pubkey.equals(orderPda));
    const orderVaultAccount = accounts.find(acc => acc.pubkey.equals(orderVault));

    if (!programAccount || !signerAccount || !orderPdaAccount || !orderVaultAccount) {
      return Response.json(
        { message: "Invalid transaction accounts" } as ActionError,
        { status: 400, headers }
      );
    }

    await prisma.order.update({
      where: { id: order.id },
      data: { orderstatus: "CANCELLED" },
    });

    const payload: CompletedAction = {
      type: "completed",
      title: "Refund was successful! Check your wallet.",
      icon: "https://avatars.githubusercontent.com/u/35608259?s=200&v=4",
      label: "Complete!",
      description: `You have completed an action chain! Transaction signature: ${signature}`,
    };

    return Response.json(payload, { headers });
  } catch (err) {
    console.error("Error processing request:", err);
    const actionError: ActionError = {
      message: typeof err === "string" ? err : "An unknown error occurred",
    };
    return Response.json(actionError, { status: 400, headers });
  }
};

// TODO: Implement additional order handling logic
// if (order.delivered) {
//   // Call finalizeOrder() or other methods as needed
// }
