import {
  ActionError,
  ACTIONS_CORS_HEADERS,
  CompletedAction,
  NextActionPostRequest,
} from "@solana/actions";
import { PublicKey } from "@solana/web3.js";

import { getConnection } from "@/lib/constants";
import { trimUuidToHalf } from "@/lib/helpers";
import { program, programId } from "anchor/setup";
import prisma from "prisma/db";

export const GET = async (req: Request) => {
  return Response.json({ message: "Method not supported" } as ActionError, {
    status: 403,
    headers: ACTIONS_CORS_HEADERS,
  });
};

export const OPTIONS = async () =>
  Response.json(null, { headers: ACTIONS_CORS_HEADERS });

export const POST = async (req: Request) => {
  try {
    const url = new URL(req.url);
    const body: NextActionPostRequest = await req.json();

    console.log("Received request body:", body);

    // Validate and parse required fields
    const account = parsePublicKey(body.account, 'Invalid "account" provided');
    const signature = parseSignature(body.signature, 'Invalid "signature" provided');
    const searchParams = new URLSearchParams(url.search);

    const { name, email, address, zipcode, city, amount, state, productid, uuid } = extractParams(searchParams);

    if (!validateParams({ name, email, address, zipcode, city, amount, state, productid, uuid })) {
      return Response.json({ message: "Incomplete data" } as ActionError, { headers: ACTIONS_CORS_HEADERS });
    }

    const connection = getConnection();
    const status = await getSignatureStatus(connection, signature);

    if (!status) throw new Error("Unknown signature status");
    validateTransactionStatus(status.value);

    const transaction = await connection.getParsedTransaction(signature, "confirmed");
    if (!transaction) throw new Error("Transaction not found or not confirmed");

    const message = trimUuidToHalf(uuid);
    const { orderPda, orderVault } = derivePdas(body.account, message);

    const accounts = transaction.transaction.message.accountKeys;
    if (!validateTransactionAccounts(accounts, programId, account, orderPda, orderVault)) {
      return Response.json({ message: "Invalid transaction accounts" } as ActionError, { headers: ACTIONS_CORS_HEADERS });
    }

    await handleOrderProcessing({ name, email, address, zipcode, city, state, productid, uuid, body.account });

    const payload: CompletedAction = {
      type: "completed",
      title: `Purchase was successful! Log in with your address on our website to check out the orders.`,
      icon: "https://avatars.githubusercontent.com/u/35608259?s=200&v=4",
      label: "Complete!",
      description: `You have completed an action chain! Transaction signature: ${signature}`,
    };

    return Response.json(payload, { headers: ACTIONS_CORS_HEADERS });
  } catch (err) {
    console.error("Error processing request:", err);
    const actionError: ActionError = { message: typeof err === "string" ? err : "An unknown error occurred" };
    return Response.json(actionError, { status: 400, headers: ACTIONS_CORS_HEADERS });
  }
};

// Helper functions

function parsePublicKey(value: string, errorMessage: string): PublicKey {
  try {
    return new PublicKey(value);
  } catch {
    throw new Error(errorMessage);
  }
}

function parseSignature(value: string, errorMessage: string): string {
  if (!value) throw new Error(errorMessage);
  return value;
}

function extractParams(params: URLSearchParams) {
  return {
    name: params.get("name"),
    email: params.get("email"),
    address: params.get("address"),
    zipcode: params.get("zipcode"),
    city: params.get("city"),
    amount: params.get("amount"),
    state: params.get("state"),
    productid: params.get("productid"),
    uuid: params.get("uuid"),
  };
}

function validateParams(params: { [key: string]: string | null }) {
  return Object.values(params).every(value => value !== null && value.trim() !== '');
}

async function getSignatureStatus(connection: ReturnType<typeof getConnection>, signature: string) {
  try {
    return await connection.getSignatureStatus(signature);
  } catch {
    throw new Error("Unable to retrieve signature status");
  }
}

function validateTransactionStatus(status: { confirmationStatus: string } | null) {
  if (status?.confirmationStatus !== "confirmed" && status?.confirmationStatus !== "finalized") {
    throw new Error("Unable to confirm the transaction");
  }
}

function derivePdas(account: string, message: string) {
  const orderPda = PublicKey.findProgramAddressSync(
    [Buffer.from("order"), new PublicKey(account).toBuffer(), Buffer.from(message)],
    program.programId
  )[0];

  const orderVault = PublicKey.findProgramAddressSync(
    [Buffer.from("orderVault"), orderPda.toBuffer()],
    program.programId
  )[0];

  return { orderPda, orderVault };
}

function validateTransactionAccounts(accounts: { pubkey: PublicKey }[], programId: PublicKey, account: PublicKey, orderPda: PublicKey, orderVault: PublicKey) {
  return accounts.some(acc => acc.pubkey.equals(programId)) &&
         accounts.some(acc => acc.pubkey.equals(account)) &&
         accounts.some(acc => acc.pubkey.equals(orderPda)) &&
         accounts.some(acc => acc.pubkey.equals(orderVault));
}

async function handleOrderProcessing({ name, email, address, zipcode, city, state, productid, uuid, account }: {
  name: string,
  email: string,
  address: string,
  zipcode: string,
  city: string,
  state: string,
  productid: string,
  uuid: string,
  account: PublicKey
}) {
  const user = await prisma.user.findUnique({ where: { userWallet: account.toBase58() } });

  if (!user) {
    await prisma.user.create({
      data: {
        emailAddress: email,
        name,
        userWallet: account.toBase58(),
      },
    });
  }

  const productDetails = await prisma.product.findUnique({
    where: { id: productid },
    include: { seller: true },
  });

  if (!productDetails) throw new Error("Product not found");

  await prisma.order.create({
    data: {
      name,
      city,
      dropOfAddress: address,
      state,
      ZipCode: zipcode,
      buyerWallet: account.toBase58(),
      productId: productid,
      orderstatus: "PROCESSING",
      id: uuid,
      sellerId: productDetails.sellerId,
    },
  });

  const updatedStock = Number(productDetails.stock) - 1;
  await prisma.product.update({
    where: { id: productid },
    data: { stock: updatedStock.toString() },
  });
}
