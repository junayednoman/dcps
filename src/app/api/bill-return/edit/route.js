import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import decodeUser from "@/lib/decodeUser";
import getDb from "@/lib/db";
import checkJwtExpirity from "@/lib/checkJwtExpirity";
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
    if (role !== "head-master") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const db = await getDb();
    const bodyData = await req.json();
    const query = {
      _id: new ObjectId(bodyData._id),
      submitted_by: bodyData.formData.submitted_by,
    };
    const updateDoc = {
      $set: bodyData.formData,
    };
    const result = await db.collection("bills").updateOne(query, updateDoc);

    if (result.modifiedCount !== 1) {
      return NextResponse.json(
        { success: false, message: "Failed to post!" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Bill return updated successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
