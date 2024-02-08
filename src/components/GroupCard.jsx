"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

function GroupCard({
  name,
  description,
  id,
  setApprovalModal,
  credentials,
  setCredentials,
}) {
  return (
    <div
      // onClick={() => {
      //   router.push(`/groups/${id}`);
      // }}
      onClick={() => {
        setApprovalModal((prev) => !prev);
        setCredentials({ ...credentials, name });
      }}
      className="cursor-pointer relative bg-primary text-tertiary rounded-xl shadow-md shadow-backup border-black h-[300px] lg:h-[400px] w-[45%] sm:w-[27%] md:w-[20%] lg:w-[15%] m-[2.5%]"
    >
      <Image
        src="/images/group_image.jpg"
        height={200}
        width={300}
        alt="Image missing"
        className="p-2 shadow-black"
      />
      <div className="p-3 text-xs flex flex-col justify-around h-[40%]">
        <div className="mb-3">Group Name: {name}</div>
        <div>Group Description: {description}</div>
      </div>
    </div>
  );
}

export default GroupCard;
