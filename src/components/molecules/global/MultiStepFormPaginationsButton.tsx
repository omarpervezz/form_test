import { Button } from "@/components/atoms/Button";
import { MoveLeft, MoveRight } from "lucide-react";
import React from "react";

interface PackagePaginationsButtonProps {
  handleTabChange: (tabIndex: number) => void;
  activeTab: number;
  tabsLength: number;
}

const PackagePaginationsButton: React.FC<PackagePaginationsButtonProps> = ({
  handleTabChange,
  activeTab,
  tabsLength,
}) => {
  return (
    <div className="flex mt-4 justify-end">
      <Button
        className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm 
               ${
                 activeTab === 0
                   ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                   : "bg-blue-gradient text-white cursor-pointer"
               }
               transition duration-300 ease-in-out`}
        onClick={() => handleTabChange(activeTab - 1)}
        disabled={activeTab === 0}
        aria-label="Previous Page"
        type="button"
      >
        <MoveLeft className="h-5 w-5" />
        <span className="inline">Back</span>
      </Button>

      {activeTab === tabsLength - 1 ? (
        <Button
          className={`px-4 py-2 rounded-md ml-2 text-sm
                 bg-green-500  text-white cursor-pointer
                 transition duration-300 ease-in-out`}
          aria-label="Submit"
        >
          Submit
        </Button>
      ) : (
        <Button
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm ml-2
                 bg-blue-gradient text-white cursor-pointer
                 transition duration-300 ease-in-out`}
          onClick={() => handleTabChange(activeTab + 1)}
          aria-label="Next Page"
          type="button"
        >
          <span className="inline">Next</span>
          <MoveRight className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
};

export default PackagePaginationsButton;
