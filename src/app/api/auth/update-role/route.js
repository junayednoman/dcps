import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import decodeJwt from "@/lib/handleLogout";
import decodeUser from "@/lib/decodeUser";
import getDb from "@/lib/db";
import { ObjectId } from "mongodb";

export async function POST(req, res) {
  try {
    console.log(req.method);

    // const token = cookies().get("authToken").value;
    // const tokenExp = decodeJwt(token)?.exp;
    // const currentTime = Math.floor(Date.now() / 1000);
    // const isExpired = tokenExp < currentTime;

    // // verify token
    // if (!token || isExpired) {
    //   return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    // }

    const db = await getDb();
    const role  = await req.json();
    console.log(role);
    const filter = { _id: new ObjectId("663a11b8c5fe06c65707cb1b") };
    const updateDoc = {
      $set: {
        role: role,
      },
    };
    const result = await db.collection("users").updateOne(filter, updateDoc);
    console.log(result);

    if (result.modifiedCount !== 1) {
      return NextResponse.json(
        { message: "Failed to update" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Role updated successfully",
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
