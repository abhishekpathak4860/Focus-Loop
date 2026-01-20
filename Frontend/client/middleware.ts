import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  // 1. Get the Refresh Token from Cookie
  const refreshToken = request.cookies.get("refreshToken")?.value;

  // 2. Define Protected Routes
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    if (!refreshToken) {
      // No cookie? Redirect to Login
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      // Optional: Verify the token signature using 'jose'
      // You need the REFRESH_TOKEN_SECRET in your frontend .env for this to work
      const secret = new TextEncoder().encode(process.env.REFRESH_TOKEN_SECRET);
      await jwtVerify(refreshToken, secret);

      // Token is valid, allow access
      return NextResponse.next();
    } catch (error) {
      // Token invalid? Redirect to Login
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

// Configure which paths the middleware runs on
export const config = {
  matcher: ["/dashboard/:path*"],
};
