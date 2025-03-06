import { cn } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";
import { FaCaretDown } from "react-icons/fa";

interface SelectDropdownProps {
  label: string;
  options: string[];
  selectedValue: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const SelectDropdown: React.FC<SelectDropdownProps> = ({
  label,
  options,
  selectedValue,
  onChange,
  placeholder,
  className,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  // Close dropdown when clicking outside
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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelection = (
    option: string,
    e: React.MouseEvent<HTMLLIElement>
  ) => {
    e.stopPropagation();
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div
      className="relative w-full border shadow-sm ease-in-out border-gray-300 dark:border-gray-800 rounded-lg px-4 pt-3 h-10 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 cursor-pointer flex flex-col justify-between"
      onClick={toggleDropdown}
      ref={dropdownRef}
    >
      {/* Label */}
      <label
        htmlFor={label}
        className={cn(
          `absolute -top-2 left-4 px-2 text-xs font-normal text-gray-500 bg-white dark:bg-darkButtonBg dark:text-white`,
          className
        )}
      >
        {label}
      </label>

      {/* Selected Value */}
      <div className="w-full -mt-1 flex items-center justify-between">
        <span
          className={`${
            selectedValue
              ? "text-gray-800 dark:text-gray-200 "
              : "text-gray-500 dark:text-gray-400"
          } block text-sm mt-1 px-4  `}
        >
          {selectedValue || placeholder || "select"}
        </span>
        <FaCaretDown className="text-[#1768D0] mr-4" />
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <ul
          className={cn(
            `absolute z-10 mt-10 w-full bg-white dark:bg-darkButtonBg border border-gray-300 rounded-md shadow-lg left-0 max-h-60 overflow-y-auto animate-slide-down`
          )}
          role="menu"
        >
          {options.map((option) => (
            <li
              key={option}
              className="px-4 py-2 cursor-pointer text-sm hover:bg-[#1768D0] hover:text-white transition-all duration-300"
              onClick={(e) => handleSelection(option, e)}
              role="menuitem"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectDropdown;
