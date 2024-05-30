import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import decodeUser from "@/lib/decodeUser";
import getDb from "@/lib/db";
import checkJwtExpirity from "@/lib/checkJwtExpirity";
import { ObjectId } from "mongodb";

export async function PATCH(req, res) {
  try {
    if (!req.method === "PATCH") {
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
    const body = await req.json();
    const updateData = body.updateData;
    const id = body.id;
    const query = {
      _id: new ObjectId(id),
    };
    const updateDoc = {
      $set: {
        updatedDate: updateData.updatedDate,
        isDraft: updateData.isDraft,
      },
    };
    const result = await db.collection("bills").updateOne(query, updateDoc);

    if (result.modifiedCount !== 1) {
      return NextResponse.json(
        { success: false, message: "Failed to post", data: result },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Bill return submitted",
      data: body,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
