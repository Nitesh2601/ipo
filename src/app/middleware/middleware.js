import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req) {
  // Extract token from the request
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // If no token, return unauthorized response
  if (!token) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  // If token is valid, continue with the request
  return NextResponse.next();
}

// Configure which routes the middleware applies to
export const config = {
  matcher: [
    '/api/comments/:path*',     // Protect all comment-related APIs
    '/api/comments/add/:path*', // Protect add comment API
  ],
};
