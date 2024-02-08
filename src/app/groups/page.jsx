"use client";

import GroupCard from "@/components/GroupCard";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function page() {
  const [groupArray, setGroupArray] = useState(
    [
      {
        id: 1,
        name: "Tech Enthusiasts",
        description:
          "Discuss the latest trends and innovations in the tech world.",
      },
      {
        id: 2,
        name: "Fitness Fanatics",
        description:
          "Share workout routines, nutrition tips, and fitness challenges.",
      },
      {
        id: 3,
        name: "Book Club",
        description: "Explore and discuss literature with fellow book lovers.",
      },
      {
        id: 4,
        name: "Cooking Crew",
        description:
          "Exchange recipes, cooking techniques, and foodie experiences.",
      },
      {
        id: 5,
        name: "Travel Explorers",
        description:
          "Share travel stories, tips, and recommendations from around the world.",
      },
      {
        id: 6,
        name: "Photography Passion",
        description:
          "Showcase your photography skills and learn from other enthusiasts.",
      },
      {
        id: 7,
        name: "Art Aficionados",
        description:
          "Discuss various forms of art, share creations, and provide feedback.",
      },
      {
        id: 8,
        name: "Gaming Guild",
        description:
          "Connect with fellow gamers, discuss favorite games, and organize multiplayer sessions.",
      },
      {
        id: 9,
        name: "Music Maestros",
        description:
          "Explore different music genres, share playlists, and discuss your favorite artists.",
      },
      {
        id: 10,
        name: "Film Buffs",
        description:
          "Discuss movies, TV shows, and cinematic experiences with fellow film enthusiasts.",
      },
      {
        id: 11,
        name: "Coding Collective",
        description:
          "Collaborate on coding projects, share coding challenges, and seek help from the community.",
      },
      {
        id: 12,
        name: "Language Learners",
        description:
          "Practice and learn new languages together with language exchange sessions.",
      },
      {
        id: 13,
        name: "DIY Crafters",
        description:
          "Share creative DIY projects, crafting tips, and handmade creations.",
      },
      {
        id: 14,
        name: "Green Thumb Society",
        description:
          "Discuss gardening tips, plant care, and share your beautiful garden photos.",
      },
      {
        id: 15,
        name: "Finance Wizards",
        description:
          "Discuss personal finance, investments, and financial planning strategies.",
      },
      {
        id: 16,
        name: "Pet Lovers Club",
        description:
          "Share stories and tips about pet care, training, and the joy of having furry companions.",
      },
      {
        id: 17,
        name: "Yoga & Meditation",
        description:
          "Connect with like-minded individuals interested in yoga and meditation practices.",
      },
      {
        id: 18,
        name: "Science Explorers",
        description:
          "Discuss scientific discoveries, advancements, and engage in scientific discussions.",
      },
      {
        id: 19,
        name: "Writing Workshop",
        description:
          "Share your writing projects, receive feedback, and participate in writing challenges.",
      },
      {
        id: 20,
        name: "Entrepreneurial Minds",
        description:
          "Connect with fellow entrepreneurs, share business insights, and discuss startup ideas.",
      },
    ]

    // You can use this 'groups' array in your application as needed.
  );

  const [approvalModal, setApprovalModal] = useState(0);

  const submitHandler = async () => {
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
  const verifyPassword = async () => {
    // const response = await axios.post("/api/verify-password", credentials);
    // const groupId = response.data.groupId;
    // router.push(`/groups/${groupId}`);
  };
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
              id={group.id}
              key={group.id}
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
