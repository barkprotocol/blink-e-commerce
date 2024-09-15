import * as React from "react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { ThemeModeToggle } from "@/components/theme-mode-toggle";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn("bg-white dark:bg-gray-900", className)}>
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <img
            src="https://ucarecdn.com/b065ba1f-6279-4677-ae8f-0ebc1facb68d/bark_icon.png" 
            alt="BARK Protocol Logo"
            className="w-8 h-auto" // Adjust size as needed
          />
          <p className="text-center text-sm leading-loose text-gray-800 dark:text-gray-300 md:text-left">
            © 2023 BARK Protocol. All rights reserved.
          </p>
        </div>
        <nav className="flex items-center gap-2">
          <Button asChild>
            <Link
              href={siteConfig.links.docs}
              target="_blank"
              rel="noreferrer"
              className={cn(
                buttonVariants({ variant: "secondary", size: "sm" }),
                "px-4"
              )}
            >
              Read the Docs
            </Link>
          </Button>
          <ThemeModeToggle />
        </nav>
      </div>
    </footer>
  );
}
