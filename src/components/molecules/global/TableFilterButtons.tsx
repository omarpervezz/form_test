import React from "react";
import { Button } from "@/components/atoms/Button";

// Define the interface for a button
interface FilterButton {
  label:React.ReactNode;
  onClick: () => void;
  icon: React.ReactNode;
  className: string;
}

interface TableFilterButtonProps {
  buttons: FilterButton[];
}

const TableFilterButtons: React.FC<TableFilterButtonProps> = ({ buttons }) => {
  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 ">
      <div className="flex items-center justify-end gap-4">
        {buttons.map((button, index) => (
          <Button
            key={index}
            className={`flex gap-1 px-4 py-2 rounded-md text-white text-sm font-bold transition-all duration-150 ${button.className}`}
            onClick={button.onClick}
          >
            {button.icon}
            {button.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default TableFilterButtons;
