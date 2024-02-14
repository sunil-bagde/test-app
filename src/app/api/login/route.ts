import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server"; 
import bcrypt from "bcryptjs"
const router = createEdgeRouter<NextRequest, { params?: unknown }>();

const HASH = "$2a$10$2RSqFKwEvE6jiRPNaykaq.GKHr4rJf2FDU/UPn/AEipcaSZgpDlTK"

router.post(async request => {
 
  const { email, password } = await request.json();
   

  try {
   let isPassword = await bcrypt.compare(password, HASH);
 
   const date = new Date()
   let currentUser = {
    id:1 ,
    name:"Test",
    expiredAt: date.setTime(date.getTime() + 24 * 60 * 60 * 1000) // current+24 HRS
   }

    if (email == "admin@gmail.com" &&  isPassword) {  // password hash not implemented yet
      return new Response(JSON.stringify(currentUser), {
        status: 200,
      });
    }
 
      return new Response(errorLogin(), {
        status: 401,
      });
 
 
  } catch (err) {
    console.log("err", err);
    return new Response(errorLogin(), {
      status: 401,
    });
  }
});

export async function POST(request: NextRequest, ctx: { params?: unknown }) {
  return router.run(request, ctx);
}

export async function OPTIONS(request: NextRequest, ctx: { params?: unknown }) {
  return new Response("", {
    status: 200,
  });
}

function errorLogin() {
  const ERROR_MSG = "Username or password is wrong";
  return JSON.stringify({ error: { message: ERROR_MSG } })
}