import { connectDB } from "@/lib/mongodb";
import { Group } from "@/models/group.model";
import User from "@/models/user.model";

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

    const memberList = [];
    let len = group.memberArray.length;
    // console.log(group);
    for (let i = 0; i < len; i++) {
      console.log(group.memberArray[i]);
      let currMember = await User.findOne({ _id: group.memberArray[i] });
      // console.log(currMember);
      memberList.push(currMember);
    }

    // console.log(memberList);
    return NextResponse.json({ status: 200, memberList });
  } catch (error) {
    console.error("Error fetching members:", error);
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}
