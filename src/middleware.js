import { NextResponse } from "next/server";
import decodeUser from "./lib/decodeUser";
import decodeJwt from "./lib/handleLogout";

export function middleware(req, res) {
    const token = req.cookies.get("authToken")?.value;
    const tokenExp = decodeJwt(token)?.exp;
    const currentTime = Math.floor(Date.now() / 1000);
    const isExpired = tokenExp < currentTime;
    if (token && !isExpired) {
        try {
            if (req.nextUrl.pathname === '/') {
                return NextResponse.redirect(new URL("/dashboard", req.url))
            }
            const { role } = decodeUser(token);
            if (req.nextUrl.pathname === '/dashboard/bill-return-submit' && role !== "head-master") {
                return NextResponse.redirect(new URL("/dashboard", req.url))
            }
            if (req.nextUrl.pathname === '/dashboard/bill-return-list' || req.nextUrl.pathname === '/dashboard/bill-return-summery') {
                if (role === "head-master") {
                    return NextResponse.redirect(new URL("/dashboard", req.url))
                }
            }
            if (req.nextUrl.pathname === '/dashboard/bill-return-history' && role === "ueo") {
                return NextResponse.redirect(new URL("/dashboard", req.url))
            }
            if (req.nextUrl.pathname === '/dashboard/users' && role !== "ueo") {
                return NextResponse.redirect(new URL("/dashboard", req.url))
            }
        } catch (error) {
            console.error('Token verification error:', error);
            return NextResponse.redirect(new URL("/", req.url));
        }
    } else if (req.nextUrl.pathname.includes('dashboard')) {
        return NextResponse.redirect(new URL("/", req.url))
    }
}