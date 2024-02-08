import { connectDB } from "@/lib/mongodb";
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
