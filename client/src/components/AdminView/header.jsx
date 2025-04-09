import { LogOut, Menu } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { logout } from "../../store/auth-slice";
import { useDispatch } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export default function Adminheader({ setOpen }) {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();
  const handleLogoutUser = () => {
    dispatch(logout()).then((data) => {
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
  };
  return (
    <header className="flex items-center justify-between px-4 py-3">
      <Button onClick={() => setOpen(true)} className="lg:hidden sm:block">
        <Menu />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <div className="flex flex-1 justify-end">
        <Button
          onClick={handleLogoutUser}
          className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow"
        >
          <LogOut />
          Logout
        </Button>
      </div>
    </header>
  );
}
