import { connectDB } from "@/lib/mongodb";
import User from "@/models/user.model";

import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();
    const { uname } = await req.json();
    console.log(uname);
    // Connect to the MongoDB database

    // Find the group by name in the database
    const user = await User.findOne({ username: uname });
    // console.log(group);
    console.log(user);
    // Check if the group was found
    if (!user) {
      return NextResponse.json({ status: 404, error: "User not found" });
    }
    return NextResponse.json({ status: 200, user: user });
  } catch (error) {
    console.error("Error finding user by username:", error);
    return NextResponse.json({ status: 500, error: "Internal Server Error" });
  }
}
