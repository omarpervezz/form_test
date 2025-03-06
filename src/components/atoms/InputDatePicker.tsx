import React, { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css"; // Import the DayPicker styles
import { FaCalendarAlt } from "react-icons/fa";

interface InputDatePickerProps {
  label?: string;
  name?: string;
  value?: Date | null;
  onChange: (date: Date | null) => void;
  error?: string;
  placeholder?: string;
}

const InputDatePicker: React.FC<InputDatePickerProps> = ({
  label = "Payment Date",
  name = "booking-date",
  value = null,
  onChange,
  error,
  placeholder = "13.12.2002",
}) => {
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  const toggleDatePicker = () => {
    setShowDatePicker((prev) => !prev);
  };

  return (
    <div className="relative">
      <div
        onClick={toggleDatePicker}
        className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 pt-2 h-10 cursor-pointer flex flex-col justify-between"
      >
        <label
          htmlFor={name}
          className="absolute -top-2 left-4 px-2 text-xs font-normal text-gray-800 bg-white dark:bg-darkPrimaryBg dark:text-white"
        >
          {label}
        </label>
        <div className="flex items-center justify-between">
          <span
            className={`block mt-1 ${
              value instanceof Date && !isNaN(value.getTime())
                ? "text-gray-800"
                : "text-gray-400"
            } font-normal dark:text-gray-300 text-sm`}
          >
            {value instanceof Date && !isNaN(value.getTime())
              ? value.toLocaleDateString()
              : placeholder}
          </span>
          <FaCalendarAlt />
        </div>
      </div>

      {showDatePicker && (
        <div
          className="absolute z-20 left-0 mt-14 w-auto p-4 bg-white dark:bg-darkButtonBg border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg overflow-y-auto animate-slide-down"
          onClick={(e) => e.stopPropagation()}
        >
          <DayPicker
            mode="single"
            selected={
              value instanceof Date && !isNaN(value.getTime())
                ? value
                : undefined
            }
            onSelect={(date?: Date) => {
              const selectedDate =
                date instanceof Date && !isNaN(date.getTime()) ? date : null;
              onChange(selectedDate);
              setShowDatePicker(false);
            }}
            footer={
              value instanceof Date && !isNaN(value.getTime())
                ? `Selected: ${value.toLocaleDateString()}`
                : "Pick a day."
            }
          />
        </div>
      )}

      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
};

export default InputDatePicker;
