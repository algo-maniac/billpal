"use client";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { getSession, signIn } from "next-auth/react";
import toast from "react-hot-toast";
const Social = () => {
  const handler = async (provider) => {
    const res = signIn(provider, { callbackUrl: "/", error: "/login" });
    if (!res) {
      toast.error("user not found");
    }
  };

  return (
    <div className="flex items-center w-full gap-x-2 my-3">
      <button
        onClick={() => handler("google")}
        className="w-full flex items-center justify-center bg-white border-2 border-blue-600 py-2 px-4 rounded-lg transition duration-300 hover:bg-gray-200"
      >
        <span className="mx-2">Sign In with Google</span>
        <FcGoogle className="h-5 w-5" />
      </button>
      {/* <button
        onClick={() => handler("github")}
        className="w-full flex items-center justify-center bg-white border-2 border-blue-600 py-2 px-4 rounded-lg"
      >
        <FaFacebook className="h-5 w-5" />
      </button> */}
    </div>
  );
};

export default Social;
