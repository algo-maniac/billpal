import { connectDB } from "@/lib/mongodb";
import { Group } from "@/models/group.model";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { memberId, groupId, password } = await req.json();

  // Check if the group with groupId exists
  try {
    await connectDB(); // Connect to MongoDB
    const existingGroup = await Group.findById(groupId);

    if (!existingGroup) {
      return NextResponse.json({ status: 404, message: "Group not found" });
    }

    // Check if the provided password matches the group's password
    if (existingGroup.password !== password) {
      return NextResponse.json({ status: 401, message: "Incorrect password" });
    }

    // Add the memberId to the memberArray
    existingGroup.memberArray.push(memberId);
    await existingGroup.save();

    return NextResponse.json({
      status: 200,
      message: "Member added successfully",
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}
