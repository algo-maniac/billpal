import { connectDB } from "@/lib/mongodb";
import { Group } from "@/models/group.model";

import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // Extract the group name from the request body
    const { groupId } = await req.json();

    // Connect to the MongoDB database
    await connectDB();

    // Find the group by name in the database
    const group = await Group.findOne({ _id: groupId });
    console.log(group);

    // Check if the group was found
    if (!group) {
      return NextResponse.json({ status: 404, error: "Group not found" });
    }
    return NextResponse.json({ status: 200, gName: group.name });
  } catch (error) {
    console.error("Error finding group by name:", error);
    return NextResponse.json({ status: 500, error: "Internal Server Error" });
  }
}
