import { connectDB } from "@/lib/mongodb";
import { Group } from "@/models/group.model";
import { Transaction } from "@/models/transaction.model";
import User from "@/models/user.model";

import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // Connect to the database
    await connectDB();

    const { id } = await req.json();

    const transaction = await Transaction.findOne({ _id: id });

    if (!transaction) {
      return NextResponse.json({
        status: 404,
        message: "Transaction not found",
      });
    }

    let len = transaction.finalTransactionList.length;
    let finalArray = transaction.finalTransactionList;
    let finalTransactionArray = [];
    for (let i = 0; i < len; i++) {
      const sender = await User.findById(finalArray[i].sender);
      const receiver = await User.findById(finalArray[i].receiver);
      const amount = finalArray[i].amount;
      finalTransactionArray.push({
        sender: sender.username,
        receiver: receiver.username,
        amount,
      });
    }

    console.log(finalTransactionArray);
    return NextResponse.json({ status: 200, finalTransactionArray });
  } catch (error) {
    console.error("Error fetching members:", error);
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}
