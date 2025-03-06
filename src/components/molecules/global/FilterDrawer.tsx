import React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import Backdrop from "./Backdrop";
import CardTitle from "@/components/atoms/CardTitle";

interface FilterDrawerProps {
  title?: string;
  children: React.ReactNode;
  toggleDrawer: () => void;
  isDrawerOpen: boolean;
}

const FilterDrawer: React.FC<FilterDrawerProps> = ({
  title,
  children,
  toggleDrawer,
  isDrawerOpen,
}) => {
  return (
    <>
      <Backdrop onClick={toggleDrawer} isVisible={isDrawerOpen} />
      <div
        className={`fixed top-0 right-0 h-full overflow-y-scroll w-full max-w-[500px] bg-white dark:bg-darkPrimaryBg shadow-lg rounded-sm pt-4 pb-4 transition-transform duration-300 transform z-[61] ${
          isDrawerOpen
            ? "translate-x-0 scale-100 shadow-active"
            : "translate-x-full scale-95 shadow-hidden"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-4">
          {title && (
            <CardTitle className="text-base font-semibold">{title}</CardTitle>
          )}
          <Button
            className="hover:bg-[#F5F7FA] px-1 py-1 rounded-full"
            onClick={toggleDrawer}
          >
            <X className="w-5 h-5 text-gray-500" />
          </Button>
        </div>

        {/* Drawer Content */}
        <div className="p-4 space-y-4">{children}</div>
        <div></div>
      </div>
    </>
  );
};

export default FilterDrawer;
