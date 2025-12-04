import { NextRequest, NextResponse } from 'next/server';
import { verifyAuthToken } from '@/lib/auth';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const protectedRoutes = [
    '/admin',
    '/tickets',
    '/users',
    '/time-tracking-tickets'
  ];

  
  const isProtected = protectedRoutes.some(route => pathname.startsWith(route));

  if (isProtected) {
    const token = request.cookies.get('auth-token')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    let data;
    try {
      data = await verifyAuthToken<{ isAdmin: boolean }>(token);
    } catch {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    
    if (pathname.startsWith('/admin') && !data.isAdmin) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/tickets/:path*',
    '/users/:path*',
    '/time-tracking-tickets/:path*',
  ],
};
