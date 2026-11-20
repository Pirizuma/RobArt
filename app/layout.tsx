import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { StructuredData } from "@/components/StructuredData";
import { openGraphBase, siteDescription, siteName, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} — Sculptor, Darwin`,
    template: `%s — ${siteName}`,
  },
  description: siteDescription,
  openGraph: openGraphBase,
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <StructuredData />
        <Header />
        <main className="flex-1 animate-fade-in">{children}</main>
      </body>
    </html>
  );
}
