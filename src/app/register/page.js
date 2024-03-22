"use client";
import Social from "@/components/Social";
import { getSession, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { HiAtSymbol, HiFingerPrint, HiOutlineUser } from "react-icons/hi";

function page() {
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    upiId: "",
    password: "",
  });
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const { data: session } = useSession();
  useEffect(() => {
    if (session !== null) {
      router.replace("/");
    }
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(userDetails);
    const { username, email, password, upiId } = userDetails;
    if (!username || !email || !password || !upiId) {
      toast.error("All fields are necessary!");
    }
    try {
      const resUserExists = await fetch("/api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const { user } = await resUserExists.json();

      console.log(user);

      if (user) {
        toast.error("User already exists.");
        return;
      }

      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          upiId,
        }),
      });
      if (res.ok) {
        const form = e.target;
        toast.success("Registered Successfully");
        form.reset();
        router.push("/login");
      } else {
        const er = await res.json();
        console.log("User registration failed.", er);
      }
    } catch (error) {
      //     console.log("Error during registration: ", error);
    }
  };

  return (
    <div className="text-tertiary w-full flex flex-col justify-around items-center">
      <Toaster position="top-right" reverseOrder={false} className="absolute" />
      <div className="flex flex-col bg-primary justify-around w-[85%] sm:w-[60%] md:w-[50%] lg:w-[30%] m-10 p-5 shadow-md shadow-slate-700">
        <div className="text-3xl text-center border-2 border-secondary bg-secondary rounded-xl w-[60%] mx-auto py-2">
          Sign up
        </div>
        <form
          onSubmit={submitHandler}
          className="text-xl flex flex-col justify-around"
        >
          <div className="flex flex-col my-2">
            <div>Banking Name</div>
            <div className="flex border-2 border-tertiary rounded-lg ">
              <input
                type="text"
                onChange={(e) => {
                  setUserDetails({ ...userDetails, username: e.target.value });
                }}
                value={userDetails.username}
                className="m-1 outline-none w-full px-1 bg-primary"
              />
              <span className="icon flex items-center px-4 text-gray-500">
                <HiOutlineUser size={20} />
              </span>
            </div>
          </div>
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
            <div>UPI ID</div>
            <div className="flex border-2 border-tertiary rounded-lg ">
              <input
                type="text"
                onChange={(e) => {
                  setUserDetails({ ...userDetails, upiId: e.target.value });
                }}
                value={userDetails.upiId}
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
        <p className="text-center text-tertiary">
          Have an account?{" "}
          <Link href={"/login"} className="text-backup">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default page;
