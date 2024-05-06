"use client";

import React from "react";

function StyleCard({ description }) {
  return (
    <div className="shadow-sm spread-lg shadow-tertiary text-sm sm:text-md md:text-md lg:text-md flex justify-center items-center p-5 my-3 w-[100%] md:w-[23%] h-[400px] text-tertiary rounded-xl">
      <div className="p-3 flex justify-around items-center">
        <div className="flex justify-center items-center">{description}</div>
      </div>
    </div>
  );
}

export default StyleCard;
