import { connectDB } from "@/lib/mongodb";
import { Group } from "@/models/group.model";

import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    // Connect to the database
    await connectDB();

    const groups = await Group.find();

    return NextResponse.json({
      status: 200,
      message: "Group not found",
      groups,
    });
  } catch (error) {
    console.error("Error fetching groups:", error);
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}
