import type { Metadata } from "next";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import { getSession } from "@/app/utils/auth";
import { Nav } from "@/app/components/Header/Nav";

export const metadata: Metadata = {
  title: "Test app",
  description: "fullstack next js app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
   const {user} =  await getSession() ;

  return (
    <>
      <Nav name={user.name} />
      {children}
    </>
  );
}
