"use client";
import React from "react";
import { BackgroundBeams } from "../ui/background-beams";
import { WalletMultiButtonFix } from "../walletButton/WalletButton";
import BlinkLogo from "../public/icon.svg";

export function BackGroundBeamBG() {
  return (
    <div className="h-screen w-full bg-neutral-950 relative flex flex-col items-center justify-center antialiased p-4">
      <div className="max-w-2xl mx-auto p-4">
        {/* Logo */}
        <img 
          src={BlinkLogo} 
          alt="Blink E-Commerce Logo" 
          className="w-20 h-20 mx-auto mb-4" 
        />
        {/* Main Heading */}
        <h1 
          className="text-4xl md:text-4xl lg:text-6xl font-bold max-w-7xl mx-auto text-center mt-6 relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white"
        >
          Blink E-Commerce
        </h1>
        {/* Description Paragraphs */}
        <p className="text-neutral-500 max-w-lg mx-auto my-2 text-lg text-center relative z-10">
          The Future of Shopping—Fast, Secure, and Decentralized.
        </p>
        <p className="text-neutral-400 max-w-lg mx-auto my-2 text-md text-center relative z-10">
          Build your eCommerce store with <strong>Blink E-Commerce</strong>, powered by BARK Protocol on the Solana blockchain. Experience unmatched speed, security, and customization tailored for modern merchants and developers.
        </p>
      </div>
      {/* Background Beams */}
      <BackgroundBeams />
      {/* Wallet Button */}
      <div className="p-4">
        <WalletMultiButtonFix />
      </div>
    </div>
  );
}
