import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { headerMenuItems } from "../config";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
/* import heroimg from "../assets/houseimg.jpeg";
import heroimg2 from "../assets/houseimg.jpeg"; */
import { useDispatch, useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { LogOut, Menu, TagIcon, UserPen } from "lucide-react";
import Search from "./Search";
import { logout } from "../store/auth-slice";
import { useToast } from "@/hooks/use-toast";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const dispatch = useDispatch();
  const { toast } = useToast();

  console.log(user);

  function MenuItem() {
    return (
      <ul className="gap-5 lg:flex ">
        {headerMenuItems.map((menuItem) => (
          <Link
            to={menuItem.path}
            key={menuItem.id}
            onClick={() => {
              setOpen ? setOpen(false) : null;
            }}
          >
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

  const handleLogoutUser = () => {
    dispatch(logout()).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
          className: "bg-green-500",
        });
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  };

  return (
    <header className={`${!isHomePage && "shadow-md border-b"} `}>
      <div
        className={`max-w-7xl mx-auto p-2 flex items-center justify-between  ${
          isHomePage && "mt-6 px-4"
        }`}
      >
        <h1 className="font-bold text-lg sm:text-xl flex flex-wrap ">
          <span className={`${isHomePage && "text-green-400"} text-green-600`}>
            Adnann
          </span>
          <span className={`${isHomePage && "text-gray-100"} text-gray-800 `}>
            Estate
          </span>
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
                      <DropdownMenuItem onClick={handleLogoutUser}>
                        <LogOut className="mr-2 w-4 h-4" />
                        Logout
                      </DropdownMenuItem>
                    </Link>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </>
          ) : (
            <Link to="/signup" className="hidden lg:inline-flex">
              <Button className="bg-green-600 text-white rounded-md hover:bg-green-500">
                Sign up
              </Button>
            </Link>
          )}
        </div>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden hover:bg-transparent p-3 text-2xl" // Increased padding and text size
            >
              <Menu
                className="text-white"
                style={{ height: "28px", width: "28px" }}
              />

              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full max-w-xs p-8 space-y-5">
            <SheetHeader className="mb-5 mt-5">
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <MenuItem />

            {isAuthenticated ? (
              <div className="flex flex-col">
                <Link to="/profile">My Account</Link>
                <Link
                  to={`userCars/${user?._id}`}
                  className="text-slate-800 hover:text-blue-700 hover:underline"
                >
                  My Cars
                </Link>
                <Link to="/" onClick={handleLogoutUser}>
                  Logout
                </Link>
              </div>
            ) : (
              <Link to="/signup">
                <Button className="bg-blue-600 text-white rounded-md hover:bg-blue-800">
                  Sign up
                </Button>
              </Link>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
