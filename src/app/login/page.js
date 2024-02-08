"use client";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Social from "@/components/Social";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { HiAtSymbol, HiFingerPrint } from "react-icons/hi";

function page() {
  const [show, setShow] = useState(false);
  const router = useRouter();

  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await signIn("credentials", {
        email: userDetails.email,
        password: userDetails.password,
        redirect: false,
      });

      if (res.error) {
        console.log(res.error);
        toast.error("Invalid Credentials");
        return;
      }
      const session = await getSession();
      if (session) {
        router.replace("/groups");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full flex flex-col justify-around items-center">
      <Toaster position="top-right" reverseOrder={false} className="absolute" />
      <div className="flex flex-col justify-aroundw-[50%] m-10 p-5 shadow-md shadow-slate-700">
        <div className="text-3xl text-center border-2 border-blue-400 bg-blue-400 rounded-xl w-[60%] mx-auto py-1">
          Login
        </div>
        <Social />
        <div className="flex flex-row justify-center items-center text-lg m-auto w-full">
          <div className="w-1/2 border-[1px] border-blue-600 mx-2"></div>
          OR
          <div className="w-1/2 border-[1px] border-blue-600 mx-2"></div>
        </div>
        <form
          onSubmit={submitHandler}
          className="text-xl flex flex-col justify-around"
        >
          <div className="flex flex-col my-2">
            <div>Email</div>
            <div className="flex border-2 border-blue-600 rounded-lg ">
              <input
                type="text"
                onChange={(e) => {
                  setUserDetails({ ...userDetails, email: e.target.value });
                }}
                value={userDetails.email}
                className="m-1 outline-none w-full px-1"
              />
              <span className="icon flex items-center px-4 text-gray-500">
                <HiAtSymbol size={20} />
              </span>
            </div>
          </div>
          <div className="flex flex-col my-2">
            <div>Password</div>
            <div className="flex border-2 border-blue-600 rounded-lg ">
              <input
                type={`${show ? "text" : "password"}`}
                onChange={(e) => {
                  setUserDetails({ ...userDetails, password: e.target.value });
                }}
                value={userDetails.password}
                className="m-1 w-full outline-none px-1"
              />
              <span
                className="icon flex items-center px-4 text-gray-500 hover:cursor-pointer hover:text-blue-500"
                onClick={() => setShow(!show)}
              >
                <HiFingerPrint size={20} />
              </span>
            </div>
          </div>
          <button
            type="submit"
            className="p-2 border-2 border-blue-400 bg-blue-400 rounded-xl w-[40%] mx-auto my-5 transition duration-300 hover:bg-gray-200"
          >
            Submit
          </button>
        </form>
        <p className="text-center text-gray-600">
          Don't have an account yet?{" "}
          <Link
            href={"/register"}
            className="text-blue-500 hover:text-blue-700"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default page;
