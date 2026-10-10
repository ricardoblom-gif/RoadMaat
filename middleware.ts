import { NextRequest, NextResponse } from 'next/server';
import { verifySessionToken } from '@/lib/session-token';

const protectedPaths = ['/dashboard'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtectedRoute = protectedPaths.some((path) => pathname === path || pathname.startsWith(`${path}/`));

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  const token = request.cookies.get('roadmaat_session')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const session = await verifySessionToken(token);

  if (!session) {
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('roadmaat_session');
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/dashboard'],
};
