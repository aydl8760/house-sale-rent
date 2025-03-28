import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { signupFormControls } from "@/config";
import { ChevronRight, LogOut, Trash } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";

export default function Profile() {
  const { user, isLoading } = useSelector((state) => state.auth);

  return (
    <div className="p-3 max-w-lg mx-auto my-8">
      <h1 className="text-3xl font-semibold text-center my-4 ">
        Welcome to Your Profile
      </h1>

      <form className="flex flex-col gap-4">
        <div className="flex justify-center ">
          <span className="text-center">Edit</span>
          {user.avator ? (
            <img
              src={user.avator}
              alt="profile"
              className="rounded-full h-20 w-20  object-cover cursor-pointer self-center"
            />
          ) : (
            <Avatar className="w-28 h-28 mb-2 self-center p-3 cursor-pointer">
              <AvatarFallback className="bg-green-600 text-white font-[600px] text-4xl">
                {user.userName?.[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
          )}
        </div>

        {signupFormControls.map((control) => (
          <div key={control.name} className="">
            {control.componentType === "input" && (
              <input
                id={control.name}
                name={control.name}
                type={control.type}
                defaultValue={user[control.name]}
                placeholder={control.placeholder}
                className="border border-gray-300 rounded-lg p-3 w-full"
                disabled={control.name === "email"}
              />
            )}
          </div>
        ))}

        <Button
          disabled={isLoading}
          className="bg-gray-800 hover:bg-green-700 uppercase disabled:opacity-80 p-6 rounded-lg"
        >
          {isLoading ? "Loading..." : "Update Profile"}
        </Button>
      </form>
      <div className="flex flex-col mt-4 border  w-[50%] p-3 gap-2">
        <p className="text-slate-700 cursor-pointer font-medium flex items-center justify-between">
          <span className="flex items-center gap-2">
            <LogOut className="mr-2 w-4 h-4" /> Log out
          </span>
          <ChevronRight className=" w-4 h-4 text-gray-500" />
        </p>
        <hr />
        <p className=" cursor-pointer font-medium flex items-center justify-between">
          <span className="flex items-center gap-2 text-red-700">
            <Trash className="mr-2 w-4 h-4" /> Delete Account
          </span>
          <ChevronRight className=" w-4 h-4 text-gray-500" />
        </p>
      </div>
    </div>
  );
}
