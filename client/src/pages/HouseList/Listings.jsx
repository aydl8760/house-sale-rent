import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { searchOptions, sortOptions } from "@/config";
import { getFilteredLists } from "../../store/listing-slice";
import { ArrowUpDownIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserListItem from "@/components/UserListItem";

export default function Listings() {
  const { isLoading, list } = useSelector((state) => state.list);
  const [filters, setFilters] = useState({
    searchTerm: "",
    bedRooms: "",
    selectValues: {},
  });
  const [sort, setSort] = useState("price-lowtohigh");
  const [searchResult, setSearchResult] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const bedRoomsFromUrl = urlParams.get("bedRooms");
    const newSelectValues = {};
    searchOptions.forEach((option) => {
      const value = urlParams.get(option.name);
      if (value) {
        newSelectValues[option.name] = value;
      }
    });

    if (searchTermFromUrl || bedRoomsFromUrl || newSelectValues) {
      setFilters((prev) => ({
        ...prev,
        searchTerm: searchTermFromUrl || "",
        bedRooms: bedRoomsFromUrl || "",
        selectValues: newSelectValues || {}, // Update the select values dynamically
      }));
    }

    const fetchListing = async () => {
      const searchQuery = urlParams.toString();

      dispatch(getFilteredLists(searchQuery)).then((data) => {
        console.log(data);
        if (data?.payload?.success) {
          setSearchResult(data?.payload?.listings);
        }
      });
    };
    fetchListing();
  }, [location.search]);

  const handleInputChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSelectChange = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      selectValues: {
        ...prev.selectValues,
        [name]: value,
      },
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();

    urlParams.set("searchTerm", filters.searchTerm);

    if (filters.bedRooms) {
      urlParams.set("bedRooms", filters.bedRooms);
    }

    Object.entries(filters.selectValues).forEach(([key, value]) => {
      if (value) {
        urlParams.set(key, value);
      }
    });

    urlParams.set("sortBy", sort);
    const searchQuery = urlParams.toString();
    navigate(`/listings/search?${searchQuery}`);
  };

  const handleSort = async (value) => {
    setSort(value);
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("sortBy", value);
    navigate(`?${urlParams.toString()}`);
  };

  console.log(searchResult);

  return (
    <main>
      <div className="flex flex-col relative">
        <div className="bg-gray-900 h-80 flex justify-center items-center  ">
          <form onSubmit={handleOnSubmit} className=" max-w-7xl mx-auto p-3">
            <div className="flex gap-3 justify-center items-center w-full">
              <Input
                type="text"
                name="searchTerm"
                placeholder="Search by anything..."
                className="bg-white rounded-xl p-6 w-60 focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:outline-none"
                value={filters.searchTerm}
                onChange={handleInputChange}
              />
              {searchOptions.map((control) => (
                <div key={control.name}>
                  <Select
                    className="w-40 focus:outline-none"
                    value={filters.selectValues[control.name] || ""} // controlled
                    onValueChange={(value) =>
                      handleSelectChange(control.name, value)
                    }
                  >
                    <SelectTrigger className="w-40 bg-white rounded-xl p-6 focus:ring-2 focus:ring-green-500">
                      <SelectValue placeholder={control.label} />
                    </SelectTrigger>
                    <SelectContent className="max-h-40 overflow-y-auto">
                      {control.options?.map((optionItem) => (
                        <SelectItem key={optionItem.id} value={optionItem.id}>
                          {optionItem.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ))}
              <Input
                type="number"
                name="bedRooms"
                placeholder="BedRoom"
                className="bg-white  rounded-xl p-6 w-40 focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:outline-none "
                value={filters.bedRooms}
                onChange={handleInputChange}
              />

              <Button className="bg-green-500 text-gray-950 px-8 py-6 rounded">
                Search
              </Button>
            </div>
          </form>
        </div>

        <div className="max-w-6xl mx-auto rounded-lg shadow-lg border flex flex-col gap-8 max-h-[90rem] overflow-y-auto absolute left-0 right-0  bottom-[-35px] bg-white ">
          <div className="p-4 px-10 border-b flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">All Lists</h2>
            <div className="flex items-center gap-3">
              <span className="text-muted-foreground">
                {searchResult?.length} Lists
              </span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <ArrowUpDownIcon className="h-4 w-4" />
                    <span>Sort by</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuRadioGroup
                    value={sort}
                    onValueChange={handleSort}
                  >
                    {sortOptions.map((sortItem) => (
                      <DropdownMenuRadioItem
                        value={sortItem.id}
                        key={sortItem.id}
                      >
                        {sortItem.label}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
      {isLoading && <p className="text-center text-2xl mt-25">Loading...</p>}
      <div className="mt-[50px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4  ">
          {!isLoading && searchResult && searchResult.length > 0
            ? searchResult.map((listItem) => (
                <UserListItem listItem={listItem} key={listItem._id} />
              ))
            : null}
        </div>
      </div>
    </main>
  );
}
