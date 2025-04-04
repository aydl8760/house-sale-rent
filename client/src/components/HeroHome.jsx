import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function HeroHome() {
  return (
    <div className="py-24 md:pt-36 lg:pt-48 lg:px-24 flex flex-col  justify-between lg:items-center gap-10">
      <div className="max-w-6xl px-5 md:px-24 lg:justify-center lg:items-center  lg:px-0 pb-0 text-center flex flex-col relative z-10 ">
        <h1 className="text-4xl md:text-5xl font-medium text-white flex flex-col gap-2 ">
          <span className="mb-2">Explore your dream home</span>& create yours
          today.
        </h1>
      </div>
      <div className="flex items-cente shadow-md">
        <form className="bg-gray-50 p-3 rounded-l-lg w-full ">
          <input
            placeholder="Search ....."
            name="keyword"
            type="text"
            className="bg-transparent focus:outline-none focus:bg-transparent w-52 sm:w-[30rem] "
          />
        </form>
        <div className="bg-green-500 p-3 h-[50px] rounded-r-lg w-14 flex items-center justify-center ">
          <FaSearch className="text-gray-700 text-lg" />
        </div>
      </div>
    </div>
  );
}
