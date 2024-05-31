import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import getDb from "@/lib/db";
import checkJwtExpirity from "@/lib/checkJwtExpirity";
import decodeUser from "@/lib/decodeUser";
import moment from "moment";

export async function POST(req, res) {
  try {
    if (req.method !== "POST") {
      return NextResponse.json(
        { error: "Method Not Allowed" },
        { status: 405 }
      );
    }

    const tokenCookie = cookies().get("authToken");
    if (!tokenCookie) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const token = tokenCookie.value;
    const checkExpirity = checkJwtExpirity(token);

    if (checkExpirity?.isExpired) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { role } = decodeUser(token);

    const db = await getDb();
    const { cluster, userName, targetDate, schoolName } = await req.json();

    // const cluster = "সাধুহাটি ক্লাস্টার";
    // const userName = "সাধুহাটি ক্লাস্টার";
    // const targetDate = "May 2024";
    // const schoolName = "নিমারাই সরকারি প্রাথমিক বিদ‌্যালয়";

    const headmasterQuery = {
      submitted_by: userName,
      "school.general.name": schoolName,
      isDraft: false,
    };
    const aueoQuery = {
      "school.general.cluster": cluster,
      "school.general.name": schoolName,
      isDraft: false,
    };

    const generalQuery = {
      "school.general.name": schoolName,
      isDraft: false,
    };
    // const role = "ueo"

    const result = await db
      .collection("bills")
      .findOne(
        role === "head-master"
          ? headmasterQuery
          : role === "aueo"
          ? aueoQuery
          : generalQuery
      );
    console.log(result);
    if (!result) {
      return NextResponse.json(
        {
          success: false,
          message: "কোন তথ্য পাওয়া যাইনি!",
        },
        { status: 404 }
      );
    }

    const submitDate = moment(result?.submitted_at).format("MMMM YYYY");
    if (targetDate !== submitDate) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to fetch data!",
        },
        { status: 404 }
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
    console.error("Server Error:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
