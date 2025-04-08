import CommonForm from "../../components/common/commonForm.jsx";

import { useToast } from "@/hooks/use-toast";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { forgotPassword, login } from "../../store/auth-slice.js";
import { forgotPasswordFormControls } from "@/config.js";

const initialState = {
  email: "",
};

export default function ForgotPassword() {
  const [formData, setFormData] = useState(initialState);
  const { isLoading } = useSelector((state) => state.auth);
  const [sended, setSended] = useState(false);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();

  function onSubmit(event) {
    event.preventDefault();
    dispatch(forgotPassword(formData)).then((data) => {
      console.log(data);
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
          className: "bg-green-500",
        });
        setSended(true);
        setMessage(data?.payload?.message);
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
        Forgot-Password
      </h1>
      {sended ? (
        <p>{message}</p>
      ) : (
        <CommonForm
          formData={formData}
          formControls={forgotPasswordFormControls}
          buttonText={isLoading ? "sending..." : "Send Reset link"}
          onSubmit={onSubmit}
          setFormData={setFormData}
          disabled={isLoading}
          showGoogleAuth={false}
        />
      )}
      <div className="flex gap-2 mt-5">
        <Link to={`${sended ? "/" : "/login"}`}>
          <span className="text-blue-700 hover:underline">
            {sended ? "Back to home" : "Back to Login"}
          </span>
        </Link>
      </div>
    </div>
  );
}
