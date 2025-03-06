import React, { useState, useRef, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";
import Span from "@/components/atoms/Span";
import CardTitle from "@/components/atoms/CardTitle";
import CardDescription from "@/components/atoms/CardDescription";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface DatePickerProps {
  label?: string;
  onChange?: (date: Date | null) => void;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  formDate?: boolean;
  className?: string; // ✅ Add this line
  isBirth?: boolean;
}

const DatePicker: React.FC<DatePickerProps> = ({
  label,
  onChange,
  icon,
  formDate = false,
  className, // ✅ Add this line
  isBirth
}) => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Date | null>(today);
  const [isOpen, setIsOpen] = useState(false);
  const datePickerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (!datePickerRef.current?.contains(target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Call onChange once on mount to notify parent of initial selected date
  useEffect(() => {
    if (onChange && selectedDate) {
      onChange(selectedDate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run only once on mount

  const handleDateSelect = (date: Date | undefined) => {
    const newDate = date ?? null;
    setSelectedDate(newDate);
    setIsOpen(false);

    if (onChange) {
      onChange(newDate);
    }
  };

  const openDatePicker = () => {
    setIsOpen(true);
  };

  return (
    <div
      ref={datePickerRef}
      className={cn(
        "flex flex-col w-full items-start h-17 justify-center relative border rounded-md cursor-pointer",
        isOpen
          ? "border-[#1571E7] bg-white dark:bg-darkPrimaryBg"
          : "border-[#f1f1f3] dark:border-gray-700 bg-[#F5F7FA] dark:bg-darkPrimaryBg",
        formDate && "h-9 bg-inherit w-full p-2 rounded",
        className
      )}
    >
      <div
        onClick={openDatePicker}
        className={cn("w-full", formDate ? "" : "px-2")}
      >
        <div className={`${formDate ? "" : "space-y-1"}`}>
          {formDate ? (
            ""
          ) : (
            <div className="flex gap-1 items-center">
              {icon}
              <Span className="text-xs text-stone-gray font-semibold">
                {label}
              </Span>
              <ChevronDown className="transform translate-y-[1.2px] w-3.5 h-3.5 text-[#7C7C7C]" />
            </div>
          )}
          {formDate ? (
            <div>
              <Span className="text-sm font-normal">
                {selectedDate
                  ? format(selectedDate, "d/M/yy")
                  : format(today, "d/M/yy")}
              </Span>
            </div>
          ) : (
            <div className={cn(formDate ? "transform translate-y-1" : "")}>
              <CardTitle className="text-sm font-semibold text-gray-600 dark:text-white">
                {selectedDate
                  ? format(selectedDate, "d MMMM")
                  : format(today, "d MMMM")}
              </CardTitle>
              <CardDescription className="text-xs font-normal text-stone-gray dark:text-white">
                {selectedDate
                  ? format(selectedDate, "EEEE, yyyy")
                  : format(today, "EEEE, yyyy")}
              </CardDescription>
            </div>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 z-20">
          <DayPicker
            className="bg-white dark:bg-darkPrimaryBg px-2 pt-2 pb-3 border border-[#E6E6E8] rounded-md text-sm"
            mode="single"
            disabled={isBirth ? false :{ before: today }}
            selected={selectedDate || undefined}
            onSelect={handleDateSelect}
          />
        </div>
      )}
    </div>
  );
};

export default DatePicker;
