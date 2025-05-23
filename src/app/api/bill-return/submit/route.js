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
    if (role !== "head-master") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const db = await getDb();
    const billData = await req.json();
    const result = await db.collection("bills").insertOne(billData);

    if (!result.acknowledged) {
      return NextResponse.json({ message: "Failed to post" }, { status: 500 });
    }

    return NextResponse.json({ message: "Bill return submitted" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
