import axios from "axios";
import { ChevronRight, LogOut, Trash } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { signupFormControls } from "@/config";
import {
  deleteUserAccount,
  logout,
  updateUserProfile,
} from "../store/auth-slice";
import { useToast } from "@/hooks/use-toast";
import DeleteDiaolg from "@/components/common/DeleteDialog";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user, isLoading } = useSelector((state) => state.auth);
  const [imageFile, setImageFile] = useState(undefined);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [openDiaolg, setOpenDialog] = useState(false);

  const fileRef = useRef(null);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();

  const reorderedFormProfileUpdate = signupFormControls.sort((a, b) => {
    if (a.name === "email") return -1; // Ensure email comes first
    if (b.name === "email") return 1;
    return 0; // Maintain the original order for other controls
  });

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

  const handleSubmitProfileUpdate = (e) => {
    e.preventDefault();

    const dataToSubmit = {
      ...formData,
      avator: formData.avator || user.avator,
    };

    console.log("Submitting Data:", dataToSubmit);

    dispatch(updateUserProfile({ id: user._id, formData: dataToSubmit })).then(
      (data) => {
        console.log(data, "edit ");
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
      }
    );
  };

  const handleDelteUser = () => {
    dispatch(deleteUserAccount(user._id))
      .then((data) => {
        console.log(data, "delete ");
        if (data?.payload?.success) {
          toast({
            title: data?.payload?.message,
            className: "bg-green-500",
          });
          setOpenDialog(false);
          navigate("/");
        } else {
          toast({
            title: data?.payload?.message,
            variant: "destructive",
          });
          setOpenDialog(false);
        }
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
        toast({
          title: "An error occurred while deleting the user.",
          variant: "destructive",
        });
        setOpenDialog(false);
      });
  };

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

  console.log(formData);

  return (
    <div className="p-3 max-w-lg mx-auto my-8">
      <h1 className="text-3xl font-semibold text-center my-4 ">
        Welcome to Your Profile
      </h1>

      <form
        onSubmit={handleSubmitProfileUpdate}
        className="flex flex-col gap-4"
      >
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
                className=" h-20 w-20  object-cover cursor-pointer self-center"
              >
                <AvatarFallback className="bg-green-600 text-white font-[600px] text-4xl">
                  {user.userName?.[0]?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
            )}
          </div>

          {loading && <span className="text-blue-500">Loading...</span>}
        </div>

        {reorderedFormProfileUpdate.map((control) => (
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
        <p
          onClick={handleLogoutUser}
          className="text-slate-700 cursor-pointer font-medium flex items-center justify-between"
        >
          <span className="flex items-center gap-2">
            <LogOut className="mr-2 w-4 h-4" /> Log out
          </span>
          <ChevronRight className=" w-4 h-4 text-gray-500" />
        </p>
        <hr />

        <p
          onClick={() => setOpenDialog(true)}
          className=" cursor-pointer font-medium flex items-center justify-between"
        >
          <span className="flex items-center gap-2 text-red-700">
            <Trash className="mr-2 w-4 h-4" /> Delete Account
          </span>
          <ChevronRight className=" w-4 h-4 text-gray-500" />
        </p>
        <DeleteDiaolg
          openDiaolg={openDiaolg}
          onClose={() => setOpenDialog(false)}
          onDelete={handleDelteUser}
        />
      </div>
    </div>
  );
}
