"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { X, ChevronDown } from "lucide-react";
import { Input } from "@/components/atoms/Input";
import { Button } from "@/components/atoms/Button";
import { cn } from "@/lib/utils";
type FieldOption = {
  value: string;
  label: string;
};
interface SearchableSelectProps {
  onChange?: (value: { value: string; label: string }) => void;
  selectOptions: FieldOption[];
  placeholder?: string;
  isSearch?: boolean;
}

const SearchableSelect: React.FC<SearchableSelectProps> = ({
  onChange,
  selectOptions,
  placeholder = "Select Item",
  isSearch,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedOption, setSelectedOption] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const [filteredOptions, setFilteredOptions] = useState(selectOptions);

  const containerRef = useRef<HTMLDivElement | null>(null);

  // Close dropdown on click outside
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (!containerRef.current?.contains(event.target as Node)) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  // Filter options based on search value
  useEffect(() => {
    const lowerSearchValue = searchValue.toLowerCase();
    setFilteredOptions(
      selectOptions.filter((option) =>
        option.label.toLowerCase().includes(lowerSearchValue)
      )
    );
  }, [searchValue, selectOptions]);

  const handleSelect = (option: { value: string; label: string }) => {
    setSelectedOption(option);
    setSearchValue(option.label);
    setIsOpen(false);
    if (onChange) {
      onChange(option);
    }
  };

  const handleClear = () => {
    setSearchValue("");
    // setSelectedOption(null);
    // setIsOpen(false);
    // if (onChange) {
    //   onChange({ value: "", label: "" });
    // }
  };

  const toggleDropdowns = () => {
    if (!isOpen) {
      // Reset filtered options when opening the dropdown
      setFilteredOptions(selectOptions);
    }
    setIsOpen((prev) => !prev);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full border border-gray-300 dark:border-gray-700 rounded-md"
    >
      <div
        className="flex items-center justify-between h-9 px-2 cursor-pointer"
        onClick={toggleDropdowns}
      >
        <div>
          {selectedOption ? (
            <span>{selectedOption.label}</span>
          ) : (
            <span className="text-gray-400">{placeholder}</span>
          )}
        </div>
        <div className="flex items-center">
          <ChevronDown className="w-5 h-5 text-gray-500" />
        </div>
      </div>

      {isOpen && (
        <div className="absolute left-0 w-full mt-1 z-20 bg-white dark:bg-darkPrimaryBg border border-gray-300 dark:border-gray-700 shadow-lg max-h-48 overflow-auto">
          {isSearch && (
            <div className="flex border-b rounded-none border-gray-300 dark:border-gray-700">
              <Input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder={`Search ${placeholder}`}
                className="w-full"
              />
              {searchValue && (
                <Button
                  className="p-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClear();
                  }}
                  aria-label="Clear selection"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </Button>
              )}
            </div>
          )}
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <div
                key={option.value}
                className={cn(
                  "p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-darkButtonBg",
                  selectedOption?.value === option.value &&
                    "bg-blue-gradient hover:bg-blue-gradient text-white"
                )}
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </div>
            ))
          ) : (
            <div className="p-2 text-gray-500">No options found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchableSelect;
