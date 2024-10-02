"use client";

import * as React from "react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icons } from "@/components/icons";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="relative h-8 w-8 p-0"
          aria-label="Toggle theme"
        >
          <Icons.sun className="absolute transition-transform dark:rotate-90 dark:scale-0" />
          <Icons.moon className="absolute transition-transform rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <Icons.sun className="mr-2 h-4 w-4" aria-hidden="true" />
          <span>Light</span>
          {theme === "light" && (
            <Icons.check className="ml-auto h-4 w-4" aria-hidden="true" />
          )}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <Icons.moon className="mr-2 h-4 w-4" aria-hidden="true" />
          <span>Dark</span>
          {theme === "dark" && (
            <Icons.check className="ml-auto h-4 w-4" aria-hidden="true" />
          )}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          <Icons.laptop className="mr-2 h-4 w-4" aria-hidden="true" />
          <span>System</span>
          {theme === "system" && (
            <Icons.check className="ml-auto h-4 w-4" aria-hidden="true" />
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}