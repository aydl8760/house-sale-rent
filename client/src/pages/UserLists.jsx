import { useToast } from "@/hooks/use-toast";
import { getListsByUserId } from "../store/listing-slice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserListItem from "../components/UserListItem";

export default function UserList() {
  const [userListing, setUserListing] = useState([]);
  const { isLoading } = useSelector((state) => state.list);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { toast } = useToast();

  useEffect(() => {
    dispatch(getListsByUserId(user._id)).then((data) => {
      console.log(data);
      setUserListing(data?.payload);
    });
  }, [user._id]);
  return (
    <div className="max-w-7xl p-3 mx-auto relative">
      <div className="flex justify-between shadow-md p-4 rounded-md sticky top-0 z-50 bg-gray-100">
        <h2>My Cars</h2>
        <span>Cars: {userListing?.length} </span>
      </div>
      {isLoading && <p className="text-center text-2xl">Loading...</p>}
      <div className="grid grid-cols-1 place-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {!isLoading &&
          userListing &&
          userListing.length > 0 &&
          userListing.map((listItem) => (
            <UserListItem listItem={listItem} key={listItem._id} />
          ))}
        {!isLoading && userListing.length === 0 && <p>No lists available.</p>}
      </div>
    </div>
  );
}
