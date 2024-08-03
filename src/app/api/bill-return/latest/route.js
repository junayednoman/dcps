import { cookies } from "next/headers";
import { NextResponse } from "next/server";
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

    const token = cookies().get("authToken")?.value;
    const checkExpirity = checkJwtExpirity(token);

    // verify token
    if (!token || checkExpirity?.isExpired) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const db = await getDb();
    const bodyData = await req.json();

    const query = { "school.general.name": bodyData.name };
    const result = await db
      .collection("bills")
      .find(query)
      .sort({ submitted_at: -1 })
      .limit(1)
      .toArray();
    if (!result) {
      return NextResponse.json(
        {
          success: true,
          message: "Data fetched successfully!",
          data: result,
        },
        { status: 200 }
      );
    }
    return NextResponse.json(
      {
        success: true,
        message: "Data fetched successfully!",
        data: result,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("error, ", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
