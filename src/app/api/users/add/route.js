import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import decodeUser from "@/lib/decodeUser";
import getDb from "@/lib/db";
import bcrypt from "bcrypt";
import checkJwtExpirity from "@/lib/checkJwtExpirity";

export async function POST(req, res) {
  try {
    if (!req.method === "POST") {
      return NextResponse.json(
        { error: "Method Not Allowed" },
        { status: 405 }
      );
    }

    const token = cookies().get("authToken").value;
    const checkExpirity = checkJwtExpirity(token);
    // verify token
    if (!token || checkExpirity?.isExpired) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // verify user role
    const { role } = decodeUser(token);
    if (role !== "ueo" && role !== "aueo") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const db = await getDb();
    const userData = await req.json();

    const getUserName = await db
      .collection("users")
      .findOne(
        { user_name: userData.user_name },
        { projection: { user_name: 1, _id: 0 } }
      );

    if (getUserName && userData.user_name === getUserName?.user_name) {
      return NextResponse.json({ message: "user name exist" });
    }

    const getUniqueId = await db
      .collection("users")
      .findOne(
        { unique_id: userData.unique_id },
        { projection: { unique_id: 1, _id: 0 } }
      );

    if (getUniqueId && userData.unique_id === getUniqueId?.unique_id) {
      return NextResponse.json({ message: "id exist" });
    }
    const plainPassword = userData.password;
    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    userData.password = hashedPassword;

    const result = await db.collection("users").insertOne(userData);

    if (!result.insertedId) {
      return NextResponse.json({ message: "Failed to post" }, { status: 500 });
    }

    return NextResponse.json(
      { success: true, message: "User created successfully", data: result },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
