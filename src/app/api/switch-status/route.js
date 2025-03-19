import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import getDb from "@/lib/db";
import checkJwtExpirity from "@/lib/checkJwtExpirity";

export async function GET(req, res) {
  try {
    if (!req.method === "GET") {
      return NextResponse.json(
        { error: "Method Not Allowed" },
        { status: 405 }
      );
    }

    const token = cookies()?.get("authToken")?.value;
    const checkExpirity = checkJwtExpirity(token);

    // verify token
    if (!token || checkExpirity?.isExpired) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const db = await getDb();

    const result = await db.collection("status").findOne({ id: 1 });
    console.log(result);

    return NextResponse.json(
      {
        success: true,
        message: "status retrieved successfully!",
        data: result,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
