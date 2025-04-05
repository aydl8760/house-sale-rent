import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
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
import { searchOptions } from "@/config";
import { ArrowUpDownIcon } from "lucide-react";
import React from "react";

export default function Listings() {
  return (
    <main>
      <div className="flex flex-col relative">
        <div className="bg-gray-900 h-80 flex justify-center items-center  ">
          <form className=" max-w-7xl mx-auto p-3">
            <div className="flex gap-3 justify-center items-center w-full">
              <Input
                type="text"
                name="searchTerm"
                placeholder="Search by anything..."
                className="bg-white rounded-xl p-6 w-60 focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:outline-none"
              />
              {searchOptions.map((control) => (
                <div key={control.name}>
                  <Select className="w-40 focus:outline-none">
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
              <span className="text-muted-foreground">Lists</span>
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
                    value={{}}
                    onValueChange={{}}
                  ></DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
      <div className=" mt-[50px] ">Listing results</div>
    </main>
  );
}
