import { NextRequest, NextResponse } from 'next/server';

export async function proxy(request: NextRequest) {
  const { nextUrl } = request;

  // Debug cookies
  const allCookies = request.cookies.getAll();
  console.log(`[Proxy] Checking ${nextUrl.pathname}. Cookies found:`, allCookies.map(c => c.name));

  const sessionToken =
    request.cookies.get('better-auth.session-token')?.value ||
    request.cookies.get('better-auth.session_token')?.value ||
    request.cookies.get('__Secure-better-auth.session_token')?.value ||
    request.cookies.get('__Secure-better-auth.session-token')?.value ||
    request.cookies.get('better_auth_session')?.value;

  const isAdminRoute = nextUrl.pathname.startsWith('/admin');
  const isLoginPage = nextUrl.pathname === '/admin/login';
  const isSetupPage = nextUrl.pathname === '/admin/setup';

  if (isAdminRoute && !isLoginPage && !isSetupPage) {
    if (!sessionToken) {
      console.log(`[Proxy] No session found for ${nextUrl.pathname}, redirecting to login...`);
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  if (isLoginPage && sessionToken) {
    console.log(`[Proxy] Session found on login page, redirecting to admin...`);
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
};
