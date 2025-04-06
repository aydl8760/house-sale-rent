import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import houseImg from "../assets/modern3.jpg";
import houseImg2 from "../assets/houseimg2.jpeg";
import houseImg3 from "../assets/houseimg.jpeg";
import HeroHome from "../components/HeroHome";
import { useDispatch } from "react-redux";
import { getAllLists } from "../store/listing-slice";
import UserListItem from "../components/UserListItem";

export default function Home() {
  const [listings, setListings] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllLists()).then((data) => {
      console.log(data);
      if (data.payload.success) {
        setListings(data.payload.getAllList);
      }
    });
  }, []);

  console.log(listings);

  return (
    <div className="flex flex-col gap-8">
      <div
        className="bg-cover overflow-hidden h-full relative" // Ensure this div is relative
        style={{ backgroundImage: `url(${houseImg})` }}
      >
        <div className="absolute inset-0 bg-gray-950 opacity-50"></div>
        {/* Ensure content appears above the overlay */}
        <div className="relative z-10">
          <Header />
          <div className="h-[350px] lg:h-[600px]">
            <HeroHome />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4">
        {listings?.map((listItem) => (
          <UserListItem listItem={listItem} />
        ))}
      </div>
    </div>
  );
}
