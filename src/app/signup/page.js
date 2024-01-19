"use client";
import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

function page() {
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [userLoggedIn, setUserLoggedIn] = useState(0);

  return (
    <div className="w-full flex flex-col justify-around items-center">
      <Toaster position="top-right" reverseOrder={false} className="absolute" />
      <div className="flex flex-col justify-aroundw-[50%] m-10 p-5 shadow-md shadow-slate-700">
        <div className="text-3xl text-center border-2 border-blue-400 bg-blue-400 rounded-xl w-[60%] mx-auto py-2">
          Sign up
        </div>
        <form className="text-xl flex flex-col justify-around">
          <div className="flex flex-col my-2">
            <div>Username</div>
            <input
              type="text"
              onChange={(e) => {
                setUserDetails({ ...userDetails, username: e.target.value });
              }}
              value={userDetails.username}
              className="p-1 px-2 rounded-lg outline-none border-2 border-blue-600 w-full"
            />
          </div>
          <div className="flex flex-col my-2">
            <div>Email</div>
            <input
              type="text"
              onChange={(e) => {
                setUserDetails({ ...userDetails, email: e.target.value });
              }}
              value={userDetails.username}
              className="p-1 px-2 rounded-lg outline-none border-2 border-blue-600 w-full"
            />
          </div>
          <div className="flex flex-col my-2">
            <div>Password</div>
            <input
              type="password"
              onChange={(e) => {
                setUserDetails({ ...userDetails, password: e.target.value });
              }}
              value={userDetails.password}
              className="p-1 px-2 rounded-lg outline-none border-2 border-blue-600 w-full"
            />
          </div>
          <button
            type="submit"
            className="p-2 border-2 border-blue-400 bg-blue-400 rounded-xl w-[40%] mx-auto my-5"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default page;
