import CommonForm from "../../components/common/commonForm.jsx";

import { useToast } from "@/hooks/use-toast";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../store/auth-slice.js";
import { loginFormControls } from "@/config.js";

const initialState = {
  email: "",
  password: "",
};

export default function Login() {
  const [formData, setFormData] = useState(initialState);
  const { isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();

  function onSubmit(event) {
    event.preventDefault();
    dispatch(login(formData)).then((data) => {
      console.log(data);
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
          className: "bg-green-500",
        });
        navigate("/");
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  }

  console.log(formData);

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold mt-20 text-slate-800 ">
        Create New Account
      </h1>
      <CommonForm
        formData={formData}
        formControls={loginFormControls}
        buttonText={isLoading ? "Loading..." : "Signin"}
        onSubmit={onSubmit}
        setFormData={setFormData}
        disabled={isLoading}
        showGoogleAuth={true}
      />
      <div className="flex gap-2 mt-5">
        <p>don't Have an Account?</p>
        <Link to="/signup">
          <span className="text-blue-700 hover:underline">Signup</span>
        </Link>
      </div>
    </div>
  );
}
