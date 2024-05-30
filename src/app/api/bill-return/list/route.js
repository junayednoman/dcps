import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import getDb from "@/lib/db";
import checkJwtExpirity from "@/lib/checkJwtExpirity";
import decodeUser from "@/lib/decodeUser";

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

    const db = await getDb();
    const { cluster } = await req.json();

    const query = { "school.general.cluster": cluster, isDraft: false };

    const result = await db
      .collection("bills")
      .find(role === "ueo" ? { isDraft: false } : query)
      .project({ "school.general.name": 1, "school.general.emis_code": 1 })
      .toArray();

    return NextResponse.json(
      {
        success: true,
        message: "Data fetched successfully!",
        data: result,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
