import React, { useState } from "react";
import CardTitle from "@/components/atoms/CardTitle";
import { SearchIcon } from "@/components/atoms";
import { X } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { ChevronDown } from "lucide-react";
import Label from "@/components/atoms/Label";
import { Search } from "lucide-react";
import { Input } from "@/components/atoms/Input";
import ResetFilterButton from "@/components/atoms/ResetFilterButton";

const SearchHotelFilter = ({
  filterTitle,
  searchQuery,
  setSearchQuery,
  resetFilter,
  isFilterApplied,
}: {
  filterTitle?: string;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  resetFilter?: () => void;
  isFilterApplied?: boolean;
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  const toggleContent = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="bg-[#FFFFFF] dark:bg-darkButtonBg shadow-light-shadow rounded-md overflow-hidden">
      <div
        className={`flex items-center justify-between px-3 py-3 ${
          isExpanded && "border-b"
        }`}
      >
        <div className="flex items-center gap-2">
          <SearchIcon />
          <CardTitle className="text-lg text-black dark:text-white font-semibold">
            Search {filterTitle}
          </CardTitle>
        </div>
        <div className="flex items-center gap-2">
          {isFilterApplied && <ResetFilterButton resetFilter={resetFilter} />}
          <Button onClick={toggleContent}>
            <ChevronDown
              className={`transform transition-transform duration-300 ${
                isExpanded ? "rotate-180" : "rotate-0"
              }`}
            />
          </Button>
        </div>
      </div>
      <div
        className={`transition-all duration-150 ease-in-out space-y-2 overflow-hidden ${
          isExpanded ? "max-h-fit py-3.5" : "max-h-0 py-0"
        }`}
      >
        <div className="px-4 py-1.5 space-y-3">
          <div className="space-y-2">
            <Label
              htmlFor="searchBox"
              className="text-[14px] leading-[16.8px] font-semibold text-[#8391A1] dark:text-white"
            >
              Enter {filterTitle} Name
            </Label>
            <div className="relative w-full max-w-sm">
              <Input
                id="searchBox"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search here"
                className="w-full pl-10 border focus:ring-1 rounded-md p-5 outline-none bg-white dark:bg-darkPrimaryBg shadow-none focus-visible:ring-0 focus:outline-none"
              />
              {searchQuery && (
                <Button
                  className="hover:bg-[#F5F7FA] px-1 py-1 absolute right-14 top-1/2 rounded-full transform -translate-y-1/2"
                  aria-label="Clear selection"
                  onClick={() => {
                    setSearchQuery("");
                    document.getElementById("searchBox")?.focus();
                  }}
                >
                  <X className="w-5 h-5 text-gray-500" />
                </Button>
              )}
              <Button className="absolute px-2.5 py-2 bg-[#F5F7FA] dark:bg-darkPrimaryBg right-3 top-1/2 rounded-sm transform -translate-y-1/2">
                <Search className="text-[#8391A1] w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchHotelFilter;
