import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { authKey } from "./constants/auth-key";

const AuthRoutes = ["/login"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = cookies().get(authKey)?.value;

  if (!accessToken) {
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (accessToken) {
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/"],
};
