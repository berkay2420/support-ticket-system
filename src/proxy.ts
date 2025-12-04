import { NextRequest, NextResponse } from 'next/server';
import { verifyAuthToken } from '@/lib/auth';


const LIMIT = 50;
const WINDOW = 60000;

export async function proxy(request: NextRequest) {

  
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const token = request.cookies.get('auth-token')?.value;
    if (!token) return NextResponse.redirect(new URL('/login', request.url));

    try {
      const data = await verifyAuthToken<{ isAdmin: boolean }>(token);
      if (!data.isAdmin) return NextResponse.redirect(new URL('/', request.url));
    } catch {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  return NextResponse.next();
}


export const config = {
  matcher: ['/admin/:path*', '/users/:path*'],

};