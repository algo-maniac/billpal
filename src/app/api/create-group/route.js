import { connectDB } from "@/lib/mongodb";
import { Group } from "@/models/group.model";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();

    // console.log(req.json());
    const { name, description, password, currentUser } = await req.json();
    // console.log(req.json());
    console.log(name);
    console.log(description);
    console.log(password);
    console.log(currentUser);

    const existingGroup = await Group.findOne({ name });
    console.log(existingGroup);
    if (existingGroup) {
      return NextResponse.json({
        status: 400,
        message: "Group with same name already exists",
      });
    }
    let memberArray = [currentUser];

    const newGroup = await Group.create({
      name,
      description,
      password,
      transactionArray: [],
      memberArray: memberArray,
    });

    return NextResponse.json({
      message: "Group created successfully",
      newGroup,
      status: 201,
    });
  } catch (error) {
    // Handle any errors
    console.error("Error creating group:", error);
    return NextResponse.json({
      message: "Internal server error while creating group",
      status: 500,
    });
  }
}
