import { Group } from "@/models/group.model";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Transaction } from "@/models/transaction.model";

export async function POST(req) {
  try {
    // Connect to the database
    await connectDB();

    // Extract data from the request body
    const { groupId } = await req.json();
    console.log(groupId);

    // Find the group by groupId
    const group = await Group.findOne({ _id: groupId });

    if (!group) {
      return NextResponse.json({ status: 404, message: "Group not found" });
    }

    let transactionArray = group.transactionArray;
    let len = transactionArray.length;
    for (let i = 0; i < len; i++) {
      let currTransaction = Transaction.findById(transactionArray[i]);
      if (currTransaction) {
        await Transaction.findByIdAndDelete(transactionArray[i]);
      }
    }

    await Group.findByIdAndDelete(groupId);

    return NextResponse.json({
      status: 200,
      message: "Group removed successfully",
    });
  } catch (error) {
    console.error("Error removing member:", error);
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}
