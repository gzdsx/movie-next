// middleware.ts
import {auth} from "@/auth"
import {NextResponse} from "next/server"

export default auth((req) => {
    console.log('req:', req.auth);
    const isLoggedIn = !!req.auth;
    const {nextUrl} = req;
    const capabilities = req.auth?.user?.capabilities || [];

    const isAdminRoute = nextUrl.pathname.startsWith("/admin");
    const isAuthRoute = nextUrl.pathname.startsWith("/dashboard");

    // 1. 如果没登录且试图访问受限页面
    if (!isLoggedIn && (isAdminRoute || isAuthRoute)) {
        return NextResponse.redirect(new URL("/login", nextUrl));
    }

    // 2. 如果是司机试图进管理后台
    if (isAdminRoute && !capabilities.includes("administrator")) {
        return NextResponse.redirect(new URL("/dashboard", nextUrl));
    }

    return NextResponse.next();
})

export const config = {
    matcher: ["/admin/:path*", "/dashboard/:path*"],
}
