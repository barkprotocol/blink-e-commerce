"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { SellerInput, SellerSchema } from "@/lib/validation";
import { createSeller } from "@/lib/action";
import { useRouter } from "next/navigation";

export default function CreateUsername({ publickey }: { publickey: string }) {
  const [username, setUsername] = useState("");
  const [wallet] = useState(publickey);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username) {
      toast.warning("Enter the username");
      return;
    }

    if (username.length < 7) {
      toast.warning("Username length should be more than 6 characters");
      return;
    }

    const formData: SellerInput = {
      username,
      walletAddress: wallet,
    };

    try {
      // Validate form data
      await SellerSchema.parse(formData);

      // Send request to create seller
      const response = await createSeller(formData);

      if (response.err) {
        toast.warning(response.msg);
      } else {
        toast.success("Username created successfully!");
        router.push("/dashboard");
      }
    } catch (error) {
      // Handle validation or network errors
      toast.error("An error occurred. Please try again.");
      console.error(error);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>Connect Your Wallet</CardTitle>
          <CardDescription>
            Enter your username and wallet address to get started.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength={7}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="wallet">Wallet Address</Label>
            <Input
              id="wallet"
              placeholder="Enter your wallet address"
              value={wallet}
              readOnly
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="ml-auto">
            Create
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
