import { connectDB } from "@/lib/mongodb";
import { Group } from "@/models/group.model";
import { Transaction } from "@/models/transaction.model";

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

    const transactionList = [];
    let len = group.transactionArray.length;
    // console.log(group);
    for (let i = 0; i < len; i++) {
      console.log(group.transactionArray[i]);
      let currTransaction = await Transaction.findOne({
        _id: group.transactionArray[i],
      });
      // console.log(currMember);
      if (currTransaction !== null) {
        transactionList.push(currTransaction);
      }
    }

    console.log(transactionList);
    return NextResponse.json({ status: 200, transactionList });
  } catch (error) {
    console.error("Error fetching members:", error);
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}
