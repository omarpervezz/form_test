const PriceFilterSkeleton = () => {
  return (
    <div className="bg-[#FFFFFF] dark:bg-darkButtonBg shadow-light-shadow rounded-md overflow-hidden">
      {/* Header Section */}
      <div className="flex items-center justify-between px-3 py-3 border-b animate-pulse">
        <div className="flex items-center gap-2">
          {/* Placeholder for Icon */}
          <div className="w-6 h-6 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
          {/* Placeholder for Title */}
          <div className="w-24 h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>
        <div className="flex items-center gap-2">
          {/* Placeholder for Button */}
          <div className="w-16 h-6 bg-gray-300 dark:bg-gray-700 rounded"></div>
          {/* Placeholder for Chevron */}
          <div className="w-6 h-6 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
        </div>
      </div>
      {/* Content Section */}
      <div className="transition-all duration-150 ease-in-out space-y-2 overflow-hidden px-4 py-3">
        {/* Placeholder for Text */}
        <div className="w-full h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
        {/* Placeholder for Range Slider */}
        <div className="w-full h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
        {/* Placeholder for Price Display */}
        <div className="w-40 h-6 bg-gray-300 dark:bg-gray-700 rounded mx-auto"></div>
      </div>
    </div>
  );
};

export default PriceFilterSkeleton;
