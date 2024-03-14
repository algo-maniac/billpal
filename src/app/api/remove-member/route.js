import { Group } from "@/models/group.model";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";

export async function POST(req) {
  try {
    // Connect to the database
    await connectDB();

    // Extract data from the request body
    const { groupId, memberId } = await req.json();
    console.log(groupId, memberId);

    // Find the group by groupId
    const group = await Group.findOne({ _id: groupId });

    if (!group) {
      return NextResponse.json({ status: 404, message: "Group not found" });
    }

    if (group.memberArray.length === 1) {
      await Group.deleteOne({ _id: groupId });
    }
    await Group.updateOne(
      { _id: groupId },
      {
        $pull: {
          memberArray: memberId,
        },
      }
    );

    return NextResponse.json({
      status: 200,
      message: "Group left",
    });
  } catch (error) {
    console.error("Error removing member:", error);
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}
