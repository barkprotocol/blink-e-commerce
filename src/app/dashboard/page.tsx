"use client";
import React, { useEffect, useState } from "react";
import DashboardComp from "@/components/dashboard/dashboard";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";

export default function Dashboard() {
  const { connected, publicKey } = useWallet();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!connected && !publicKey) {
      router.push("/");
    } else {
      setIsLoading(false);
    }
  }, [connected, publicKey, router]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {publicKey && connected ? (
        <DashboardComp address={publicKey.toString()} />
      ) : (
        <p>Please connect your wallet to access the dashboard.</p>
      )}
    </>
  );
}
