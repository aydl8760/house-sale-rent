import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/allList/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-100 rounded-lg flex items-center"
    >
      <input
        placeholder="Search ....."
        name="keyword"
        type="text"
        className={`bg-transparent focus:outline-none w-52 p-2 ${
          isHomePage ? "sm:w-[30rem]" : "sm:w-96"
        } `}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button
        className={`${
          isHomePage ? "bg-green-500" : "bg-gray-100"
        } p-3 h-[50px] rounded-r-lg w-14 flex items-center justify-center`}
      >
        <FaSearch className="text-slate-700" />
      </button>
    </form>
  );
}
