"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useSelectedLayoutSegment } from "next/navigation";
import { useTheme } from "next-themes";
import { useWallet } from "@solana/wallet-adapter-react";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { MobileNav } from "@/components/mobile-nav";
import { MainNavItem } from "@/types";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

interface MainNavProps {
  items?: MainNavItem[];
  children?: React.ReactNode;
}

export function MainNav({ items = [], children }: MainNavProps) {
  const { theme } = useTheme();
  const segment = useSelectedLayoutSegment();
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false);
  const { connected } = useWallet();

  const handleMenuToggle = () => {
    setShowMobileMenu((prevState) => !prevState);
  };

  // Define navigation items including new ones
  const navItems = [
    { href: "/", title: "Home" },
    { href: "/features", title: "Features" },
    { href: "/services", title: "Services" },
    { href: "/faq", title: "FAQ" },
    ...items
  ];

  return (
    <div className="flex items-center justify-between gap-6 md:gap-10">
      {/* Desktop Logo and Site Name */}
      <Link
        href="/"
        className="hidden md:flex items-center space-x-2 text-lg hover:text-foreground/80"
        aria-label={`Go to ${siteConfig.name}`}
      >
        <Image
          src={theme === 'dark' ? siteConfig.logoUrlDark : siteConfig.logoUrlLight}
          alt={`${siteConfig.name} Logo`}
          width={110}
          height={50}
          className="rounded-full"
        />
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex flex-grow gap-4">
        {navItems.map((item) => (
          <Button key={item.href} variant="link" asChild>
            <Link
              href={item.disabled ? "#" : item.href}
              className={cn(
                "flex items-center text-lg font-medium transition-colors no-underline",
                item.href.startsWith(`/${segment}`)
                  ? "text-foreground"
                  : "text-foreground/60",
                item.disabled && "cursor-not-allowed opacity-80"
              )}
              aria-disabled={item.disabled}
            >
              {item.title}
            </Link>
          </Button>
        ))}
      </nav>

      {/* Mobile Menu Toggle */}
      <button
        className="flex items-center space-x-2 md:hidden"
        onClick={handleMenuToggle}
        aria-label={showMobileMenu ? "Close mobile menu" : "Open mobile menu"}
        aria-expanded={showMobileMenu}
      >
        {showMobileMenu ? <Icons.close className="h-6 w-6" aria-hidden="true" /> : <Icons.menu className="h-6 w-6" aria-hidden="true" />}
        <span className="font-bold sr-only">Menu</span>
      </button>

      {/* Mobile Navigation Menu */}
      {showMobileMenu && navItems.length > 0 && (
        <MobileNav items={navItems}>{children}</MobileNav>
      )}
    </div>
  );
}
