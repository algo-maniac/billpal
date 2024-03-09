"use client";

import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";
import Link from "next/link";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

function Navbar() {
  const [dropdownListActivity, setDropDownListActivity] = useState(0);
  // const session = await getServerSession(options);
  const { data: session } = useSession();
  return (
    <nav className="navbar-shade bg-primary text-tertiary flex flex-row items-center w-full py-3 sticky top-0 z-50">
      <DensityMediumIcon
        className="md:invisible md:w-0 pl-1 cursor-pointer"
        onClick={() => {
          setDropDownListActivity((prev) => !prev);
        }}
      />
      {dropdownListActivity ? (
        <ul className="border-2 border-primary absolute top-16 z-30 bg-primary md:invisible rounded-lg">
          <li className="p-2 w-[150px] flex justify-center border-y-2 border-primary">
            <Link
              href="/"
              className="h-full w-full flex justify-center items-center"
            >
              Home
            </Link>
          </li>
          <li className="p-2 w-[150px] flex justify-center border-y-2 border-primary">
            <Link
              href="/"
              className="h-full w-full flex justify-center items-center"
            >
              About
            </Link>
          </li>
          <li className="p-2 w-[150px] flex justify-center border-y-2 border-primary">
            <Link
              href="/groups"
              className="h-full w-full flex justify-center items-center"
            >
              Groups
            </Link>
          </li>
        </ul>
      ) : null}

      <div className="text-2xl font-extrabold  basis-1/3 md:basis-[20%] flex items-center justify-center">
        Splitterz
      </div>
      <ul className="flex flex-row justify-center basis-0 md:basis-[40%] invisible w-0 md:visible">
        <li className="hover:underline underline-offset-4 px-2 mx-2 cursor-pointer">
          <Link
            href="/"
            className="h-full w-full flex justify-center items-center"
          >
            Home
          </Link>
        </li>
        <li className="hover:underline underline-offset-4 px-2 mx-2 cursor-pointer">
          <Link
            href="/"
            className="h-full w-full flex justify-center items-center"
          >
            About
          </Link>
        </li>
        <li className="hover:underline underline-offset-4 px-2 mx-2 cursor-pointer">
          <Link
            href="/groups"
            className="h-full w-full flex justify-center items-center"
          >
            Groups
          </Link>
        </li>
      </ul>
      {session ? (
        <div className=" basis-2/3 md:basis-[40%] flex flex-row justify-center">
          <div
            className={`cursor-pointer sm:w-[30%] w-[40px] flex flex-row justify-center items-center rounded-full font-bold`}
          >
            {session.user.name}
            {/* <Image
              src={"/images/self.png"}
              height={50}
              width={50}
              className="rounded-full"
            /> */}
          </div>
          <div
            className={`coolBeans hover:opacity-100 opacity-85 px-3 cursor-pointer ml-2 w-[35%] flex flex-row justify-center items-center bg-secondary border-2 border-secondary rounded-xl font-bold`}
            onClick={() => signOut()}
          >
            Logout
          </div>
        </div>
      ) : (
        <div className="w-[60%] md:basis-[40%] flex flex-row justify-center">
          <Link
            href="/register"
            className={`coolBeans hover:opacity-100 opacity-85 cursor-pointer px-5 h-[50px] sm:h-[70px] w-[25%] sm:w-[30%] flex flex-row justify-center items-center bg-secondary border-4 border-secondary rounded-xl font-bold`}
          >
            Signup
          </Link>
          <Link
            href="/login"
            className={`coolBeans hover:opacity-100 opacity-85 ml-2 cursor-pointer px-5 h-[50px] sm:h-[70px] w-[25%] sm:w-[30%] flex flex-row justify-center items-center bg-secondary border-4 border-secondary rounded-xl font-bold`}
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
