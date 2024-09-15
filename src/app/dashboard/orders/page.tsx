"use client";
import React, { useEffect, useState } from "react";
import OrdersTable from "@/components/dashboard/orders/orders-table";
import Navbar from "@/components/navbar/Navbar";
import Loading from "@/components/Loading";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/navigation";

export default function Orders() {
  const { connected, publicKey } = useWallet();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!connected && !publicKey) {
      // Redirect to homepage if not connected
      router.push("/");
    } else {
      setIsLoading(false);
    }
  }, [connected, publicKey, router]);

  if (isLoading) {
    return (
      <div>
        <Navbar />
        <Loading />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      {publicKey && connected ? (
        <OrdersTable />
      ) : (
        <p>Please connect your wallet to view orders.</p>
      )}
    </div>
  );
}
