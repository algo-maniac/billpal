"use client";
import { signOut, useSession } from "next-auth/react";
import React from "react";

const page = () => {
  const { data: session } = useSession();

  return (
    <div>
      Groups page (protected)
      <div>
        <button
          className="border-2 border-red-400 cursor-pointer"
          type="submit"
          onClick={() => signOut()}
        >
          Sign Out
        </button>
        <p>Welcome, {session?.user?.name}!</p>
        <p>Welcome, {session?.user?.id}!</p>
        <p>Welcome, {session?.user?.email}!</p>
      </div>
    </div>
  );
};

export default page;
