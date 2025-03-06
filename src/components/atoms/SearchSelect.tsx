"use client";

import { useState, useRef, useEffect } from "react";
import { Input } from "./Input";

interface Option {
  label: string;
  value: string;
}

interface SearchSelectProps {
  options: Option[];
  onSelect: (option: Option) => void;
  placeholder?: string;
  className?: string;
}

export default function SearchSelect({
  options,
  onSelect,
  placeholder,
  className = "",
  value, // Accept value prop
}: SearchSelectProps & { value?: string }) {
  const [searchTerm, setSearchTerm] = useState(value || ""); // Initialize with external value
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSearchTerm(value || ""); // Sync with external value changes
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (option: Option) => {
    setSearchTerm(option.label);
    setIsOpen(false);
    onSelect(option);
  };

  return (
    <div className={`relative w-full ${className}`} ref={dropdownRef}>
      <Input
        type="text"
        required
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setIsOpen(true)}
        className="w-full p-4 border border-gray-300 h-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {isOpen && (
        <div className="absolute w-full animate-slide-down bg-white border border-gray-300 rounded-lg shadow-md mt-1 z-10">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <div
                key={option.value}
                onClick={() => handleSelect(option)}
                className="p-2 cursor-pointer hover:bg-blue-500 hover:text-white"
              >
                {option.label}
              </div>
            ))
          ) : (
            <div className="p-2 text-gray-500">No results found</div>
          )}
        </div>
      )}
    </div>
  );
}
