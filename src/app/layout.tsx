import type { Metadata } from "next";
import { Inter } from "next/font/google";
import './global.css';
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Test app",
  description: "fullstack next js app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} className="bg-primary-1">{children}</body>
    </html>
  );
}
