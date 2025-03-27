import CommonForm from "../../components/common/commonForm";
import { signupFormControls } from "../../../config.js";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

export default function SignUp() {
  const [formData, setFormData] = useState(initialState);

  function onSubmit() {}

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold mt-20 text-slate-800 ">
        Create New Account
      </h1>
      <CommonForm
        formData={formData}
        formControls={signupFormControls}
        buttonText={"Signup"}
        onSubmit={onSubmit}
        setFormData={setFormData}
        showGoogleAuth={true}
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
