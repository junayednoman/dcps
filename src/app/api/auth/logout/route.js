import { NextResponse } from "next/server";

export async function POST(req, res) {
    if (req.method === "POST") {
        try {
            const response = NextResponse.json({ message: "Logged out successfully!" }, { status: 200 });
            response.cookies.set("authToken", "token", {
                httpOnly: true,
                secure: true,
                maxAge: 0,
            })
            return response;
        } catch (error) {
            return NextResponse.json({ message: "Internal server error!" });
        }
    } else {
        return NextResponse.json({ message: "Method not allowed!" });
    }
}