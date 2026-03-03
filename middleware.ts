import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const { nextUrl } = request;
  // Better Auth default session cookie name
  const session = request.cookies.get('better-auth.session-token')?.value || request.cookies.get('__Secure-better-auth.session-token')?.value;

  const isAdminRoute = nextUrl.pathname.startsWith('/admin');
  const isLoginPage = nextUrl.pathname === '/admin/login';

  if (isAdminRoute && !isLoginPage) {
    if (!session) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  if (isLoginPage && session) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
