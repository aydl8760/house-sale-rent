import React from "react";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Separator } from "./ui/separator";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "./ui/button";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaParking,
} from "react-icons/fa";

export default function UserListItem({ listItem, handleDelteUserList }) {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();
  const isUserListsHomePage = location.pathname.includes("/");
  const isUserListsPage = location.pathname.includes("/userLists");

  console.log(listItem?.active);

  return (
    <Card className={`w-full sm:w-[280px] ${!isUserListsPage && "h-[370px]"}`}>
      <div
        onClick={() => navigate(`/details/${listItem._id}`)}
        className="hover:cursor-pointer "
      >
        <div className="overflow-hidden">
          <img
            src={listItem?.imageUrls[0]}
            alt=""
            className={`w-full ${
              isUserListsHomePage ? "h-[200px]" : "h-[300px]"
            } "h-[220px]" sm:h-[220px] lg:object-cover rounded-t-lg transition-transform duration-300 hover:scale-110 `}
          />
        </div>
        {!isUserListsPage && (
          <CardContent className="font-medium text-gray-800 flex flex-col gap-2  rounded-b-lg  ">
            <h3 className="mt-2 font-semibold flex gap-1 text-xl text-gray-800 truncate">
              {listItem?.commonInfo?.title}
            </h3>

            <div className="flex items-center gap-1">
              <FaMapMarkerAlt className="h-3 w-3 text-green-700" />
              <p className="text-sm text-gray-600 truncate">
                {listItem?.rentFeatures?.location ||
                  listItem?.saleFeatures?.location}
              </p>
            </div>

            <div className="flex justify-between gap-4">
              <div className="flex items-center gap-0.5 text-lg font-medium text-gray-600">
                <span className="flex items-center gap-0.5">
                  <p className="text-lg text-green-700">$</p>
                  <p>
                    {listItem?.rentFeatures?.price ||
                      listItem?.saleFeatures?.price}
                  </p>{" "}
                </span>

                <p className="text-sm">{listItem.type === "rent" && " / mo"}</p>
              </div>
              <span
                className={`sm:text-right font-extralight text-blue-600 truncate `}
              >
                {listItem?.rentFeatures?.businessTypes ||
                  listItem?.saleFeatures?.businessTypes}
              </span>
            </div>

            <div className="flex gap-3 items-center ">
              <div className="flex items-center gap-1">
                <FaBed className="text-lg text-green-800" />
                {+listItem?.commonInfo?.bedRoom > 1
                  ? `${listItem?.commonInfo?.bedRoom} beds`
                  : `${listItem?.commonInfo?.bedRoom} bed`}
              </div>
              <div className="flex items-center gap-1">
                <FaBath className="text-lg text-green-800" />
                {+listItem?.commonInfo?.bathRoom > 1
                  ? `${listItem?.commonInfo?.bathRoom} baths`
                  : `${listItem?.commonInfo?.bathRoom} bath`}
              </div>
              <div className="flex items-center gap-1 ">
                <FaParking className="text-lg text-green-800" />
                <p className="truncate">{listItem?.commonInfo?.parking}</p>
              </div>
            </div>
          </CardContent>
        )}
        {isUserListsPage && (
          <CardContent>
            <h3 className="mt-2 font-semibold flex gap-1 text-xl text-gray-800 truncate">
              {listItem?.commonInfo?.title}
            </h3>
            <p className="text-xl text-green-700">
              {listItem?.active ? "Active" : "Inactive"}
            </p>
          </CardContent>
        )}
      </div>
      <Separator className={isUserListsPage ? "block" : "hidden"} />
      <CardFooter className="mt-3">
        {isUserListsPage && user._id === listItem?.creator && (
          <div className="flex justify-between flex-1 ">
            {listItem?.active && (
              <Link to={`/updateList/${listItem?._id}`}>
                <Button className="bg-gray-800 hover:bg-green-700 w-[90px] uppercase">
                  Edit
                </Button>
              </Link>
            )}
            <Button
              onClick={handleDelteUserList}
              className="text-red-700 uppercase bg-inherit hover:bg-red-800 hover:text-white"
            >
              Delete
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
