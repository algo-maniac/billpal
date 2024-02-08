import { connectDB } from "@/lib/mongodb";
import { Group } from "@/models/group.model";

import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // Connect to the database
    await connectDB();

    const { groupId } = await req.json();

    const group = await Group.findOne({ _id: groupId });

    if (!group) {
      return NextResponse.json({ status: 404, message: "Group not found" });
    }

    const memberList = group.memberArray;
    return NextResponse.json({ status: 200, memberList });
  } catch (error) {
    console.error("Error fetching members:", error);
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}
