import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { HOME_ROUTE, LOGIN_ROUTE } from "@/app/constants/routes";
import { currentUser } from "@/app/utils/auth";

export const protectedRoutes = [HOME_ROUTE];
export const authRoutes = [LOGIN_ROUTE];
export const publicRoutes = [];

export function middleware(request: NextRequest) {
  const user = currentUser();

  if (
    protectedRoutes.includes(request.nextUrl.pathname) &&
    (!user || Date.now() > user.expiredAt)
  ) {
    request.cookies.delete("user");
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("currentUser");

    return response;
  }

  if (authRoutes.includes(request.nextUrl.pathname) && user) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}
