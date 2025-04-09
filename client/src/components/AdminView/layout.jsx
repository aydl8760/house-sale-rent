import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSideBar from "./sideBar";
import Adminheader from "./header";

export default function AdminLayout() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex min-h-screen w-full">
      <AdminSideBar open={open} setOpen={setOpen} />
      <div className="flex flex-1 flex-col">
        <Adminheader setOpen={setOpen} />
        <main className="flex-1 flex bg-gray-200 p-4 md:p-6 ">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
