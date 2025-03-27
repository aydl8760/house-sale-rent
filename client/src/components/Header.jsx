import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { headerMenuItems } from "../config";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import heroimg from "../assets/houseimg.jpeg";
import heroimg2 from "../assets/houseimg.jpeg";

function MenuItem() {
  return (
    <ul className="gap-5 lg:flex">
      {headerMenuItems.map((menuItem) => (
        <Link to={menuItem.path} key={menuItem.id}>
          <li className="text-slate-800 hover:text-blue-700 hover:underline">
            {menuItem.label}
          </li>
        </Link>
      ))}
    </ul>
  );
}

export default function Header() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [heroimg, heroimg2];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, []);
  return (
    <header className="shadow-md">
      <div className="max-w-7xl mx-auto p-2 flex items-center justify-between">
        <h1 className="font-bold text-base sm:text-xl flex flex-wrap">
          <span className="text-gray-500">Adnann</span>
          <span className="text-gray-700">Estate</span>
        </h1>

        <div className="hidden lg:block">
          <MenuItem />
        </div>

        <div className="flex gap-3 items-center">
          <form className="bg-white p-3 rounded-lg flex items-center">
            <input
              placeholder="Search ....."
              name="keyword"
              type="text"
              className="bg-transparent focus:outline-none w-52 sm:w-72"
            />
            <FaSearch className="text-slate-700" />
          </form>

          <Link className="hidden lg:inline-block">My List</Link>
          <Link to="/signup" className="">
            <Button className="bg-green-600 text-white rounded-md hover:bg-green-500">
              Sign up
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
