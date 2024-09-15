"use client";
import React, { useEffect, useState } from "react";
import Products from "@/components/dashboard/products/products";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";

export default function OrderList() {
  const { publicKey, connected } = useWallet();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!publicKey || !connected) {
      router.push("/");
    } else {
      setIsLoading(false);
    }
  }, [publicKey, connected, router]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      {publicKey ? (
        <Products address={publicKey.toString()} />
      ) : (
        <p>Please connect your wallet to view products.</p>
      )}
    </div>
  );
}
