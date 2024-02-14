import type { Metadata } from "next";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import { currentUser } from "@/app/utils/auth";
import { Nav } from "@/app/components/Header/Nav";


export const metadata: Metadata = {
  title: "Test app",
  description: "fullstack next js app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { name } = currentUser() ?? {};

  return (
     <>
        <Nav name={name} />
        {children}
      
     </>
  );
}
