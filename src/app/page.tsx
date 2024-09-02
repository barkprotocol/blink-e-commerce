"use client";
import Homepage from "@/components/homepage/Homepage";
import { chechSellerPresent } from "@/lib/action";

import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/navigation";
import { useEffect, useCallback } from "react";
import { toast } from "sonner";

export default function Home() {
  const { publicKey, connected } = useWallet();
  const router = useRouter();

  const fetchUsername = useCallback(async (publicKey: string) => {
    try {
      const data = await chechSellerPresent(publicKey); // Or checkSellerPresent if that's the intended function name
      return data;
    } catch (error) {
      console.error("Error fetching username:", error);
      toast.error("An error occurred while checking the seller status.");
      return { err: "An error occurred", user: null }; // Adjust according to your error handling strategy
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (connected && publicKey) {
        const value = await fetchUsername(publicKey.toString());
        if (!value.err) {
          if (!value.user) {
            router.push("/username");
            toast.info("Create username");
          } else {
            router.push("/dashboard");
            toast.info("Logged in successfully");
          }
        } else {
          toast.warning(value.err);
        }
      }
    };
    fetchData();
  }, [publicKey, connected, fetchUsername, router]);

  return <Homepage />;
}
