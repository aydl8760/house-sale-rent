import {
  ChartNoAxesCombined,
  LayoutDashboard,
  ListOrdered,
} from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

export default function AdminSideBar({ open, setOpen }) {
  const navigate = useNavigate();
  const adminSideBarMenuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      path: "/admin/dashboard",
      icons: <LayoutDashboard />,
    },

    {
      id: "orders",
      label: "Orders",
      path: "/admin/order ",
      icons: <ListOrdered />,
    },
  ];
  const MenuItems = ({ setOpen }) => {
    const navigate = useNavigate();
    return (
      <nav className="flex-col mt-8 flex gap-2">
        {adminSideBarMenuItems.map((menuItem) => (
          <div
            key={menuItem.id}
            onClick={() => {
              navigate(menuItem.path);
              setOpen ? setOpen(false) : null;
            }}
            className="flex text-xl cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground "
          >
            {menuItem.icons}
            <span>{menuItem.label}</span>
          </div>
        ))}
      </nav>
    );
  };
  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64 ">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b">
              <SheetTitle className="flex gap-2 mt-5 mb-5">
                <ChartNoAxesCombined size={30} />
                <span className="text-xl font-extrabold">Adnann Estate</span>
              </SheetTitle>
            </SheetHeader>
            <MenuItems setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>
      <aside className="hidden w-64 flex-col border-r p-6 lg:flex ">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <h1 className="text-xl font-extrabold">Admin Panel</h1>
        </div>
        <MenuItems />
      </aside>
    </>
  );
}
