import { connectDB } from "@/lib/mongodb";
import { Group } from "@/models/group.model";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();

    const { name, description, password } = await req.json();

    const newGroup = await Group.create({
      name,
      description,
      password,
      transactionArray: [],
      memberArray: [],
    });

    return NextResponse.json(
      { message: "Group created successfully", newGroup },
      { status: 201 }
    );
  } catch (error) {
    // Handle any errors
    console.error("Error creating group:", error);
    return NextResponse.json(
      { message: "Internal server error while creating group" },
      { status: 500 }
    );
  }
}
