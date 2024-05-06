"use client";
import Animation from "@/components/Animation";
import StyleCard from "@/components/StyleCard";
import { Add, People } from "@mui/icons-material";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Typewriter from "typewriter-effect";

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

  const [typeWriterWord, setTypeWriterWord] = useState("");
  const words = [
    "Welcome to BillPal",
    "Split your expenses!",
    "Pay your bills",
  ];
  let i = 0;
  let j = 0;
  let currentWord = "";
  let isDeleting = false;

  function type() {
    currentWord = words[i];
    if (isDeleting) {
      let curr = currentWord.substring(0, j - 1);

      setTypeWriterWord(curr);
      j--;
      if (j == 0) {
        isDeleting = false;
        i++;
        if (i == words.length) {
          i = 0;
        }
      }
    } else {
      let curr = currentWord.substring(0, j + 1);

      setTypeWriterWord(curr);
      j++;
      if (j == currentWord.length) {
        isDeleting = true;
      }
    }
    setTimeout(type, 300);
  }
  useEffect(() => {
    type();
  }, []);
  return (
    <div className="font-mono">
      <Toaster position="top-right" reverseOrder={false} className="absolute" />
      {newGroupModal ? (
        <div className="form modal-animation fixed top-16 left-[50%] mx-auto z-20 text-tertiary flex flex-col justify-center w-[85%] sm:w-[60%] md:w-[50%] lg:w-[40%] xl:w-[30%] rounded-lg m-10 p-5 shadow-md shadow-slate-700 bg-primary">
          <div
            className={`text-3xl text-center border-2 border-blue-800 bg-blue-800 rounded-xl w-[60%] mx-auto p-2`}
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
                className="m-1 outline-none w-full px-2 py-1 border-blue-800 bg-blue-800 rounded-lg"
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
                className="m-1 outline-none w-full px-2 py-1 border-blue-800 bg-blue-800 rounded-lg"
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
                className="m-1 outline-none w-full px-2 py-1 border-blue-800 bg-blue-800 rounded-lg"
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
        <div className="form modal-animation fixed top-20 left-[50%] z-20 mx-auto text-tertiary flex flex-col justify-center w-[85%] sm:w-[60%] md:w-[50%] lg:w-[40%] xl:w-[30%] rounded-lg m-10 p-5 shadow-md shadow-slate-700 bg-primary">
          <div
            className={`text-3xl text-center border-2 border-blue-800 bg-blue-800 rounded-xl w-[60%] mx-auto p-2`}
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
                className="m-1 outline-none w-full px-2 py-1 border-blue-800 bg-blue-800 rounded-lg"
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
                className="m-1 outline-none w-full px-2 py-1 border-blue-800 bg-blue-800 rounded-lg"
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
          <div className="flex flex-col md:flex-row items-center justify-around">
            <div className="flex flex-col w-[45%]">
              <div className="drop-shadow-md typewriter text-2xl sm:text-2xl md:text-3xl lg:text-5xl text-tertiary text-center mt-10">
                <Typewriter
                  options={{
                    strings: [
                      "Welcome to BillPal",
                      "Split your expenses",
                      "Pay your bills",
                    ],
                    autoStart: true,
                    loop: true,
                  }}
                />
              </div>
              <div className="text-md sm:text-lg md:text-xl lg:text-2xl text-tertiary text-center mt-10 mb-5">
                Simplify Your Group Expenses
              </div>
              <div className="text-sm sm:text-md md:text-md lg:text-lg flex flex-col items-center justify-center">
                <div className=" text-tertiary text-center mt-10">
                  Tired of the hassle of splitting bills with friends or
                  roommates? Look no further! Introducing BillPal: Your Solution
                  to Hassle-Free Bill Splitting
                </div>
                <div className=" text-tertiary text-center mt-10"></div>
              </div>
            </div>
            <div className="relative rounded-full border-2 md:h-[500px] md:w-[500px] sm:w-[400px] sm:h-[400px] w-[200px] h-[200px]">
              <Image
                src="/images/landing_image4.jpg"
                fill
                alt="Error Loading"
                className="rounded-full"
              />
            </div>
          </div>
        </div>

        {/* <hr className="bg-tertiary text-tertiary border-tertiary h-[2px] w-[100%] mt-20" /> */}
        {/* <br /> */}

        <div className="font-serif sm:flex-row flex-col mt-[200px] my-4 text-md sm:text-lg md:text-xl lg:text-3xl flex justify-around items-center">
          <button
            onClick={() => {
              setNewGroupModal(1);
            }}
            className="coolBeans hover:opacity-100 opacity-85 m-2 flex items-center justify-center h-[80px] w-[80%] sm:w-[25%] bg-secondary"
          >
            <Add className="text-3xl mr-2" />
            Create a group
          </button>
          <button
            onClick={() => {
              setExistingGroupModal(1);
            }}
            className="coolBeans hover:opacity-100 opacity-85 m-2 flex items-center justify-center h-[80px] w-[80%] sm:w-[25%] bg-secondary"
          >
            <People className="text-3xl mr-2" />
            Join a group
          </button>
        </div>

        <div className="text-tertiary flex flex-col justify-center items-center text-md sm:text-lg md:text-xl lg:text-xl my-20">
          <div className="my-6 form-shade p-3 rounded-lg border-blue-800 bg-blue-900 shadow-xl">
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
                "Add Expenses: Input what you've paid for, and let BillPal do the rest. Easily assign who paid for what, and watch as the app calculates everyone's share."
              }
            />
            <StyleCard
              description={
                "Fair and Transparent: No more confusion or awkward conversations. BillPal shows exactly who owes what, making settling up a breeze."
              }
            />
            <StyleCard
              description={
                "Instant Notifications: Get real-time updates on who has paid and who still owes, so you're always in the loop."
              }
            />
          </div>
        </div>

        {/* <hr className="bg-tertiary text-tertiary border-tertiary h-[2px] w-[100%] mt-20" />
        <br /> */}
        <div className="text-tertiary flex flex-col justify-center items-center text-sm sm:text-md md:text-md lg:text-lg my-20">
          <div className="my-6 form-shade p-3 rounded-lg border-blue-800 bg-blue-900 shadow-xl">
            Why choose BillPal?
          </div>
          <ul className="flex flex-col justify-around list-disc">
            <li className="m-3 text-sm sm:text-md md:text-md lg:text-md">
              Save Time: No more manual calculations or chasing friends for
              money.
            </li>
            <li className="m-3 text-sm sm:text-md md:text-md lg:text-md">
              Stay Organized: All your expenses neatly organized in one place.
            </li>
            <li className="m-3 text-sm sm:text-md md:text-md lg:text-md">
              Avoid Awkwardness: Keep friendships intact with clear, transparent
              splitting.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
