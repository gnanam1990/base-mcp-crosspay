import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CrossPay",
  description: "AI-assisted bill splitting and group settlement on Base.",
  other: {
    "talentapp:project_verification":
      "8dc5cd8947653c17b825af47fc7a6111cca1dd570435643fd07780519adf6926175f8cd2d7b3be9220153f8783397bc9730f4ff6457b703c03469da5c38f13ae",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
