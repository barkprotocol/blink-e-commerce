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
  return new Response(
    JSON.stringify({
      message: "",
    } as ActionError),
    { headers }
  );
};

export const POST = async (
  req: Request,
  { params }: { params: { username: string; orderid: string } }
) => {
  try {
    console.log("inside refund button");

    const body: ActionPostRequest = await req.json();
    console.log(params);

    let account: PublicKey;
    try {
      account = new PublicKey(body.account);
    } catch (err) {
      throw new Error('Invalid "account" provided');
    }

    console.log(account);

    const order = await prisma.order.findUnique({
      where: { id: params.orderid },
    });

    console.log("order is", order);

    if (!order || order.orderStatus !== "PROCESSING") {
      return new Response(
        JSON.stringify({
          message: "Order is not in processing state or does not exist",
        } as ActionError),
        { headers }
      );
    }

    let message = trimUuidToHalf(order.id);
    console.log("here 1");

    let [orderPda] = PublicKey.findProgramAddressSync(
      [Buffer.from("order"), new PublicKey(body.account).toBuffer(), Buffer.from(message)],
      program.programId
    );

    console.log("here 2");

    let [orderVault] = PublicKey.findProgramAddressSync(
      [Buffer.from("orderVault"), orderPda.toBuffer()],
      program.programId
    );

    const anchorInstruction = await program.methods
      .cancelOrder(message)
      .accountsPartial({
        order: orderPda,
        orderVault,
        user: account,
        systemProgram: SystemProgram.programId,
      })
      .instruction();

    const connection = getConnection();
    const transaction = new Transaction().add(anchorInstruction);
    transaction.feePayer = account;
    transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;

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

    return new Response(JSON.stringify(payload), { headers });
  } catch (error) {
    console.log("error is", error);
    return new Response(
      JSON.stringify({
        message: "Something went wrong",
      } as ActionError),
      { headers }
    );
  }
};
