import {
  ActionError,
  ActionPostRequest,
  ActionPostResponse,
  ACTIONS_CORS_HEADERS,
  createPostResponse,
} from "@solana/actions";
import {
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import * as anchor from "@coral-xyz/anchor";
import { v4 as uuidv4 } from "uuid";
import { getConnection } from "@/lib/constants";
import { trimUuidToHalf } from "@/lib/helpers";
import prisma from "prisma/db";
import { program } from "anchor/setup";

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
    const searchParams = new URLSearchParams(url.search);

    const fields = {
      name: searchParams.get("name"),
      email: searchParams.get("email"),
      address: searchParams.get("address"),
      zipcode: searchParams.get("zipcode"),
      city: searchParams.get("city"),
      amount: searchParams.get("amount"),
      state: searchParams.get("state"),
    };

    if (Object.values(fields).some(value => !value)) {
      return Response.json(
        { message: "Incomplete data" } as ActionError,
        { headers: ACTIONS_CORS_HEADERS }
      );
    }

    const product = await prisma.product.findUnique({
      where: { id: params.productid },
      include: { seller: true },
    });

    if (!product) {
      return Response.json(
        { message: "Product not available" } as ActionError,
        { headers: ACTIONS_CORS_HEADERS }
      );
    }

    const body: ActionPostRequest = await req.json();
    let account: PublicKey;

    try {
      account = new PublicKey(body.account);
    } catch (err) {
      throw new Error('Invalid "account" provided');
    }

    const connection = getConnection();
    const transaction = new Transaction();
    const orderUuid = uuidv4();
    const message = trimUuidToHalf(orderUuid);

    let anchorInstruction;
    let orderPda = PublicKey.findProgramAddressSync(
      [Buffer.from("order"), account.toBuffer(), Buffer.from(message)],
      program.programId
    )[0];

    let orderVault = PublicKey.findProgramAddressSync(
      [Buffer.from("orderVault"), orderPda.toBuffer()],
      program.programId
    )[0];

    try {
      anchorInstruction = await program.methods
        .createOrder(message, new anchor.BN(Number(fields.amount) * LAMPORTS_PER_SOL))
        .accountsPartial({
          seller: new PublicKey(product.seller.walletAddress),
          user: account,
          order: orderPda,
          orderVault,
        })
        .instruction();
    } catch (error) {
      console.error("Error creating Anchor instruction:", error);
      return Response.json(
        { message: "Error creating anchor instruction" } as ActionError,
        { headers: ACTIONS_CORS_HEADERS }
      );
    }

    transaction.add(anchorInstruction);
    transaction.feePayer = account;
    transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;

    const successUrl = `/api/actions/purchasedone?${new URLSearchParams({
      ...fields,
      productid: params.productid,
      uuid: orderUuid,
    })}`;

    const payload: ActionPostResponse = await createPostResponse({
      fields: {
        transaction,
        links: {
          next: {
            type: "post",
            href: successUrl,
          },
        },
      },
    });

    return Response.json(payload, { headers: ACTIONS_CORS_HEADERS });
  } catch (error: unknown) {
    let errorMessage = "An unknown error occurred";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return Response.json(
      {
        message: "Error creating order on-chain",
        details: errorMessage,
      } as ActionError,
      { headers: ACTIONS_CORS_HEADERS }
    );
  }
};
