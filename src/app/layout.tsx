import type { Metadata, Viewport } from "next";
import { Inter, Syne, Poppins } from "next/font/google";
import "./globals.css";
import Link from "next/link";

import { marketingConfig } from "@/config/marketing";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { MainNav } from "@/components/main-nav";
import { SiteFooter } from "@/components/site-footer";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeModeToggle } from "@/components/theme-mode-toggle";
import { siteConfig } from "@/config/site";

// Import fonts
const inter = Inter({ subsets: ["latin"] });
const syne = Syne({ subsets: ["latin"], weight: ["400", "700"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "600"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "BARK - BLINK COMMERCE",
  description:
    "The Blink E-Commerce Platform provides a streamlined solution for creating and managing online stores.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.className} ${poppins.className}`}>
      <body className={cn(inter.className, "bg-gray-100 dark:bg-gray-900 min-h-screen")}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex min-h-screen flex-col relative">
            <header className="container z-40 bg-background">
              <div className="flex h-20 items-center justify-between py-6">
                <MainNav items={marketingConfig.mainNav} />
                <nav className="flex items-center gap-2">
                  <Button asChild>
                    <Link
                      target="_blank"
                      href={siteConfig.links.docs}
                      className={cn(
                        buttonVariants({ variant: "secondary", size: "sm" }),
                        "px-4"
                      )}
                    >
                      Connect Wallet
                    </Link>
                  </Button>
                  <ThemeModeToggle />
                </nav>
              </div>
            </header>

            <div
              className={cn(
                "absolute inset-0 -z-10 bg-gray-100 dark:bg-gray-900"
              )}
            ></div>

            <main className="flex-1 space-y-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
              {children}
            </main>

            <SiteFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
