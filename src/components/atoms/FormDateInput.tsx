import Label from "@/components/atoms/Label";
import React, { useCallback } from "react";
import DatePicker from "../molecules/global/DatePickerSingle";
import { FormData } from "../molecules/customer/Form";

interface BirthProps {
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}
const FormDateInput: React.FC<BirthProps> = ({ setFormData }) => {
  const handleDepartureDateChange = useCallback((date: Date | null) => {
    setFormData((prev) => ({
      ...prev,
      birthOfDate: date ? date.toISOString().split("T")[0] : "",
    }));
  }, []);
  return (
    <div
      className={`relative w-full border rounded-lg h-10 focus-within:ring-1 


"border-gray-300 dark:border-gray-800 focus-within:border-blue-500 focus-within:ring-blue-500"

`}
    >
      <Label
        htmlFor="departureDate"
        className="absolute -top-2 left-4 px-2 text-xs text-gray-500 dark:text-gray-200 bg-white dark:bg-darkButtonBg z-10"
      >
        Date of Birth
      </Label>

      <DatePicker
        onChange={handleDepartureDateChange}
        formDate={true}
        isBirth={true}
        className="border-none dark:bg-darkButtonBg"
      />
    </div>
  );
};

export default FormDateInput;
