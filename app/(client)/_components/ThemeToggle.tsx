"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const ThemeToggle = ({ white }: { white?: boolean }) => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={cn(
          "border border-primary/30 rounded-full flex items-center gap-1 p-1",
          white && " border-zinc-100/30"
        )}>
        <div className="relative">
          <span className="bg-primary/10 rounded-full inset-0 absolute z-[-1]"></span>

          <button className="size-6 aspect-square rounded-full cursor-pointer hover:bg-primary/10 text-primary flex items-center justify-center">
            <Sun className="size-3" />
          </button>
        </div>
        <div className="relative">
          <button
            onClick={() => setTheme("dark")}
            className="size-6 aspect-square rounded-full cursor-pointer hover:bg-primary/10 text-text-muted flex items-center justify-center">
            <Moon className="size-3" />
          </button>
        </div>
      </div>
    );
  }

  if (mounted) {
    return (
      <div
        className={cn(
          "border border-primary/30 rounded-full flex items-center gap-1 p-1",
          white && " border-zinc-100/30"
        )}>
        <div className="relative">
          {resolvedTheme === "light" && (
            <motion.span
              layoutId="activeTheme"
              style={{ originY: "0px" }}
              transition={{
                type: "spring",
                stiffness: 420,
                damping: 30,
              }}
              className={cn(
                "bg-primary/10 rounded-full inset-0 absolute z-[-1]",
                white && "bg-zinc-100/10"
              )}></motion.span>
          )}
          <button
            onClick={() => setTheme("light")}
            className={cn(
              "size-6 flex items-center justify-center aspect-square text-text-muted rounded-full cursor-pointer hover:bg-primary/10",
              resolvedTheme === "light" && "text-primary",
              white && "text-zinc-100/80 hover:bg-zinc-100/10",
              resolvedTheme === "light" && white && "text-zinc-100"
            )}>
            <Sun className="size-3" />
          </button>
        </div>
        <div className="relative">
          {resolvedTheme === "dark" && (
            <motion.span
              layoutId="activeTheme"
              style={{ originY: "0px" }}
              transition={{
                type: "spring",
                stiffness: 420,
                damping: 30,
              }}
              className={cn(
                "bg-primary/20 rounded-full inset-0 absolute z-[-1]",
                white && "bg-zinc-100/10"
              )}></motion.span>
          )}

          <button
            onClick={() => setTheme("dark")}
            className={cn(
              "size-6 flex items-center justify-center aspect-square text-text-muted rounded-full cursor-pointer hover:bg-primary/10",
              resolvedTheme === "dark" && "text-primary",
              white && "text-zinc-100/80 hover:bg-zinc-100/10",
              resolvedTheme === "dark" && white && "text-zinc-100"
            )}>
            <Moon className="size-3" />
          </button>
        </div>
      </div>
    );
  }
};

export default ThemeToggle;
