import getDb from "@/lib/db";
import bcrypt from 'bcrypt'
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req, res) {
  if (req.method === "POST") {
    const { unique_id, password } = await req.json();
    try {
      const db = await getDb();
      const user = await db.collection("users").findOne({ unique_id: unique_id }, {projection: {_id: 0, created_at: 0}});
      console.log(user);
      if (user) {
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
          return NextResponse.json({ message: "Invalid credentials!" });
        }
        const payload = {
          unique_id: unique_id,
          role: user.role,
        };

        const secretKey = process.env.JWT_SECRET;
        const options = { expiresIn: "24h" };
        const token = jwt.sign(payload, secretKey, options);

        const response = NextResponse.json(
          {
            message: "Logged in successfully",
            user_name: user.user_name,
            role: user.role,
          },
          { status: 200 }
        );
        response.cookies.set("authToken", token, {
          httpOnly: true,
          secure: true,
          maxAge: 86400,
        });
        return response;
      } else {
        return NextResponse.json({ message: "Invalid credentials!" });
      }
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
  }
}
