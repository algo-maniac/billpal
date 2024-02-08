"use client";

import { Delete } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

function MemberCard({ id, name, email, upiId, removeMember }) {
  const router = useRouter();
  return (
    <div className="flex flex-col cursor-pointer relative bg-primary text-tertiary rounded-xl shadow-md shadow-backup border-black h-[350px] w-[45%] sm:w-[27%] md:w-[20%] lg:w-[15%] m-[2.5%]">
      <Image
        src="/images/group_image.jpg"
        height={200}
        width={300}
        alt="Image missing"
        className="p-2 shadow-black"
      />
      <div className="p-3 text-[9px] flex flex-col justify-around h-[40%] w-[100%]">
        <div>Name: {name}</div>
        <div>Email: {email}</div>
        <div>UPI ID: {upiId}</div>
      </div>

      <div className="flex justify-center items-center text-xs border-2 border-secondary rounded-lg mb-3 px-2 bg-secondary w-[60%] mx-auto">
        <div>Delete Member</div>
        <button
          onClick={() => {
            removeMember(id);
          }}
          className="flex justify-center items-center"
        >
          <Delete className="text-sm" />
        </button>
      </div>
    </div>
  );
}

export default MemberCard;
