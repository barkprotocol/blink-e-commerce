"use client";

import CreateUsername from "@/components/createusername/CreateUsername";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Loading from "@/components/ui/loading";

export default function Page() {
  const { publicKey, connected } = useWallet();
  const route = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkConnection = () => {
      if (!connected || !publicKey) {
        route.push("/");
      } else {
        setLoading(false); // Stop loading once the wallet is connected
      }
    };

    checkConnection();
  }, [connected, publicKey, route]);

  if (loading) {
    return <Loading />; // Show loading indicator while checking wallet connection
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      {publicKey && connected && (
        <CreateUsername publickey={publicKey.toString()} />
      )}
    </div>
  );
}
