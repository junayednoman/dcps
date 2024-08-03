import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import decodeUser from "@/lib/decodeUser";
import getDb from "@/lib/db";
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
    if (role !== "ueo") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const db = await getDb();
    const status = await req.json();
    console.log(status);
    const updateDoc = {
      $set: status,
    };
    const result = await db
      .collection("status")
      .updateOne({ id: 1 }, updateDoc, { upsert: true });
    console.log(result);

    return NextResponse.json(
      { success: true, message: "status updated successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
