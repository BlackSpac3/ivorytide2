"use client";

import { cn } from "@/lib/utils";
import { Laptop, MoonStar, SunDimIcon } from "lucide-react";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensures theme is loaded before rendering
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Prevents SSR mismatch
    return (
      <div className="border rounded-full flex items-center">
        <div className="size-6 rounded-full flex items-center justify-center">
          <Laptop className="w-3" />
        </div>
        <div className="size-6 rounded-full flex items-center justify-center">
          <SunDimIcon className="w-3" />
        </div>
        <div className="size-6 rounded-full flex items-center justify-center">
          <MoonStar className="w-3" />
        </div>
      </div>
    );
  }

  return (
    <div className="border rounded-full flex items-center">
      <div
        onClick={() => setTheme("system")}
        className={cn(
          "size-6 rounded-full cursor-pointer flex items-center justify-center",
          theme === "system" && "bg-background text-foreground border shadow-xs"
        )}>
        <Laptop className="w-3" />
      </div>
      <div
        onClick={() => setTheme("light")}
        className={cn(
          "size-6 rounded-full cursor-pointer flex items-center text-muted-foreground justify-center",
          theme === "light" && "bg-background text-foreground border shadow-xs"
        )}>
        <SunDimIcon className="w-3" />
      </div>
      <div
        onClick={() => setTheme("dark")}
        className={cn(
          "size-6 rounded-full cursor-pointer flex items-center text-muted-foreground justify-center",
          theme === "dark" && "bg-background text-foreground border shadow-xs"
        )}>
        <MoonStar className="w-3" />
      </div>
    </div>
  );
};

export default ThemeToggle;
