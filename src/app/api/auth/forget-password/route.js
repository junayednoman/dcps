import { NextResponse } from "next/server";
import getDb from "@/lib/db";
import crypto from "crypto";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    if (req.method !== "POST") {
      return NextResponse.json(
        { error: "Method Not Allowed" },
        { status: 405 }
      );
    }

    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    const db = await getDb();
    const user = await db.collection("users").findOne({ unique_id: userId });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const token = crypto.randomBytes(32).toString("hex");
    const hashedToken = await bcrypt.hash(token, 10);

    await db.collection("users").updateOne(
      { unique_id: userId },
      {
        $set: {
          resetPasswordToken: hashedToken,
          resetPasswordExpires: Date.now() + 3600000, // 1 hour
        },
      }
    );

    // For demonstration, returning the token in the response. In a real application, send the token via email or SMS.
    return NextResponse.json(
      { success: true, message: "Password reset token generated", hashedToken },
      { status: 200 }
    );
  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
