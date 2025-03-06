import React, { ChangeEvent } from "react";

interface SwitchProps {
  id: string;
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const Switch: React.FC<SwitchProps> = ({
  id,
  checked,
  onChange,
  className,
}) => {
  return (
    <label
      htmlFor={id}
      className={`relative inline-flex items-center cursor-pointer ${className}`}
    >
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <div
        className={`w-11 h-6 bg-gray-200 rounded-full shadow-inner transition-colors duration-300 ${
          checked ? "bg-blue-600" : "bg-gray-200"
        }`}
      >
        <div
          className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-300 ${
            checked ? "translate-x-full" : ""
          }`}
        />
      </div>
    </label>
  );
};

export default Switch;
