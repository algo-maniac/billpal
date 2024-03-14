"use client";
import Animation from "@/components/Animation";
import StyleCard from "@/components/StyleCard";
import { Add, People } from "@mui/icons-material";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Home() {
  const router = useRouter();
  const [newGroupModal, setNewGroupModal] = useState(0);
  const [existingGroupModal, setExistingGroupModal] = useState(0);
  const [newGroup, setNewGroup] = useState({
    groupName: "",
    groupPassword: "",
    groupDescription: "",
  });
  const [existingGroup, setExistingGroup] = useState({
    groupName: "",
    groupPassword: "",
    groupDescription: "",
  });

  const { data: session } = useSession();
  const submitCreateGroupForm = async (e) => {
    try {
      e.preventDefault();
      console.log(session);
      console.log(newGroup);
      if (session === null) {
        toast.error("Not logged in!!!");
        return;
      }
      const response = await axios.post("/api/create-group", {
        name: newGroup.groupName,
        description: newGroup.groupDescription,
        password: newGroup.groupPassword,
        currentUser: session.user.id,
      });

      console.log(response.data);

      if (response.data.status === 201) {
        router.replace("/groups");
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const verifyPassword = async (e) => {
    try {
      e.preventDefault();
      if (session === null) {
        toast.error("Not logged in!!!");
        return;
      }
      const response = await axios.post("/api/verify-password", {
        currentUser: session.user.id,
        groupName: existingGroup.groupName,
        password: existingGroup.groupPassword,
      });

      if (response.data.status === 200 || response.data.status === 201) {
        toast.success(response.data.message);
        router.replace("/groups");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="font-face">
      <Toaster position="top-right" reverseOrder={false} className="absolute" />
      {newGroupModal ? (
        <div className="modal-animation fixed top-16 left-[50%] mx-auto z-20 text-tertiary flex flex-col justify-center w-[85%] sm:w-[60%] md:w-[50%] lg:w-[40%] xl:w-[30%] rounded-lg m-10 p-5 shadow-md shadow-slate-700 bg-primary">
          <div
            className={`text-3xl text-center border-2 border-secondary bg-secondary rounded-xl w-[60%] mx-auto p-2`}
          >
            CREATE A GROUP
          </div>
          <form className="text-xl flex flex-col justify-around">
            <div className="flex flex-col my-4">
              <div>Group Name</div>
              <input
                type="text"
                onChange={(e) => {
                  setNewGroup({ ...newGroup, groupName: e.target.value });
                }}
                value={newGroup.groupName}
                // className="my-2 p-1 px-2 rounded-lg outline-none border-2 border-backup bg-secondary w-full"
                className="m-1 outline-none w-full px-2 py-1 bg-primary border-2 border-tertiary rounded-lg"
              />
            </div>

            <div className="flex flex-col my-4">
              <div>Password</div>
              <input
                type="password"
                onChange={(e) => {
                  setNewGroup({ ...newGroup, groupPassword: e.target.value });
                }}
                value={newGroup.groupPassword}
                className="m-1 outline-none w-full px-2 py-1 bg-primary border-2 border-tertiary rounded-lg"
              />
            </div>

            <div className="flex flex-col my-4">
              <div>Description (MAX 20 words)</div>
              <input
                type="text"
                onChange={(e) => {
                  setNewGroup({
                    ...newGroup,
                    groupDescription: e.target.value,
                  });
                }}
                value={newGroup.groupDescription}
                className="m-1 outline-none w-full px-2 py-1 bg-primary border-2 border-tertiary rounded-lg"
              />
            </div>

            <button
              type="submit"
              className="coolBeans flex justify-center p-3 border-2 border-secondary bg-secondary rounded-xl w-[40%] mx-auto my-5"
              onClick={submitCreateGroupForm}
            >
              Submit
            </button>
          </form>
        </div>
      ) : null}
      {existingGroupModal ? (
        <div className="modal-animation fixed top-20 left-[50%] z-20 mx-auto text-tertiary flex flex-col justify-center w-[85%] sm:w-[60%] md:w-[50%] lg:w-[40%] xl:w-[30%] rounded-lg m-10 p-5 shadow-md shadow-slate-700 bg-primary">
          <div
            className={`text-3xl text-center border-2 border-secondary bg-secondary rounded-xl w-[60%] mx-auto p-2`}
          >
            JOIN A GROUP
          </div>
          <form className="text-xl flex flex-col justify-around">
            <div className="flex flex-col my-4">
              <div>Group Name</div>
              <input
                type="text"
                onChange={(e) => {
                  setExistingGroup({
                    ...existingGroup,
                    groupName: e.target.value,
                  });
                }}
                value={existingGroup.groupName}
                className="m-1 outline-none w-full px-2 py-1 bg-primary border-2 border-tertiary rounded-lg"
              />
            </div>
            <div className="flex flex-col my-4">
              <div>Password</div>
              <input
                type="password"
                onChange={(e) => {
                  setExistingGroup({
                    ...existingGroup,
                    groupPassword: e.target.value,
                  });
                }}
                value={existingGroup.groupPassword}
                className="m-1 outline-none w-full px-2 py-1 bg-primary border-2 border-tertiary rounded-lg"
              />
            </div>

            <button
              type="submit"
              className="coolBeans flex justify-center p-3 border-2 border-secondary bg-secondary rounded-xl w-[40%] mx-auto my-5"
              onClick={verifyPassword}
            >
              Submit
            </button>
          </form>
        </div>
      ) : null}
      <div
        className={`${newGroupModal || existingGroupModal ? "blur-lg overflow-hidden" : ""} flex flex-col justify-center h-full p-4`}
        onClick={() => {
          if (newGroupModal === 1) {
            setNewGroupModal(0);
          }
          if (existingGroupModal === 1) {
            setExistingGroupModal(0);
          }
        }}
      >
        <div className={`flex flex-col items-center justify-center`}>
          <div className="text-xl sm:text-xl md:text-3xl lg:text-5xl text-tertiary text-center mt-10">
            Welcome to Splitterz
          </div>
          <div className="text-md sm:text-lg md:text-xl lg:text-2xl text-tertiary text-center mt-10 mb-5">
            Simplify Your Group Expenses
          </div>
          <hr className="bg-tertiary text-tertiary border-tertiary h-[2px] w-[100%] mt-20" />
          <br />
          <div className="relative h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px] w-[90%]">
            <Image src="/images/landing.jpg" fill alt="Error Loading" />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="text-md sm:text-lg md:text-xl lg:text-2xl text-tertiary text-center mt-10">
            Tired of the hassle of splitting bills with friends or roommates?
            Look no further!
          </div>
          <div className="text-md sm:text-lg md:text-xl lg:text-2xl text-tertiary text-center mt-10">
            Introducing Splitterz: Your Solution to Hassle-Free Bill Splitting
          </div>

          <div className="text-md sm:text-lg md:text-xl lg:text-2xl text-tertiary text-center mt-10">
            With Splitterz, managing group expenses has never been easier.
            Whether you're sharing a meal, splitting rent, or organizing a trip,
            our app streamlines the process so you can focus on making memories,
            not math.
          </div>
        </div>

        <hr className="bg-tertiary text-tertiary border-tertiary h-[2px] w-[100%] mt-20" />
        <br />

        <div className="font-serif sm:flex-row flex-col my-4 text-md sm:text-lg md:text-xl lg:text-3xl flex justify-around items-center">
          <button
            onClick={() => {
              setNewGroupModal(1);
            }}
            className="coolBeans hover:opacity-100 opacity-85 m-2 flex items-center justify-center h-[100px] w-[80%] sm:w-[30%] bg-secondary shadow-md shadow-tertiary"
          >
            <Add className="text-3xl mr-2" />
            Create a group
          </button>
          <button
            onClick={() => {
              setExistingGroupModal(1);
            }}
            className="coolBeans hover:opacity-100 opacity-85 m-2 flex items-center justify-center h-[100px] w-[80%] sm:w-[30%] bg-secondary shadow-md shadow-tertiary"
          >
            <People className="text-3xl mr-2" />
            Join a group
          </button>
        </div>

        <div className="flex flex-col justify-center items-center text-lg sm:text-xl md:text-2xl lg:text-4xl my-20">
          <div className="my-6 form-shade p-3 rounded-lg shadow-sm shadow-tertiary">
            How it Works:
          </div>

          <div className="flex flex-col md:flex-row justify-around">
            <StyleCard
              description={
                "Create Groups: Simply create a group for each occasion, whether it's a night out, a vacation, or regular household expenses."
              }
            />
            <StyleCard
              description={
                "Add Expenses: Input what you've paid for, and let SplitEase do the rest. Easily assign who paid for what, and watch as the app calculates everyone's share."
              }
            />
            <StyleCard
              description={
                "Fair and Transparent: No more confusion or awkward conversations. SplitEase shows exactly who owes what, making settling up a breeze."
              }
            />
            <StyleCard
              description={
                "Instant Notifications: Get real-time updates on who has paid and who still owes, so you're always in the loop."
              }
            />
          </div>
        </div>

        <hr className="bg-tertiary text-tertiary border-tertiary h-[2px] w-[100%] mt-20" />
        <br />
        <div className="flex flex-col justify-center items-center text-lg sm:text-xl md:text-2xl lg:text-4xl my-20">
          <div className="my-6 form-shade p-3 rounded-lg shadow-sm shadow-tertiary">
            Why choose Splitterz?
          </div>
          <ul className="flex flex-col justify-around list-disc">
            <li className="m-3 text-lg sm:text-xl">
              Save Time: No more manual calculations or chasing friends for
              money.
            </li>
            <li className="m-3 text-lg sm:text-xl">
              Stay Organized: All your expenses neatly organized in one place.
            </li>
            <li className="m-3 text-lg sm:text-xl">
              Avoid Awkwardness: Keep friendships intact with clear, transparent
              splitting.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
