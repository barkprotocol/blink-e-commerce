"use client";

import { createSolanaQR, encodeURL } from "@solana/actions";
import { useEffect, useRef, useState } from "react";

type ComponentProps = {
  url: string | URL;
  className?: string;
  background?: string;
  color?: string;
  size?: number;
};

export function SolanaQRCode({
  url,
  className,
  background = "transparent",
  color = "#000000",
  size = 400,
}: ComponentProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const generateQR = async () => {
      try {
        const encodedUrl = encodeURL(
          {
            link: new URL(url, window.location.href),
          },
          "solana:"
        );

        console.log("encodedUrl:", encodedUrl.toString());

        const qr = createSolanaQR(encodedUrl, size, background, color);

        if (ref.current) {
          ref.current.innerHTML = ''; // Clear previous content
          qr.append(ref.current);
        }
      } catch (err) {
        console.error("Error generating Solana QR code:", err);
        setError("Failed to generate QR code. Please try again.");
      }
    };

    generateQR();
  }, [url, size, background, color]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return <div ref={ref} className={className} aria-label="Solana QR Code" />;
}