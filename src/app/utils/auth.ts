import { cookies as nextCookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { AUTH_SECRET_KEY } from "@/app/config";
import { USER_COOKIE_KEY } from "@/app/constants/auth";
import bcrypt from "bcryptjs";
const HASH = "$2a$10$2RSqFKwEvE6jiRPNaykaq.GKHr4rJf2FDU/UPn/AEipcaSZgpDlTK";

export function currentUser() {
  const cookies = nextCookies();

  if (cookies.get("currentUser")) {
    return JSON.parse(cookies.get("currentUser")?.value ?? `{}`);
  }

  return null;
}

const key = new TextEncoder().encode(AUTH_SECRET_KEY);
const hours24 = 24 * 60 * 60 * 1000;

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function login(email: string, password: string) { 
  const user = { email, password, name: "John" };
  let isPassword = await bcrypt.compare(password, HASH);
 
  if(!isPassword) {
    throw new Error("login error")
  }
  const expires = new Date(Date.now() + hours24);
  const session = await encrypt({ user, expires, expiredAt : expires}); 
  cookies().set(USER_COOKIE_KEY, session, { expires, httpOnly: true });
}

export async function logout() {
  // Destroy the session
  cookies().set(USER_COOKIE_KEY, "", { expires: new Date(0) });
}

export async function getSession() {
  const session = cookies().get(USER_COOKIE_KEY)?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get(USER_COOKIE_KEY)?.value;
  if (!session) return;

  // Refresh the session so it doesn't expire
  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + hours24);
  const res = NextResponse.next();
  res.cookies.set({
    name: USER_COOKIE_KEY,
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
    expiredAt: parsed.expires,
  });
  return res;
}
