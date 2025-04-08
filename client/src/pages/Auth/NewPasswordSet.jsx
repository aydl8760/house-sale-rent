import CommonForm from "../../components/common/commonForm.jsx";

import { useToast } from "@/hooks/use-toast";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { login, newPassword } from "../../store/auth-slice.js";
import { loginFormControls, newPasswordFormControls } from "@/config.js";

const initialState = {
  password: "",
};

export default function NewPassword() {
  const [formData, setFormData] = useState(initialState);
  const { isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();
  const params = useParams();

  function onSubmit(event) {
    event.preventDefault();
    dispatch(newPassword({ formData, token: params.token })).then((data) => {
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
  }

  console.log(formData);

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold mt-20 text-slate-800 ">
        New password
      </h1>
      <CommonForm
        formData={formData}
        formControls={newPasswordFormControls}
        buttonText={isLoading ? "Loading..." : "update-Password"}
        onSubmit={onSubmit}
        setFormData={setFormData}
        disabled={isLoading}
        showGoogleAuth={false}
      />
    </div>
  );
}
