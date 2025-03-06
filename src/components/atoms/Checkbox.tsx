import { cn } from "@/lib/utils";
import React from "react";

interface CheckboxProps {
  checked: boolean;
  onChange?: (checked: boolean) => void;
  id?: string;
  disabled?: boolean;
  isRounded?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  id,
  disabled = false,
  isRounded,
}) => {
  return (
    <input
      id={id}
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange && onChange(e.target.checked)}
      disabled={disabled}
      className={cn(
        `cursor-pointer appearance-none h-4 w-4 border bg-inherit align-middle shadow-none select-none p-0 
        border-gray-300 dark:border-gray-600 
        focus:outline-none focus:ring-0 
        checked:border-transparent checked:bg-blue-700 
        checked:hover:bg-blue-700 checked:focus:bg-blue-700 
        indeterminate:border-transparent indeterminate:bg-current indeterminate:hover:bg-current 
        indeterminate:bg-checkbox-indeterminate indeterminate:bg-no-repeat indeterminate:bg-center`,
        isRounded ? "rounded-full" : "rounded"
      )}
    />
  );
};

export default Checkbox;
