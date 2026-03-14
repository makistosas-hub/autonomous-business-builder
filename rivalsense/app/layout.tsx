import type { Metadata } from "next";
import "./globals.css";
import { ConvexClientProvider } from "./ConvexClientProvider";

export const metadata: Metadata = {
  title: "RivalSense - Always-On Competitor Intelligence",
  description:
    "AI-powered monitoring of pricing, products, website changes, hiring patterns, and positioning shifts. Stay ahead of your competition with real-time intelligence.",
  keywords: [
    "competitor intelligence",
    "competitive monitoring",
    "pricing intelligence",
    "market research",
    "competitive analysis",
  ],
  openGraph: {
    title: "RivalSense - Always-On Competitor Intelligence",
    description:
      "AI-powered monitoring of pricing, products, website changes, hiring patterns, and positioning shifts.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </body>
    </html>
  );
}
