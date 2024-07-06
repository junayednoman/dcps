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
    if (role !== "ueo" && role !== "aueo") {
      return NextResponse.json({ message: "Forbidden!" }, { status: 403 });
    }

    const db = await getDb();
    const parent = await req.json();
    const query = { parent: parent };
    const ueoQuery = {parent: parent, role: 'aueo'};

    const result = await db
      .collection("users")
      .find(role === "aueo" ? query : ueoQuery, {
        projection: { unique_id: 0, password: 0, parent: 0 },
      })
      .sort({ created_at: -1 })
      .toArray();
    console.log(result);

    if (!result) {
      return NextResponse.json({ message: "Failed to fetch" }, { status: 500 });
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
