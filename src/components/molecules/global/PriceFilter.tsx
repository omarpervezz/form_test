import React, { useState } from "react";
import RangeSlider from "@/components/atoms/RangeSlider";
import CardTitle from "@/components/atoms/CardTitle";
import Paragraph from "@/components/atoms/Paragraph";
import { PriceRangeIcon } from "@/components/atoms";
import { Button } from "@/components/atoms/Button";
import { ChevronDown } from "lucide-react";
import ResetFilterButton from "@/components/atoms/ResetFilterButton";

interface PriceFilterProps {
  value: [number, number];
  onValueChange: (value: [number, number]) => void;
  min: number;
  max: number;
  resetFilter?: () => void;
  isFilterApplied?: boolean;
}

const PriceFilter: React.FC<PriceFilterProps> = ({
  value,
  onValueChange,
  min,
  max,
  resetFilter,
  isFilterApplied,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  const toggleContent = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="bg-[#FFFFFF] dark:bg-darkButtonBg shadow-light-shadow rounded-md overflow-hidden">
      <div
        className={`flex items-center justify-between px-3 py-3 ${
          isExpanded && "border-b"
        }`}
      >
        <div className="flex items-center gap-2">
          <PriceRangeIcon />
          <CardTitle className="text-lg text-black font-semibold dark:text-white">
            Price Range
          </CardTitle>
        </div>
        <div className=" flex items-center gap-2">
          {isFilterApplied && <ResetFilterButton resetFilter={resetFilter} />}
          <Button onClick={toggleContent}>
            <ChevronDown
              className={`transform transition-transform duration-300 ${
                isExpanded ? "rotate-180" : "rotate-0"
              }`}
            />
          </Button>
        </div>
      </div>
      <div
        className={`transition-all duration-150 ease-in-out space-y-2 overflow-hidden ${
          isExpanded ? "max-h-fit py-3" : "max-h-0 py-0"
        }`}
      >
        <div className="px-4 py-3 space-y-12">
          <Paragraph className="text-[#8391A1] text-[14px] font-semibold leading-[16.8px] dark:text-white">
            Starts from $ {min} - $ {max}.
          </Paragraph>
          <RangeSlider
            value={value}
            onValueChange={onValueChange}
            min={min}
            max={max}
          />
          <div className="text-center">
            <span className="font-semibold text-[16px] leading-[16.8px] text-[#243045] dark:text-white">
              USD {value[0]} - USD {value[1]}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceFilter;
