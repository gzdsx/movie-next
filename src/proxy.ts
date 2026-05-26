// middleware.ts
import {auth} from "@/auth"
import {NextResponse} from "next/server"

export default auth((req) => {
    //console.log('req:', req.auth);
    const isLoggedIn = !!req.auth;
    const {nextUrl} = req;

    const isAuthRoute = nextUrl.pathname.startsWith("/dashboard");

    // 1. 如果没登录且试图访问受限页面
    if (!isLoggedIn && isAuthRoute) {
        return NextResponse.redirect(new URL("/login", nextUrl));
    }

    return NextResponse.next();
})

export const config = {
    matcher: ["/dashboard/:path*"],
}
