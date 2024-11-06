import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

const protectedRoutes = ['/dashboard', '/dashboard/(.*)'];
const authOnlyRoutes = ['/sign-in', '/sign-up'];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const authToken = request.cookies.get('access_token');

    if (!authToken && protectedRoutes.some((path) => pathname.startsWith(path))) {
        return NextResponse.redirect(new URL('/sign-in', request.url));
    }

    if (authToken && authOnlyRoutes.some((path) => pathname.startsWith(path))) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    if (authToken && protectedRoutes.some((path) => pathname.startsWith(path))) {
        return NextResponse.next();
    }
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/sign-in',
        '/sign-up',
        '/dashboard',
        '/dashboard/:path*',
    ]
};
