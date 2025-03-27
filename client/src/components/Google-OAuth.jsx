import React from "react";
import { Button } from "./ui/button";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { googleAuth } from "../store/auth-slice";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export default function GoogleOAuth() {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();
  const handleGoogleAuth = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      //console.log(result.user.photoURL);

      console.log(result);

      dispatch(
        googleAuth({
          userName: result.user.displayName,
          email: result.user.email,
          avator: result.user.photoURL,
        })
      ).then((data) => {
        console.log(data);
        if (data?.payload?.success) {
          toast({
            title: data?.payload?.message,
            className: "bg-green-500",
          });
          navigate("/");
        }
      });
    } catch (error) {
      console.log("could not log with google", error);
    }
  };
  return (
    <Button
      onClick={handleGoogleAuth}
      className="bg-gray-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
      type="button"
    >
      Continue with Google
    </Button>
  );
}
