import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { login } from "@/app/utils/auth";
import { logger } from "@/app/logger"; 

export async function POST(request: NextRequest, ctx: { params?: unknown }) {
    try {
    const { email, password } = await request.json();
    logger.info(`Login called: ${email}`);  
    await login(email, password);

    return new Response("", {
      status: 200,
    });
    
  } catch (err) {
    logger.info(`Login error: ${err.message}`);  
    return new Response(errorLogin(), {
      status: 401,
    });
  }
}

export async function OPTIONS(request: NextRequest, ctx: { params?: unknown }) {
  return new Response("", {
    status: 200,
  });
}

function errorLogin() {
  const ERROR_MSG = "Username or password is wrong";
  return JSON.stringify({ error: { message: ERROR_MSG } });
}
