import { NextResponse } from "next/server";
import getDb from "@/lib/db";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";

export async function POST(req) {
  try {
    if (req.method !== "POST") {
      return NextResponse.json(
        { error: "Method Not Allowed" },
        { status: 405 }
      );
    }

    const { token, password } = await req.json();

    if (!token || !password) {
      return NextResponse.json(
        { message: "Token and new password are required" },
        { status: 400 }
      );
    }

    const db = await getDb();

    // Find the user with the provided reset token
    const user = await db
      .collection("users")
      .findOne({ resetPasswordToken: token });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Invalid or expired token" },
        { status: 400 }
      );
    }

    // Check if the token has expired
    if (user.resetPasswordExpires && user.resetPasswordExpires < Date.now()) {
      return NextResponse.json(
        { success: false, message: "Token has expired" },
        { status: 400 }
      );
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user's password in the database
    await db.collection("users").updateOne(
      { _id: new ObjectId(user._id) },
      {
        $set: {
          password: hashedPassword,
          resetPasswordToken: null, // Clear the reset token
          resetPasswordExpires: null, // Clear the expiration time
        },
      }
    );

    return NextResponse.json(
      { success: true, message: "Password reset successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
