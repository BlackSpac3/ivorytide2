"use client";
import { logo } from "@/assets";
import { useTheme } from "next-themes";
import Image from "next/image";
import React from "react";

const Logo = () => {
  const { resolvedTheme } = useTheme();
  return (
    <Image
      src={resolvedTheme === "dark" ? logo.gold : logo.primary}
      alt="A&E"
      className="w-7 h-auto"
    />
  );
};

export default Logo;
