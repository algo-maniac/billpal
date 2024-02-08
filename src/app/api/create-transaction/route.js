import { connectDB } from "@/lib/mongodb";
import { Group } from "@/models/group.model";
import { Transaction } from "@/models/transaction.model";

import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();

    const { groupId, name, members, finalTransactionList } = await req.json();

    const transactionName = name;
    const memberArray = members;

    const newTransaction = await Transaction.create({
      groupId,
      transactionName,
      memberArray,
      finalTransactionList,
    });

    const existingGroup = await Group.findById(groupId);

    if (!existingGroup) {
      return NextResponse.json({ status: 404, message: "Group not found" });
    }

    existingGroup.transactionArray.push(newTransaction._id);
    existingGroup.save();

    // Send a success response
    return NextResponse.json({
      status: 201,
      message: "Transaction created successfully",
      transaction: newTransaction,
    });
  } catch (error) {
    console.error("Error creating transaction:", error);
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}
