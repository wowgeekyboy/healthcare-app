import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { NextRequestWithAuth } from "next-auth/middleware";

export default async function middleware(req: NextRequestWithAuth) {
  const token = await getToken({ req });
  const isAuth = !!token;
  const isAuthPage = req.nextUrl.pathname.startsWith('/login') || 
                    req.nextUrl.pathname.startsWith('/register');
  const isApiRoute = req.nextUrl.pathname.startsWith('/api');

  // Protect dashboard routes based on role
  if (req.nextUrl.pathname.startsWith('/dashboard')) {
    if (!isAuth) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    const role = token?.role as string;
    const isDashboardAllowed = (
      (role === 'ADMIN' && req.nextUrl.pathname.startsWith('/dashboard/admin')) ||
      (role === 'DOCTOR' && req.nextUrl.pathname.startsWith('/dashboard/doctor')) ||
      (role === 'PATIENT' && req.nextUrl.pathname.startsWith('/dashboard/patient'))
    );

    if (!isDashboardAllowed) {
      const redirectPath = role === 'ADMIN' ? '/dashboard/admin' :
                         role === 'DOCTOR' ? '/dashboard/doctor' :
                         '/dashboard/patient';
      return NextResponse.redirect(new URL(redirectPath, req.url));
    }
  }

  // Redirect authenticated users from auth pages
  if (isAuthPage) {
    if (isAuth) {
      const role = token?.role as string;
      const redirectPath = role === 'ADMIN' ? '/dashboard/admin' :
                         role === 'DOCTOR' ? '/dashboard/doctor' :
                         '/dashboard/patient';
      return NextResponse.redirect(new URL(redirectPath, req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/login',
    '/register'
  ]
};