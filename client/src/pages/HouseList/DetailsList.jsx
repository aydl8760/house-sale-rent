import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getListById } from "../../store/listing-slice";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, StarIcon } from "lucide-react";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
} from "react-icons/fa";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import Contact from "@/components/Contact";

export default function DetailsOfList() {
  const { isLoading, error } = useSelector((state) => state.list);
  const { user } = useSelector((state) => state.auth);
  const [list, setList] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(getListById(params.id)).then((data) => {
      console.log(data);

      if (data.payload) {
        setList(data.payload);
      }
    });
  }, [params.id]);

  console.log(list);

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % list.imageUrls.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide(
      (prevSlide) =>
        (prevSlide - 1 + list.imageUrls.length) % list.imageUrls.length
    );
  };

  const handleImageClick = (index) => {
    setCurrentSlide(index);
  };

  return (
    <main className="mb-80">
      {isLoading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Something went wrong</p>
      )}

      <div className="flex flex-col sm:w-full gap-8  p-3">
        <div className="flex gap-4 sm:w-full">
          {list && !isLoading && !error && (
            <div className="relative w-full  h-[300px] sm:h-[550px] object-cover overflow-hidden  ">
              {list.imageUrls.map((url, index) => {
                console.log(url);

                return (
                  <img
                    src={url}
                    key={index}
                    className={`absolute top-0 left-0 w-full h-full transition-transform duration-1000 ease-in-out ${
                      currentSlide === index ? "opacity-100" : "opacity-0"
                    }
                 `}
                  />
                );
              })}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-[38%] left-0 sm:top-1/2 sm:left-0.5 transform -translate-y-1/2 !border-none  hover:bg-green-400 group bg-gray-50 w-16 h-16  "
                onClick={handlePrevSlide}
              >
                <ChevronLeft className="!w-7 !h-7 sm:!w-14 sm:!h-14  text-gray-900 group-hover:text-gray-200  !border-none" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-[38%] right-0 sm:top-1/2 sm:right-0.5 transform -translate-y-1/2 !border-none hover:bg-green-500 group bg-gray-50 w-16 h-16   "
                onClick={handleNextSlide}
              >
                <ChevronRight className="!w-7 !h-7 sm:!w-14 sm:!h-14  text-gray-900 group-hover:text-gray-200  !border-none" />
              </Button>
            </div>
          )}
        </div>
        <div className="max-w-4xl mx-64 mt-10 flex flex-col gap-6">
          <div className="flex flex-col gap-5">
            <h1 className="text-3xl font-semibold">
              {list?.commonInfo?.title} - ${" "}
              {list?.type === "rent"
                ? list?.rentFeatures?.price
                : list?.saleFeatures?.price}
              {list?.type === "rent" && " / month"}
            </h1>

            <div className="flex flex-col gap-2">
              <div className="flex gap-3 items-center text-base">
                <FaMapMarkerAlt className="text-green-600" />
                <p>
                  {list?.type === "rent"
                    ? list?.rentFeatures?.location
                    : list?.saleFeatures?.location}
                </p>
              </div>

              <div className="flex gap-3">
                <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md uppercase">
                  For {list?.type}
                </p>
                <p className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                  {list?.commonInfo?.priceType}
                </p>
              </div>

              <p>
                <span className="font-medium">Description -</span>{" "}
                {list?.commonInfo?.description}
              </p>

              <ul className="text-green-800 font-semibold text-sm flex gap-4 items-center sm:gap-6 flex-wrap">
                <li className="flex items-center gap-1">
                  <FaBed className="text-lg" />
                  {+list?.commonInfo?.bedRoom > 1
                    ? `${list?.commonInfo?.bedRoom} beds`
                    : `${list?.commonInfo?.bedRoom} bed`}
                </li>
                <li className="flex items-center gap-1">
                  <FaBath className="text-lg" />
                  {+list?.commonInfo?.bathRoom > 1
                    ? `${list?.commonInfo?.bathRoom} baths`
                    : `${list?.commonInfo?.bathRoom} bath`}
                </li>
                <li className="flex items-center gap-1">
                  <FaParking className="text-lg" />
                  {list?.commonInfo?.parking}
                </li>
                <li className="flex items-center gap-1">
                  <FaChair className="text-lg" />
                  {list?.commonInfo?.furnished}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center  max-w-4xl mx-64">
          <h3 className="text-gray-500 text-xl">Features</h3>
          <table className="bg-gray-100 table-auto w-full border-collapse border border-gray-200">
            <thead>
              <tr className="">
                <th className="px-4 py-2 border border-gray-300">Property</th>
                <th className="px-4 py-2 border border-gray-300">Value</th>
              </tr>
            </thead>
            <tbody>
              {list && (
                <>
                  <tr>
                    <td className="px-4 py-2 border border-gray-300 font-normal">
                      Property-Type
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {list?.commonInfo?.propertyType}
                    </td>
                  </tr>
                  {list?.type === "sale" && (
                    <>
                      <tr>
                        <td className="px-4 py-2 border border-gray-300 font-normal">
                          Condition
                        </td>
                        <td className="px-4 py-2 border border-gray-300">
                          {list?.saleFeatures?.condition}
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 border border-gray-300 font-normal">
                          Year
                        </td>
                        <td className="px-4 py-2 border border-gray-300">
                          {list?.saleFeatures?.year}
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 border border-gray-300 font-normal">
                          Area
                        </td>
                        <td className="px-4 py-2 border border-gray-300">
                          {list?.saleFeatures?.area}
                        </td>
                      </tr>
                    </>
                  )}
                  <tr>
                    <td className="px-4 py-2 border border-gray-300 font-normal">
                      Floor-Level
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {list?.commonInfo?.floorLevel}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border border-gray-300 font-normal">
                      Facilities And Amenities
                    </td>
                    <td className="px-4 py-2 border border-gray-300 flex">
                      {list?.commonInfo?.facilitiesAndAmenities.map(
                        (col, index) => (
                          <p className="mr-2" key={index}>
                            {col}
                          </p>
                        )
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border border-gray-300 font-normal">
                      Security-Features
                    </td>
                    <td className="px-4 py-2 border border-gray-300 flex">
                      {list?.commonInfo?.securityFeatures.map((col, index) => (
                        <p className="mr-2" key={index}>
                          {col}
                        </p>
                      ))}
                    </td>
                  </tr>

                  <tr>
                    <td className="px-4 py-2 border border-gray-300 font-normal">
                      Smart-Home-Features
                    </td>
                    <td className="px-4 py-2 border border-gray-300 flex">
                      {list?.commonInfo?.smartHomeFeatures.map((col, index) => (
                        <p className="mr-2" key={index}>
                          {col}
                        </p>
                      ))}
                    </td>
                  </tr>
                  {list?.type === "rent" && (
                    <tr>
                      <td className="px-4 py-2 border border-gray-300 font-normal">
                        Payment
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {list?.rentFeatures?.paymentMethodRent}
                      </td>
                    </tr>
                  )}
                  {list?.type === "sale" && (
                    <tr>
                      <td className="px-4 py-2 border border-gray-300 font-normal">
                        Legal-Document
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {list?.saleFeatures?.legalDocument}
                      </td>
                    </tr>
                  )}
                </>
              )}
            </tbody>
          </table>
        </div>
        {list?.creator !== user?._id && <Contact list={list} />}
      </div>

      <div></div>
    </main>
  );
}
