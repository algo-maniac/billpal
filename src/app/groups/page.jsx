"use client";

import GroupCard from "@/components/GroupCard";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function page() {
  const { data: session } = useSession();
  const [groupArray, setGroupArray] = useState([]);

  const [approvalModal, setApprovalModal] = useState(0);

  const submitHandler = async (e) => {
    let size = groupArray.length;
    setGroupArray((prev) => [...prev, { ...groupDetails, id: size + 1 }]);
    setGroupDetails({
      id: 0,
      name: "",
      description: "",
    });

    const response = await axios.post("/api/create-group", {
      name: groupDetails.name,
      description: groupDetails.description,
      password: groupDetails.password,
    });
    console.log(response.data);
  };

  const [groupDetails, setGroupDetails] = useState({
    id: 0,
    name: "",
    description: "",
    password: "",
  });

  const [credentials, setCredentials] = useState({
    name: "",
    password: "",
  });

  const router = useRouter();
  const verifyPassword = async (e) => {
    e.preventDefault();
    const memberId = session?.user?.id;
    const groupIdResponse = await axios.post("/api/get-groupid-by-name", {
      groupName: credentials.name,
    });
    const groupId = groupIdResponse.data.groupId;
    console.log(groupIdResponse.data);
    const response = await axios.post("/api/verify-password", {
      memberId,
      password: credentials.password,
      groupId,
    });
    if (response.data.status === 200) router.push(`/groups/${groupId}`);
  };

  useEffect(() => {
    (async () => {
      const response = await axios.get("/api/get-all-groups");
      const allGroups = response.data.groups;
      console.log(response);
      setGroupArray(allGroups);
    })();
  }, []);
  return (
    <div>
      {approvalModal ? (
        <div className="sticky top-24 z-20 mx-auto text-tertiary flex flex-col justify-center w-[85%] sm:w-[60%] md:w-[50%] lg:w-[40%] xl:w-[30%] rounded-lg m-10 p-5 shadow-md shadow-slate-700 bg-primary">
          <div
            className={`text-3xl text-center border-2 border-secondary bg-secondary rounded-xl w-[60%] mx-auto p-2`}
          >
            Enter the group
          </div>
          <form className="text-xl flex flex-col justify-around">
            <div className="flex flex-col my-4">
              <div>Group Name</div>
              <input
                type="text"
                onChange={(e) => {
                  setCredentials({ ...credentials, name: e.target.value });
                }}
                value={credentials.name}
                className="my-2 p-1 px-2 rounded-lg outline-none border-2 border-backup bg-backup w-full"
              />
            </div>
            <div className="flex flex-col my-4">
              <div>Password</div>
              <input
                type="password"
                onChange={(e) => {
                  setCredentials({ ...credentials, password: e.target.value });
                }}
                value={credentials.password}
                className="my-2 p-1 px-2 rounded-lg outline-none border-2 border-backup bg-backup w-full"
              />
            </div>

            <button
              type="submit"
              className="flex justify-center p-3 border-2 border-secondary bg-secondary rounded-xl w-[40%] mx-auto my-5"
              onClick={verifyPassword}
            >
              Submit
            </button>
          </form>
        </div>
      ) : null}
      <div className={`${approvalModal ? "blur-lg" : ""} flex flex-col`}>
        <div className="flex justify-center">
          <div className="text-tertiary flex flex-col justify-center w-[85%] sm:w-[60%] md:w-[50%] lg:w-[40%] xl:w-[30%] rounded-lg m-10 p-5 shadow-md shadow-slate-700 bg-primary">
            <div className="text-3xl text-center border-2 border-secondary bg-secondary rounded-xl w-[60%] mx-auto py-2">
              Add a group
            </div>
            <form className="text-xl flex flex-col justify-around">
              <div className="flex flex-col my-2">
                <div>Group Name</div>
                <input
                  type="text"
                  onChange={(e) => {
                    setGroupDetails({ ...groupDetails, name: e.target.value });
                  }}
                  value={groupDetails.name}
                  className="p-1 px-2 rounded-lg outline-none border-2 border-backup bg-backup w-full"
                />
              </div>
              <div className="flex flex-col my-2">
                <div>Group Password</div>
                <input
                  type="password"
                  onChange={(e) => {
                    setGroupDetails({
                      ...groupDetails,
                      password: e.target.value,
                    });
                  }}
                  value={groupDetails.password}
                  className="p-1 px-2 rounded-lg outline-none border-2 border-backup bg-backup w-full"
                />
              </div>
              <div className="flex flex-col my-2">
                <div>Description</div>
                <textarea
                  onChange={(e) => {
                    setGroupDetails({
                      ...groupDetails,
                      description: e.target.value,
                    });
                  }}
                  value={groupDetails.description}
                  className="resize-none h-[100px] p-1 px-2 rounded-lg outline-none border-2 border-backup bg-backup w-full"
                />
              </div>

              <button
                type="submit"
                className="flex justify-center p-3 border-2 border-secondary bg-secondary rounded-xl w-[40%] mx-auto my-5"
                onClick={submitHandler}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
        <div className="flex justify-around items-center w-full flex-wrap">
          {groupArray.map((group) => (
            <GroupCard
              name={group.name}
              description={group.description}
              id={group._id}
              key={group._id}
              setApprovalModal={setApprovalModal}
              setCredentials={setCredentials}
              credentials={credentials}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default page;
