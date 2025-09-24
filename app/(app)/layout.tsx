import type { Metadata } from "next";
import "./app.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description:
    "Administrative dashboard for managing foundation resources and operations.",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Providers>{children}</Providers>;
}
