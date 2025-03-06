import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/redux-store/store";
import { setSelectFilter } from "@/redux/feature/filter/filterSlice"; // Ensure correct import
import { cn } from "@/lib/utils";
import { FaCaretDown } from "react-icons/fa";

interface SelectFilterProps {
  entity: string; // ✅ Ensures the filter applies to the correct entity
  searchField: string;
  getOptions: (field: string) => string[];
  className?: string;
}

const SelectTableFilter: React.FC<SelectFilterProps> = ({
  entity,
  searchField,
  getOptions,
  className,
}) => {
  const dispatch = useDispatch();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  // ✅ Fetch options dynamically
  const options = getOptions(searchField);

  // ✅ Get current filter value from Redux, scoped per entity
  const selectedValue = useSelector(
    (state: RootState) => state.filter[entity]?.selectFilters[searchField] || ""
  );

  const handleOptionClick = (option: string) => {
    dispatch(
      setSelectFilter({
        entity,
        field: searchField,
        value: option === `All ${searchField}` ? "" : option,
      })
    );
    setIsDropdownOpen(false);
  };

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className={cn("relative inline-block text-left", className)}
    >
      <button
        onClick={() => setIsDropdownOpen((prev) => !prev)}
        className="text-sm border border-[#1768D0] dark:border-gray-700 text-[#1768D0] rounded-md shadow-sm py-1.5 px-3 dark:bg-darkButtonBg dark:text-white bg-white w-full sm:w-[120px] flex items-center justify-between"
        type="button"
      >
        <span>{selectedValue || `All ${searchField}`}</span>
        <FaCaretDown className="ml-2 text-[#1768D0] dark:text-white" />
      </button>

      {isDropdownOpen && (
        <ul
          className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto animate-slide-down dark:text-black"
          role="menu"
        >
          <li
            className="px-4 py-2 cursor-pointer text-sm hover:bg-[#1768D0] hover:text-white transition-all duration-500"
            onClick={() => handleOptionClick(`All ${searchField}`)}
            role="menuitem"
          >
            All {searchField}
          </li>
          {options.map((option) => (
            <li
              key={option}
              className="px-4 py-2 cursor-pointer text-sm hover:bg-[#1768D0] hover:text-white transition-all duration-500"
              onClick={() => handleOptionClick(option)}
              role="menuitem"
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectTableFilter;
