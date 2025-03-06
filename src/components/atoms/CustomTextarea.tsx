import Label from "@/components/atoms/Label";
import React, { useState } from "react";
import { cn } from "@/lib/utils"; // ✅ Import `cn` utility for styling

interface CustomTextAreaProps {
  label: string;
  labelClassName?: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  errorMessage?: string;
  validator?: (value: string) => boolean; // ✅ Optional validation function
  className?: string; // ✅ Allows external styling
}

const CustomTextArea: React.FC<CustomTextAreaProps> = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  errorMessage,
  validator,
  className,
  labelClassName,
}) => {
  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    onChange(event);

    // ✅ Apply validator function dynamically
    if (validator) {
      const isValidInput = validator(newValue);
      setIsValid(isValidInput);
      setError(isValidInput ? "" : errorMessage || "Invalid input");
    }
  };

  return (
    <div className="relative w-full">
      <div
        className={cn(
          "border rounded-lg focus-within:ring-1 px-3 pt-2 flex flex-col",
          isValid
            ? "border-gray-300 dark:border-gray-700 focus-within:border-blue-500 focus-within:ring-blue-500"
            : "border-red-500 focus-within:ring-red-500",
          className
        )}
      >
        <Label
          htmlFor={name}
          className={cn(
            "absolute -top-2 left-4 px-2 text-xs text-gray-500 dark:text-gray-200 bg-white dark:bg-darkPrimaryBg",
            labelClassName // ✅ Append custom styles if provided
          )}
        >
          {label}
        </Label>
        <textarea
          name={name}
          value={value}
          onChange={handleChange} // ✅ Uses internal validation logic
          placeholder={placeholder || `Enter Your ${label}`}
          className="w-full bg-transparent outline-none p-2 resize-none"
          rows={4} // ✅ Default number of rows (adjust as needed)
          required
        />
      </div>
      {!isValid && error && (
        <p className="text-red-500 text-xs mt-1">{error}</p>
      )}
    </div>
  );
};

export default CustomTextArea;
