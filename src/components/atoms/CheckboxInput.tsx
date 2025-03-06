"use client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils"; // Utility for classNames
import { Input } from "./Input";

type Option = { id: string; label: string };

interface CheckboxInputProps {
  options: Option[];
  selectedOptions: string[];
  onChange: (selected: string[]) => void;
  className?: string;
  value?: string[]; // Accept initial values for edit mode
}

export default function CheckboxInput({
  options,
  onChange,
  className = "",
  value = [],
}: CheckboxInputProps) {
  const [internalSelected, setInternalSelected] = useState<string[]>(value);

  // ✅ Ensure the component updates only when value changes
  useEffect(() => {
    if (value !== internalSelected) {
      setInternalSelected(value);
    }
  }, [value, internalSelected]);

  const handleChange = (id: string) => {
    const newSelected = internalSelected.includes(id)
      ? internalSelected.filter((item) => item !== id)
      : [...internalSelected, id];

    setInternalSelected(newSelected);
    onChange(newSelected);
  };

  return (
    <div className={cn("p-4", className)}>
      {options.map((option) => (
        <label
          key={option.id}
          className="flex items-center space-x-3 cursor-pointer"
        >
          <Input
            type="checkbox"
            value={option.id}
            checked={internalSelected.includes(option.id)}
            onChange={() => handleChange(option.id)}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
          />
          <span className="text-gray-700 text-lg">{option.label}</span>
        </label>
      ))}
    </div>
  );
}
