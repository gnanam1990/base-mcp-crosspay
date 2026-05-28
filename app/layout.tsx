import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CrossPay",
  description: "AI-assisted bill splitting and group settlement on Base.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
