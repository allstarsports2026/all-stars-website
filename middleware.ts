import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
    const { nextUrl } = request;

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
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
    }

    if (isLoginPage && sessionToken) {
        return NextResponse.redirect(new URL('/admin', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin', '/admin/:path*'],
};
