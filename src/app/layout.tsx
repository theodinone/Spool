import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import PageTransition from "@/components/PageTransition";
import "./globals.css";

export const metadata: Metadata = {
  title: "Spool.film — The Best Product Launch Videos",
  description:
    "A curated collection of the best product launch videos and films. Browse for inspiration before creating your own.",
  metadataBase: new URL("https://spool.film"),
  openGraph: {
    title: "Spool.film — The Best Product Launch Videos",
    description:
      "A curated collection of the best product launch videos and films.",
    siteName: "Spool.film",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Spool.film — The Best Product Launch Videos",
    description:
      "A curated collection of the best product launch videos and films.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="min-h-screen"><PageTransition>{children}</PageTransition></body>
    </html>
  );
}
