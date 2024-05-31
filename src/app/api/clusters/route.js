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

    const db = await getDb();
    const cluster = await req.json();
    const query = { cluster_name: cluster };

    const result = await db.collection("clusters").findOne(query);

    if (!result) {
      return NextResponse.json(
        { success: false, message: "কোন তথ্য পাওয়া যাইনি" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Data fetched successfully", data: result },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
