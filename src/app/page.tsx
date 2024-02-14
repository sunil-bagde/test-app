import { redirect } from "next/navigation";
import { cookies as nextCookies } from "next/headers";
export default async function Home() {
   return <h2 className="text-2xl text-white text-center flex justify-center ">Home</h2>
}
