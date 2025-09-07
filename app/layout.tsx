import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientRoot from "./api/test-error/client-root";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cybersecurity Risk Management Dashboard",
  description: "Comprehensive cybersecurity risk assessment and management system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientRoot>{children}</ClientRoot>
      </body>
    </html>
  );
}
