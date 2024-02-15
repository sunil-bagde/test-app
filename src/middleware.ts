import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { HOME_ROUTE, LOGIN_ROUTE } from "@/app/constants/routes";
import { currentUser, getSession } from "@/app/utils/auth";
import { USER_COOKIE_KEY } from "@/app/constants/auth";
export const protectedRoutes = [HOME_ROUTE];
export const authRoutes = [LOGIN_ROUTE];
export const publicRoutes = [];

export async function middleware(request: NextRequest) {
  const user = await getSession();

  if (
    protectedRoutes.includes(request.nextUrl.pathname) &&
    (!user || Date.now() > Date.parse(user?.expiredAt))
  ) {
    request.cookies.delete(USER_COOKIE_KEY);
    const response = NextResponse.redirect(new URL(LOGIN_ROUTE, request.url));
    return response;
  }

  if (authRoutes.includes(request.nextUrl.pathname) && user) {
    return NextResponse.redirect(new URL(HOME_ROUTE, request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
