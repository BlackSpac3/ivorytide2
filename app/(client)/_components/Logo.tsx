"use client";
import { logo } from "@/assets";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Logo = ({ className }: { className?: string }) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <Image
      src={resolvedTheme === "dark" ? logo.gold : logo.primary}
      alt="A&E"
      className={cn("w-7 h-auto ", className)}
    />
  );
};

export default Logo;
