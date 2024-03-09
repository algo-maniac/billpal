"use client";

import React from "react";

function StyleCard({ description }) {
  return (
    <div className="text-sm md:text-md xl:text-xl flex justify-center items-center p-5 my-3 w-[100%] md:w-[23%] h-[400px] form-shade text-tertiary rounded-xl shadow-md shadow-tertiary">
      <div className="p-3 flex justify-around items-center">
        <div className="flex justify-center items-center">{description}</div>
      </div>
    </div>
  );
}

export default StyleCard;
