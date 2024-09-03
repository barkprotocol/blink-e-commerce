import { IdlAccounts, Program } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import idl from "./idl.json";
import type { EcommerceEscrow } from "./type";
import { getConnection } from "../src/lib/constants";

export const programId = new PublicKey(
  "EEFaeBjspJjSk1zMW6noT99B9YibP1Y3EXdm5ekuXcQ2"
);

const connection = getConnection();

export const program = new Program(idl as EcommerceEscrow, {
  connection,
});

export type todoState = IdlAccounts<EcommerceEscrow>["order"];
