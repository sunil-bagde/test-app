import type { Metadata } from "next";
import "./global.css";
import { Inter } from "next/font/google";
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
    <html lang='en'>
      <body className={`${inter.className} bg-primary-1`}>{children}</body>
    </html>
  );
}
