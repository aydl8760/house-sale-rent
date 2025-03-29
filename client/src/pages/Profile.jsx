import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { signupFormControls } from "@/config";
import axios from "axios";
import { ChevronRight, LogOut, Trash } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

export default function Profile() {
  const { user, isLoading } = useSelector((state) => state.auth);
  const [imageFile, setImageFile] = useState(undefined);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const fileRef = useRef(null);

  function handleImageFile(event) {
    console.log(event.target.files);
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setImageFile(selectedFile);
    }
  }

  async function uploadImageToCloudinary() {
    setLoading(true);
    const data = new FormData();
    data.append("myFile", imageFile);
    try {
      const response = await axios.post(
        "http://localhost:3050/api/user/uploadImage",
        data
      );
      console.log(response);
      if (response?.data?.success) {
        setFormData((prev) => ({
          ...prev,
          avator: response.data.result.url,
        }));
        setLoading(false);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (imageFile) uploadImageToCloudinary();
  }, [imageFile]);

  const handleUpdateProfileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <div className="p-3 max-w-lg mx-auto my-8">
      <h1 className="text-3xl font-semibold text-center my-4 ">
        Welcome to Your Profile
      </h1>

      <form className="flex flex-col gap-4">
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={handleImageFile}
        />
        <div className="flex flex-col justify-center items-center">
          <div className="flex justify-center">
            <span
              onClick={() => fileRef.current.click()}
              className="text-center cursor-pointer"
            >
              Edit
            </span>
            {user.avator || formData.avator ? (
              <img
                onClick={() => fileRef.current.click()}
                src={formData.avator || user.avator}
                alt="profile"
                className="rounded-full h-20 w-20  object-cover cursor-pointer self-center"
              />
            ) : (
              <Avatar
                onClick={() => fileRef.current.click()}
                className="w-28 h-28 mb-2 self-center p-3 cursor-pointer"
              >
                <AvatarFallback className="bg-green-600 text-white font-[600px] text-4xl">
                  {user.userName?.[0]?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
            )}
          </div>

          {loading && <span className="text-blue-500">Loading...</span>}
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
                onChange={handleUpdateProfileChange}
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
