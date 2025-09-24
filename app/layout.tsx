import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { APP_CONFIG } from "@/lib/data";
import RootProviders from "./root-providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = "Amanda & Ekundayo | Wedding Invitation";
const description =
  "Join us for our special day - Amanda & Ekundayo's Wedding Celebration";

export const metadata: Metadata = {
  metadataBase: new URL(APP_CONFIG.BASE_URL),
  alternates: {
    canonical: "/",
  },

  title: {
    default: title,
    template: "%s | Amanda & Ekundayo Wedding Invitation",
  },
  description,
  openGraph: {
    type: "website",
    url: APP_CONFIG.BASE_URL,
    title,
    description,
    images: [
      {
        url: "/opengraph-image.png", // absolute or relative path
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/opengraph-image.png"], // must be absolute URL in production
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <RootProviders>{children}</RootProviders>
      </body>
    </html>
  );
}
