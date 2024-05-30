import { NextResponse } from "next/server";
import decodeUser from "./lib/decodeUser";
import checkJwtExpirity from "./lib/checkJwtExpirity";

export function middleware(req, res) {
  const token = req.cookies.get("authToken")?.value;
  const checkExpirity = checkJwtExpirity(token);
  if (token && !checkExpirity?.isExpired) {
    try {
      if (req.nextUrl.pathname === "/") {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
      const { role } = decodeUser(token);
      if (
        req.nextUrl.pathname === "/dashboard/bill-return-submit" &&
        role !== "head-master"
      ) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
      if (
        req.nextUrl.pathname === "/dashboard/bill-return-list" ||
        req.nextUrl.pathname === "/dashboard/bill-return-summery"
      ) {
        if (role === "head-master") {
          return NextResponse.redirect(new URL("/dashboard", req.url));
        }
      }
      if (
        req.nextUrl.pathname === "/dashboard/bill-return-history" &&
        role === "ueo"
      ) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
      if (
        req.nextUrl.pathname === "/dashboard/users" &&
        role !== "ueo" &&
        role !== "aueo"
      ) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
      if (
        req.nextUrl.pathname.includes("/bill-details") &&
        role !== "ueo" &&
        role !== "aueo"
      ) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    } catch (error) {
      console.error("Token verification error:", error);
      return NextResponse.redirect(new URL("/", req.url));
    }
  } else if (req.nextUrl.pathname.includes("dashboard")) {
    return NextResponse.redirect(new URL("/", req.url));
  }
}
