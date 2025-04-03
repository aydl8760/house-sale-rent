import React from "react";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Separator } from "./ui/separator";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "./ui/button";

export default function UserListItem({ listItem }) {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();
  const isUserCarsHomePage = location.pathname.includes("/");
  const isUserCarsPage = location.pathname.includes("/userLists");
  return (
    <Card>
      <div className="hover:cursor-pointer ">
        <div className="overflow-hidden">
          <img
            src={listItem?.imageUrls[0]}
            alt=""
            className={`w-full ${
              isUserCarsHomePage ? "h-[200px]" : "h-[300px]"
            }  sm:h-[200px] lg:object-cover rounded-t-lg transition-transform duration-300 hover:scale-110 `}
          />
        </div>
        <CardContent className="font-medium text-gray-800 flex flex-col gap-3  rounded-b-lg ">
          <h3 className="mt-2 font-bold uppercase  flex gap-1 text-xl text-gray-800 truncate">
            {listItem?.commonInfo?.title}
          </h3>

          <div className="flex justify-between gap-4">
            <span className="text-xl font-medium">
              ${listItem?.rentFeatures?.price || listItem?.saleFeatures?.price}
            </span>
            <span
              className={`sm:text-right font-extralight text-blue-600 truncate `}
            >
              {listItem?.rentFeatures?.businessTypes ||
                listItem?.saleFeatures?.businessTypes}
            </span>
          </div>
        </CardContent>
      </div>
      <Separator className={isUserCarsPage ? "block" : "hidden"} />
      <CardFooter className="mt-3">
        {isUserCarsPage && user._id === listItem?.creator && (
          <div className="flex justify-between flex-1 ">
            <Link to={`/updateList/${listItem?._id}`}>
              <Button className="bg-gray-800 hover:bg-green-700 w-[90px] uppercase">
                Edit
              </Button>
            </Link>
            <Button className="text-red-700 uppercase bg-inherit hover:bg-red-800 hover:text-white">
              Delete
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
