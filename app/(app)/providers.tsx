"use client";

import { SessionProvider } from "next-auth/react";
import { useTheme } from "next-themes";
import { Toaster, ToasterProps } from "sonner";

const ToasterProvider = () => {
  const { resolvedTheme } = useTheme();

  return (
    <Toaster
      position="top-right"
      theme={resolvedTheme as ToasterProps["theme"]}
    />
  );
};

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ToasterProvider />
      {children}
    </SessionProvider>
  );
}
