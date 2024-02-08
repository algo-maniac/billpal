import { Group } from "@/models/group.model";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Transaction } from "@/models/transaction.model";

export async function POST(req) {
  try {
    // Connect to the database
    await connectDB();

    // Extract data from the request body
    const { groupId, transactionId } = await req.json();
    console.log(groupId, transactionId);

    // Find the group by groupId
    const group = await Group.findOne({ _id: groupId });
    // console.log("Group Contains Group ID:", group._id == groupId);
    // console.log(
    //   "Group Contains Transaction ID:",
    //   group.transactionArray.includes(transactionId)
    // );
    // console.log("fetched:", group);

    if (!group) {
      return NextResponse.json({ status: 404, message: "Group not found" });
    }

    await Group.updateOne(
      { _id: groupId },
      {
        $pull: {
          transactionArray: transactionId,
        },
      }
    );
    const tran = await Transaction.findOne({ _id: transactionId });
    if (!tran) {
      return NextResponse.json({
        status: 404,
        message: "Transaction not found",
      });
    }

    await Transaction.findByIdAndDelete({ _id: transactionId });

    // console.log("result:", result);

    // const gp = await Group.findOne({ _id: groupId });
    // console.log("updated: ", gp);

    // Send a success response
    return NextResponse.json({
      status: 200,
      message: "Transaction removed successfully",
    });
  } catch (error) {
    console.error("Error removing transaction:", error);
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}
