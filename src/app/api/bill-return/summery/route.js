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
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    // const role = "aueo";

    const db = await getDb();
    const { cluster } = await req.json();
    console.log("cluster,", cluster);

    const query = { "school.general.cluster": cluster, isDraft: false };

    const result = await db
      .collection("bills")
      .find(role === "ueo" ? { isDraft: false } : query, {
        projection: {
          "teacher.general.permitted_post": 1,
          "teacher.general.working_post": 1,
          "teacher.general.vacation_consumers": 1,
          _id: 0, // Exclude the _id field from the result
        },
      })
      .toArray();

    if (result.length < 1) {
      return NextResponse.json(
        { message: "কোন তথ্য পাওয়া যাইনি!" },
        { status: 404 }
      );
    }

    // calculate the stats
    let permittedPosts = 0;
    let workingPosts = 0;
    let vacationConsumers = 0;
    result.forEach((obj) => {
      permittedPosts =
        permittedPosts + Number(obj.teacher.general.permitted_post);
      workingPosts = workingPosts + Number(obj.teacher.general.working_post);
      vacationConsumers =
        vacationConsumers + Number(obj.teacher.general.vacation_consumers);
    });

    const stats = { permittedPosts, workingPosts, vacationConsumers };
    return NextResponse.json({
      success: true,
      message: "Stats retrieved successfully!",
      data: stats,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
