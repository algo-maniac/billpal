import { connectDB } from "@/lib/mongodb";
import { Group } from "@/models/group.model";
import { Transaction } from "@/models/transaction.model";
import User from "@/models/user.model";

import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();

    const { groupId, name, description, members, transactionDetails } =
      await req.json();

    let len = transactionDetails.members.length;
    let totalAmount = Number(0);
    for (let i = 0; i < len; i++) {
      totalAmount += Number(transactionDetails.members[i].amountPaid);
      // console.log(Number(transactionDetails.members[i].amountPaid));
      console.log(totalAmount);
    }
    let average = totalAmount / len;
    console.log(totalAmount);
    console.log(average);
    console.log(typeof average);

    let senderList = [],
      receiverList = [];
    for (let i = 0; i < len; i++) {
      let paid = Number(transactionDetails.members[i].amountPaid);
      console.log(typeof paid);
      if (paid < average) {
        senderList.push({
          ...transactionDetails.members[i],
          amountToBePaid: Math.abs(paid - average),
        });
      }
      if (paid > average) {
        receiverList.push({
          ...transactionDetails.members[i],
          amountToBeReceived: Math.abs(paid - average),
        });
      }
    }
    console.log(senderList);
    console.log(receiverList);

    console.log(20);
    let finalList = [];

    let i = 0,
      j = 0;
    let len1 = senderList.length,
      len2 = receiverList.length;
    while (i < len1 && j < len2) {
      if (senderList[i].amountToBePaid > receiverList[j].amountToBeReceived) {
        finalList.push({
          sender: senderList[i].name,
          receiver: receiverList[j].name,
          amount: receiverList[j].amountToBeReceived.toFixed(2),
        });
        senderList[i].amountToBePaid =
          senderList[i].amountToBePaid - receiverList[j].amountToBeReceived;

        receiverList[j].amountToBeReceived = 0;
        j++;
      } else if (
        senderList[i].amountToBePaid < receiverList[j].amountToBeReceived
      ) {
        finalList.push({
          sender: senderList[i].name,
          receiver: receiverList[j].name,
          amount: senderList[i].amountToBePaid.toFixed(2),
        });
        senderList[i].amountToBePaid = 0;
        receiverList[j].amountToBeReceived =
          receiverList[j].amountToBeReceived - senderList[i].amountToBePaid;
        i++;
      } else {
        finalList.push({
          sender: senderList[i].name,
          receiver: receiverList[j].name,
          amount: senderList[i].amountToBePaid.toFixed(2),
        });

        senderList[i].amountToBePaid = 0;
        receiverList[i].amountToBeReceived = 0;
        i++;
        j++;
      }
    }
    console.log(senderList);
    console.log(receiverList);
    console.log(finalList);

    const transactionName = name;
    const memberArray = members;

    len = memberArray.length;
    let finalMemberArray = [];
    for (let i = 0; i < len; i++) {
      const currMember = await User.findOne({ username: memberArray[i].name });
      finalMemberArray.push(currMember);
    }

    let transactionLength = finalList.length;
    let finalTransactionArray = [];
    for (let i = 0; i < transactionLength; i++) {
      const sender = await User.findOne({
        username: finalList[i].sender,
      });
      const receiver = await User.findOne({
        username: finalList[i].receiver,
      });
      finalTransactionArray.push({
        sender,
        receiver,
        amount: finalList[i].amount,
      });
    }

    const newTransaction = await Transaction.create({
      groupId,
      description,
      transactionName,
      memberArray: finalMemberArray,
      finalTransactionList: finalTransactionArray,
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
