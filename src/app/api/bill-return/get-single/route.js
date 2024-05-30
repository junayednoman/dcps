import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import getDb from "@/lib/db";
import checkJwtExpirity from "@/lib/checkJwtExpirity";
import decodeUser from "@/lib/decodeUser";
import { ObjectId } from "mongodb";

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
    const bodyData = await req.json();
    const headmasterQuery = {
      _id: new ObjectId(bodyData.id),
      submitted_by: bodyData.userName,
    };
    const aueoQuery = {
      _id: new ObjectId(bodyData.id),
      "school.general.cluster": bodyData.cluster,
    };
    const generalQuery = { _id: new ObjectId(bodyData.id) };
    const result = await db
      .collection("bills")
      .findOne(
        role === "head-master"
          ? headmasterQuery
          : role === "aueo"
          ? aueoQuery
          : generalQuery
      );
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
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
