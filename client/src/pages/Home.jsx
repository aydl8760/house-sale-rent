import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import houseImg from "../assets/modern3.jpg";
import houseImg2 from "../assets/houseimg2.jpeg";
import houseImg3 from "../assets/houseimg.jpeg";
import HeroHome from "../components/HeroHome";
import { useDispatch, useSelector } from "react-redux";
import { getAllLists } from "../store/listing-slice";
import UserListItem from "../components/UserListItem";
import { Link } from "react-router-dom";

export default function Home() {
  const { isLoading } = useSelector((state) => state.list);
  const [listings, setListings] = useState(null);
  const [rentListings, setRentListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllLists()).then((data) => {
      console.log(data);
      if (data.payload.success) {
        setListings(data.payload.getAllList);
        const allListings = data.payload.getAllList;
        console.log(allListings);

        const recentNewAddRentLists = [...allListings]
          .filter((list) => {
            return list.type === "rent";
          })
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 4);

        const recentNewAddSaleLists = [...allListings]
          .filter((list) => {
            return list.type === "sale";
          })
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 4);

        setRentListings(recentNewAddRentLists);
        setSaleListings(recentNewAddSaleLists);
      }
    });
  }, []);

  console.log(rentListings);

  return (
    <div className="">
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
      <div className=" ">
        <div className="max-w-6xl sm:mx-auto flex flex-col gap-8 mt-10  ">
          {rentListings && rentListings.length > 0 && (
            <div className="flex flex-col gap-2">
              <div className="lg:px-4  lg:mb-0  flex flex-col gap-2.5">
                <h2 className="text-3xl font-semibold">
                  Explore Newly Rented Lists
                </h2>
                <Link
                  to={`/listings/search?listingType=rent`}
                  className="text-blue-700 text-base opacity-70 hover:underline "
                >
                  Show more
                </Link>
              </div>
              {isLoading && <p className="text-2xl text-center">Loading...</p>}

              {!isLoading && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8  ">
                  {rentListings.map((listItem) => (
                    <UserListItem listItem={listItem} key={listItem._id} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className=" ">
        <div className="max-w-6xl sm:mx-auto flex flex-col gap-52 mt-8 ">
          {saleListings && saleListings.length > 0 && (
            <div className="flex flex-col gap-2">
              <div className="lg:px-4  lg:mb-0 flex flex-col gap-2.5">
                <h2 className="text-3xl font-semibold">
                  Explore Newly For Sale Lists
                </h2>
                <Link
                  to={`/listings/search?listingType=sale`}
                  className="text-blue-700 text-base opacity-70 hover:underline "
                >
                  Show more
                </Link>
              </div>
              {isLoading && <p className="text-2xl text-center">Loading...</p>}

              {!isLoading && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8  ">
                  {saleListings.map((listItem) => (
                    <UserListItem listItem={listItem} key={listItem._id} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
