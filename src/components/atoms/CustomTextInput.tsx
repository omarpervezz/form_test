import { Input } from "@/components/atoms/Input";
import Label from "@/components/atoms/Label";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface CustomTextInputProps {
  label: string;
  name: string;
  type: "text" | "email" | "password" | "number" | "tel";
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  errorMessage?: string;
  validator?: (value: string) => boolean;
  className?: string;
  id?: string;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  label,
  name,
  type,
  value,
  onChange,
  placeholder,
  errorMessage,
  validator,
  className,

  id,
}) => {
  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    onChange(event);

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
          "border rounded-lg h-10 focus-within:ring-1 px-3 flex items-center",
          isValid
            ? "border-gray-300 dark:border-gray-700 focus-within:border-blue-500 focus-within:ring-blue-500"
            : "border-red-500 focus-within:ring-red-500",
          className
        )}
      >
        <Label
          htmlFor={id}
          className={cn(
            "absolute -top-2 left-4 px-2 text-xs text-gray-500 dark:text-gray-200 bg-white dark:bg-darkPrimaryBg"
          )}
        >
          {label}
        </Label>
        <Input
          id={id}
          type={type}
          name={name}
          value={value}
          onChange={handleChange}
          placeholder={placeholder || `Enter Your ${label}`}
          className="w-full bg-transparent outline-none focus:ring-0"
        />
      </div>
      {!isValid && error && (
        <p className="text-red-500 text-xs mt-1">{error}</p>
      )}
    </div>
  );
};

export default CustomTextInput;
