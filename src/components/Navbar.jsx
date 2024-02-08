"use client";

import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";
import Link from "next/link";
import Image from "next/image";

function Navbar() {
  const [dropdownListActivity, setDropDownListActivity] = useState(0);
  const [loggedIn, setLoggedIn] = useState(0);

  return (
    <nav className="bg-primary text-tertiary flex flex-row items-center w-full py-3 sticky top-0 z-50">
      <DensityMediumIcon
        className="md:invisible md:w-0 pl-1 cursor-pointer"
        onClick={(e) => {
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
      {loggedIn ? (
        <div className=" basis-2/3 md:basis-[40%] flex flex-row justify-center">
          <div
            className={`cursor-pointer w-[30px] flex flex-row justify-center items-center bg-secondary border-2 border-secondary rounded-full font-bold`}
          >
            <Image
              src={"/images/self.png"}
              height={50}
              width={50}
              className="rounded-full"
            />
          </div>
          <div
            className={`px-3 cursor-pointer ml-2 w-[35%] flex flex-row justify-center items-center bg-secondary border-2 border-secondary rounded-xl font-bold`}
          >
            <Link
              href="/"
              className={` h-full flex justify-center w-[50%] items-center`}
            >
              Logout
            </Link>
          </div>
        </div>
      ) : (
        <div className=" basis-2/3 md:basis-[40%] flex flex-row justify-center">
          <div
            className={`cursor-pointer w-[35%] flex flex-row justify-center items-center bg-secondary border-2 border-secondary rounded-xl font-bold`}
          >
            <Link
              href="/signup"
              className={`px-2 h-full flex justify-center w-[50%] items-center`}
            >
              Signup
            </Link>
          </div>
          <div
            className={`cursor-pointer ml-2 w-[35%] flex flex-row justify-center items-center bg-secondary border-2 border-secondary rounded-xl font-bold`}
          >
            <Link
              href="/login"
              className={`px-2 h-full flex justify-center w-[50%] items-center`}
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
