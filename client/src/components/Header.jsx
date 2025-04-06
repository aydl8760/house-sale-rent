import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { headerMenuItems } from "../config";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
import Search from "./Search";

export default function Header() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  console.log(user);

  function MenuItem() {
    return (
      <ul className="gap-5 lg:flex ">
        {headerMenuItems.map((menuItem) => (
          <Link to={menuItem.path} key={menuItem.id}>
            <li
              className={`${
                isHomePage ? "text-white" : "text-gray-900"
              } hover:text-blue-700 hover:underline`}
            >
              {menuItem.label}
            </li>
          </Link>
        ))}
      </ul>
    );
  }

  return (
    <header className={`${!isHomePage && "shadow-md"} `}>
      <div
        className={`max-w-7xl mx-auto p-2 flex items-center justify-between  ${
          isHomePage && "mt-6 px-4"
        }`}
      >
        <h1 className="font-bold text-base sm:text-xl flex flex-wrap ">
          <span className="text-green-400">Adnann</span>
          <span className="text-gray-100">Estate</span>
        </h1>

        {!isHomePage && <Search />}

        <div className="flex gap-3 items-center">
          <div className="hidden lg:block ">
            <MenuItem />
          </div>

          {isAuthenticated && user ? (
            <>
              <Link
                to={`userLists/${user?._id}`}
                className={`hidden lg:inline-block  ${
                  isHomePage ? "text-white" : "text-gray-900"
                }`}
              >
                My List
              </Link>

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
                        <AvatarFallback className="bg-green-600 text-white font-[600px]">
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
                    <Link to={"/listings/search"}>
                      <DropdownMenuItem>
                        <TagIcon className="mr-2 w-4 h-4" />
                        Sale
                      </DropdownMenuItem>
                    </Link>
                    <Link>
                      <DropdownMenuItem>
                        <TagIcon className="mr-2 w-4 h-4" />
                        {user?.listCount} List
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
