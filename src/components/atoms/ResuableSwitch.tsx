import React from "react";

interface ResuableSwitchProps {
  isChecked: boolean;
  onChange: () => void;
  label?: string;
  className?: string;
}

const ResuableSwitch: React.FC<ResuableSwitchProps> = ({
  isChecked,
  onChange,
  label,
  className = "",
}) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {label && (
        <span className="text-sm font-medium text-gray-700">{label}</span>
      )}
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={isChecked}
          onChange={onChange}
        />
        <div className="w-11 h-6 bg-gray-300 rounded-full peer dark:bg-gray-600 peer-checked:bg-blue-600 transition-all duration-300 ">
          <div
            className={`absolute left-1 top-1 w-4 h-4 bg-white border rounded-full transition-all duration-300 ${
              isChecked ? "translate-x-5 border-blue-500" : "border-gray-400"
            }`}
          />
        </div>
      </label>
    </div>
  );
};

export default ResuableSwitch;
