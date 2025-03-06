import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/redux-store/store";
import {
  setDateRangeFilter,
  resetFilters,
} from "@/redux/feature/filter/filterSlice";
import { DayPicker, DateRange } from "react-day-picker";
import { Button } from "@/components/atoms/Button";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";
import { FaCalendarAlt } from "react-icons/fa";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface DatePickerProps {
  entity: string;
  field: string;
  className?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({
  entity,
  field,
  className,
}) => {
  const dispatch = useDispatch();

  // ✅ Get the current filter state from Redux
  const dateRange = useSelector(
    (state: RootState) => state.filter[entity]?.dateRangeFilters[field]
  );

  // ✅ Check if any date filter is applied for the entity
  const isCalendarFiltered = !!dateRange?.startDate && !!dateRange?.endDate;

  // Local state for temporary selection before applying
  const [tempRange, setTempRange] = useState<DateRange | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const datePickerRef = useRef<HTMLDivElement | null>(null);

  // ✅ Close the calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!datePickerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleApply = () => {
    if (tempRange?.from && tempRange?.to) {
      const formattedStartDate = format(tempRange.from, "yy-MM-dd");
      const formattedEndDate = format(tempRange.to, "yy-MM-dd");

      dispatch(
        setDateRangeFilter({
          entity,
          field,
          startDate: formattedStartDate,
          endDate: formattedEndDate,
        })
      );
      setIsOpen(false);
    } else {
      alert("Please select a valid date range.");
    }
  };

  const resetCalendarFilter = () => {
    dispatch(resetFilters({ entity }));
    setTempRange(null);
    setIsOpen(false);
  };

  const getPlaceholderText = () => {
    if (dateRange?.startDate && dateRange?.endDate) {
      const startDate = new Date(dateRange.startDate);
      const endDate = new Date(dateRange.endDate);

      if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
        return `${format(startDate, "MMM dd")} - ${format(endDate, "MMM dd")}`;
      }
    }
    return "Calendar";
  };

  return (
    <div
      ref={datePickerRef}
      className={cn("relative inline-block text-left", className)}
    >
      <div className="relative w-full">
        {isCalendarFiltered ? (
          <Button
            onClick={resetCalendarFilter}
            className="flex gap-3 items-center w-full sm:w-fit border border-[#7C7C7C] dark:border-gray-700 rounded-md py-1.5 px-2 text-sm text-rose-500 bg-white dark:bg-darkButtonBg dark:text-rose-300 focus:outline-none"
          >
            <span>{getPlaceholderText()}</span>
            <X className="w-4 h-4" />
          </Button>
        ) : (
          <Button
            onClick={() => setIsOpen(true)}
            className="flex gap-3 w-full sm:w-[120px] items-center justify-between border border-[#1768D0] text-[#1768D0] dark:border-gray-700 rounded-md py-1.5 px-2 text-sm dark:bg-darkButtonBg dark:text-white bg-white focus:outline-none"
          >
            <span>{getPlaceholderText()}</span>
            <FaCalendarAlt />
          </Button>
        )}
      </div>

      {isOpen && (
        <div className="absolute mt-2 z-10 py-2 px-4 bg-white dark:bg-darkMainBg border border-gray-300 rounded-lg shadow-lg animate-slide-down">
          <DayPicker
            className="flex items-center justify-center"
            mode="range"
            selected={tempRange || undefined}
            onSelect={(range) => setTempRange(range ?? null)}
          />
          <div className="flex gap-2 px-2 mt-3">
            <Button
              className="bg-[#0d0d0e] flex-1 px-3 py-1.5 rounded-md text-white text-sm font-normal"
              onClick={() => setTempRange(null)}
            >
              Deselect
            </Button>
            <Button
              className="bg-[#1571E7] flex-1 px-3 py-1.5 rounded-md text-white text-sm font-normal"
              onClick={handleApply}
            >
              Apply
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
