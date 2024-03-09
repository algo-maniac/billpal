import { connectDB } from "@/lib/mongodb";
import { Group } from "@/models/group.model";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(req) {
  const { currentUser, groupName, password } = await req.json();

  // Check if the group with groupId exists
  try {
    await connectDB(); // Connect to MongoDB
    const existingGroup = await Group.findOne({ name: groupName });
    console.log(existingGroup);

    if (!existingGroup) {
      return NextResponse.json({ status: 404, message: "Group not found" });
    }

    console.log(existingGroup.memberArray);
    const isAlreadyMember = existingGroup.memberArray.some((memberId) =>
      memberId.equals(currentUser)
    );
    if (isAlreadyMember) {
      return NextResponse.json({
        status: 201,
        message: "Member already exists in group",
      });
    }
    // Check if the provided password matches the group's password
    if (existingGroup.password !== password) {
      return NextResponse.json({
        status: 401,
        message: "Incorrect password",
      });
    }

    existingGroup.memberArray.push(currentUser);
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
