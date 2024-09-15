"use client";

import * as React from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const WalletButton: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className="flex items-center">
      <WalletMultiButton
        className={cn(
          "bg-primary text-white rounded-md border border-transparent px-4 py-2 font-medium transition-colors hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary",
          theme === 'dark' ? "dark-mode-styles" : "light-mode-styles"
        )}
        // Additional props can be added here as needed
      />
    </div>
  );
};

export default WalletButton;
