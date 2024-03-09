"use client";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Social from "@/components/Social";
import { getSession, signIn, useSession } from "next-auth/react";
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

  const { data: session } = useSession();

  useEffect(() => {
    if (session !== null) {
      router.replace("/");
    }
  }, []);

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
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
        toast.success("Logged in successfully!!!");
        router.replace("/groups");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="text-tertiary w-full flex flex-col justify-around items-center">
      <div className="bg-primary flex flex-col justify-around w-[85%] sm:w-[60%] md:w-[50%] lg:w-[30%] m-10 p-5 shadow-md shadow-slate-700">
        <div className="text-3xl text-center border-2 border-secondary bg-secondary rounded-xl w-[60%] mx-auto py-1">
          Login
        </div>
        <Social />
        <div className="flex flex-row justify-center items-center text-lg m-auto w-full">
          <div className="w-1/2 border-[1px] border-secondary mx-2"></div>
          OR
          <div className="w-1/2 border-[1px] border-secondary mx-2"></div>
        </div>
        <form
          onSubmit={submitHandler}
          className="text-xl flex flex-col justify-around"
        >
          <div className="flex flex-col my-2">
            <div>Email</div>
            <div className="flex border-2 border-tertiary rounded-lg ">
              <input
                type="text"
                onChange={(e) => {
                  setUserDetails({ ...userDetails, email: e.target.value });
                }}
                value={userDetails.email}
                className="m-1 outline-none w-full px-1 bg-primary"
              />
              <span className="icon flex items-center px-4 text-gray-500">
                <HiAtSymbol size={20} />
              </span>
            </div>
          </div>
          <div className="flex flex-col my-2">
            <div>Password</div>
            <div className="flex border-2 border-tertiary rounded-lg ">
              <input
                type={`${show ? "text" : "password"}`}
                onChange={(e) => {
                  setUserDetails({ ...userDetails, password: e.target.value });
                }}
                value={userDetails.password}
                className="m-1 w-full outline-none px-1 bg-primary"
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
            className="coolBeans flex justify-center items-center p-2 border-2 rounded-xl w-[40%] mx-auto my-5 transition duration-500"
          >
            Submit
          </button>
        </form>
        <p className="text-center text-black">
          Don't have an account yet?{" "}
          <Link href={"/register"} className="text-backup">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default page;
