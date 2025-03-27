import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { headerMenuItems } from "../config";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
/* import heroimg from "../assets/houseimg.jpeg";
import heroimg2 from "../assets/houseimg.jpeg"; */
import { useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { LogOut, TagIcon, UserPen } from "lucide-react";

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
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

          {isAuthenticated && user ? (
            <>
              <Link className="hidden lg:inline-block">My List</Link>
              <div className="hidden lg:inline-flex">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    {user?.avator ? (
                      <img
                        src={user?.avator}
                        alt="User Avatar"
                        className="rounded-full h-7 w-7 object-cover"
                      />
                    ) : (
                      <Avatar className="">
                        <AvatarFallback className="bg-green-700 text-white font-[600px]">
                          {user?.userName?.[0]?.toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="bottom" className="w-56">
                    <DropdownMenuLabel className="flex flex-col items-center justify-center">
                      <span>{user?.userName}</span>
                      <span>{user?.email}</span>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <Link to="/profile">
                      <DropdownMenuItem>
                        <UserPen className="mr-2 w-4 h-4" />
                        Account
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    <Link>
                      <DropdownMenuItem>
                        <TagIcon className="mr-2 w-4 h-4" />
                        List-House
                      </DropdownMenuItem>
                    </Link>
                    <Link>
                      <DropdownMenuItem>
                        <TagIcon className="mr-2 w-4 h-4" />
                        My List
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    <Link to="/">
                      <DropdownMenuItem>
                        <LogOut className="mr-2 w-4 h-4" />
                        Logout
                      </DropdownMenuItem>
                    </Link>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </>
          ) : (
            <Link to="/signup" className="">
              <Button className="bg-green-600 text-white rounded-md hover:bg-green-500">
                Sign up
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
