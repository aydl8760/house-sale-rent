import CommonForm from "../../components/common/commonForm";
import { signupFormControls } from "../../../config.js";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../store/auth-slice.js";
import { useToast } from "@/hooks/use-toast";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

export default function SignUp() {
  const { isLoading } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState(initialState);

  const dispatch = useDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();

    dispatch(signup(formData)).then((data) => {
      console.log(data);
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
          className: "bg-green-500",
        });
        navigate("/login");
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
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold mt-20 text-slate-800 ">
        Create New Account
      </h1>
      <CommonForm
        formData={formData}
        formControls={signupFormControls}
        buttonText={isLoading ? "Loading..." : "Signup"}
        onSubmit={onSubmit}
        setFormData={setFormData}
        showGoogleAuth={true}
        disabled={isLoading}
      />
      <div className="flex gap-2 mt-5">
        <p>Have an Account?</p>
        <Link to="/login">
          <span className="text-blue-700">Login</span>
        </Link>
      </div>
    </div>
  );
}
