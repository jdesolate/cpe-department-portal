// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 1. Identify if the student is targetting an internal protected directory route
  const isProtectedRoute = request.nextUrl.pathname.startsWith('/internal') ||
    request.nextUrl.pathname.startsWith('/freedom-wall/submit');

  if (isProtectedRoute) {
    // 2. Mocking authentication checkpoint until Supabase Auth keys are linked.
    // In production, we read the cookie/JWT token issued by Supabase Auth here.
    const userEmail = "student@youruniversity.edu.ph"; // Simulated incoming user parameter
    const allowedDomain = "@youruniversity.edu.ph";

    if (!userEmail || !userEmail.endsWith(allowedDomain)) {
      // If unauthorized profile attempts breach, gracefully force back to landing portal
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

// Configure exactly which paths the middleware should watch
export const config = {
  matcher: ['/internal/:path*', '/freedom-wall/submit'],
};
