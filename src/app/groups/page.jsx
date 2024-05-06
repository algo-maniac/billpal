"use client";

import GroupCard from "@/components/GroupCard";
import { Delete } from "@mui/icons-material";
import axios from "axios";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function page() {
  const { data: session } = useSession();
  const [groupArray, setGroupArray] = useState([]);
  const [loader, setLoader] = useState(1);

  const router = useRouter();

  const getAllGroups = async () => {
    try {
      console.log(session);
      if (session === null) {
        toast.error("User not found");
      }
      const response = await axios.post("/api/get-groups-for-member", {
        currentUser: session.user.id,
      });
      const allGroups = response.data.groups;
      console.log(response);
      setGroupArray(allGroups);
      setLoader(0);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllGroups();
  }, []);
  return (
    <div className="mx-10 mb-20 py-8">
      {loader ? (
        <div className="loader mx-auto"></div>
      ) : (
        <div className="">
          <h1 className="text-tertiary text-3xl font-bold mb-8">Groups</h1>
          {groupArray.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {groupArray.map((group, index) => (
                <div
                  key={index}
                  className="coolBeans form-shade text-tertiary cursor-pointer rounded-2xl p-6"
                  onClick={() => {
                    router.replace(`/groups/${group._id}`);
                  }}
                >
                  <h2 className="text-xl font-bold mb-2">{group.name}</h2>
                  <p className="">{group.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-tertiary">NO GROUPS JOINED !!!</div>
          )}
        </div>
      )}
    </div>
  );
}

export default page;
