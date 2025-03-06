import React from "react";
import { cn } from "@/lib/utils";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/redux-store/store";

interface Tab {
  label: string;
}

interface MultiStepTabNavigationProps {
  tabs: Tab[];
  onTabChange: (activeTabIndex: number) => void;
  isBackground?: boolean;
}

const MultiStepTabNavigation: React.FC<MultiStepTabNavigationProps> = ({
  tabs,
  onTabChange,
  isBackground,
}) => {
  // Use the Redux activeTab instead of local state
  const activeTab = useSelector(
    (state: RootState) => state.packageUploadTab.activeTab
  );
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const handleTabClick = (index: number) => {
    onTabChange(index);
  };

  return (
    <nav
      className={cn(
        "flex border-b-2 py-1 sm:py-0 border-[#D3E4FB80] sticky top-0 z-[10] bg-white dark:bg-darkPrimaryBg dark:text-white dark:border-gray-900",
        isBackground && "gap-1"
      )}
    >
      <div className="flex items-center w-full">
        <div
          ref={scrollContainerRef}
          className="flex w-full overflow-x-auto no-scrollbar space-x-1 sm:space-x-4 sm:px-4"
        >
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => handleTabClick(index)}
              className={cn(
                "relative px-4 py-1 sm:py-3.5 text-sm sm:text-sm font-normal text-center rounded-md flex gap-2 items-center dark:text-white whitespace-nowrap bg-gray-100 dark:bg-darkButtonBg sm:bg-white dark:sm:bg-darkPrimaryBg",
                isBackground
                  ? activeTab === index
                    ? "bg-blue-gradient text-white"
                    : "bg-white text-dark-blue"
                  : activeTab === index
                  ? "gradient-text text-[#1571E7] dark:text-[#1571E7]"
                  : "text-gray-400"
              )}
            >
              <span
                className={cn(
                  isBackground
                    ? activeTab === index
                      ? "bg-blue-gradient"
                      : "bg-white"
                    : activeTab === index
                    ? "gradient-text text-[#1571E7]"
                    : "text-gray-500 dark:text-white"
                )}
              >
                {tab.label}
              </span>
              {!isBackground && (
                <span
                  className={`sm:w-[103px] h-[2.5px] absolute left-1/2 bottom-0 transform -translate-x-1/2 ${
                    activeTab === index ? "bg-[#1571E7]" : "bg-transparent"
                  }`}
                ></span>
              )}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default MultiStepTabNavigation;
