"use client";

import { Delete } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

function TransactionCard({
  id,
  name,
  members,
  finalTransactionList,
  removeTransaction,
}) {
  const router = useRouter();
  return (
    <div className="flex flex-col justify-around cursor-pointer relative bg-primary text-tertiary rounded-xl shadow-md shadow-backup border-black h-[500px] w-[45%] sm:w-[27%] md:w-[20%] lg:w-[15%] m-[2.5%]">
      <Image
        src="/images/group_image.jpg"
        height={200}
        width={300}
        alt="Image missing"
        className="p-2 shadow-black"
      />
      <div className="p-3 text-[9px] flex flex-col justify-around h-[50%]">
        <div className="flex my-2">Transaction Name: {name}</div>
        <div className="flex mb-2">
          <div>Members:&nbsp;</div>
          {members.map((member, index) => (
            <div key={member.id}>
              {member.name}
              {index !== members.length - 1 ? "," : ""}{" "}
            </div>
          ))}
        </div>
        <div>Amount Paid: </div>
        {members.map((member) => (
          <div key={member.id}>
            {member.name} : {member.amountPaid}
          </div>
        ))}

        <div className="mt-2">Amount To Be Paid: </div>
        {finalTransactionList.map((transaction, index) => (
          <div key={index}>
            {`Amount: ${transaction.amount}`} &nbsp;&nbsp;
            {transaction.sender} {" -> "} {transaction.receiver}{" "}
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center text-xs border-2 border-secondary rounded-lg mb-10 px-[10px] box-content bg-secondary w-[60%] mx-auto">
        <div>Delete Transaction</div>
        <button
          onClick={() => {
            removeTransaction(id);
          }}
          className="flex justify-center items-center"
        >
          <Delete className="text-sm" />
        </button>
      </div>
    </div>
  );
}

export default TransactionCard;
