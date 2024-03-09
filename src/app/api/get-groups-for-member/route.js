import { connectDB } from "@/lib/mongodb";
import { Group } from "@/models/group.model";

import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // Connect to the database
    await connectDB();

    const { currentUser } = await req.json();
    const groups = await Group.find({ memberArray: currentUser });

    return NextResponse.json({
      status: 200,
      message: "Groups corresponding to the member",
      groups,
    });
  } catch (error) {
    console.error("Error fetching groups:", error);
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}
