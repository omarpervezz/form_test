const BookingSearchFilterSkeleton = () => {
  return (
    <div className="bg-[#FFFFFF] dark:bg-darkPrimaryBg shadow-light-shadow rounded-md overflow-hidden animate-pulse">
      {/* Header Section */}
      <div className="flex items-center justify-between px-3 py-3 border-b">
        <div className="flex items-center gap-2">
          {/* Search Icon Placeholder */}
          <div className="w-5 h-5 bg-gray-300 dark:bg-[#2f3b47] rounded-full"></div>
          {/* Title Placeholder */}
          <div className="w-32 h-5 bg-gray-300 dark:bg-[#2f3b47] rounded"></div>
        </div>
        <div className="flex items-center gap-2">
          {/* Chevron Placeholder */}
          <div className="w-5 h-5 bg-gray-300 dark:bg-[#2f3b47] rounded-full"></div>
        </div>
      </div>

      {/* Content Section */}
      <div className="transition-all duration-150 ease-in-out mt-4 px-4 pb-3">
        {/* Label Placeholder */}
        <div className="space-y-2">
          <div className="w-36 h-4 bg-gray-300 dark:bg-[#2f3b47] rounded"></div>
          {/* Input Field Placeholder */}
          <div className="relative w-full max-w-sm">
            <div className="w-full h-12 bg-gray-300 dark:bg-[#2f3b47] rounded-md"></div>
            {/* Clear Button Placeholder */}
            <div className="absolute w-5 h-5 bg-gray-300 dark:bg-[#2f3b47] rounded-full right-14 top-1/2 transform -translate-y-1/2"></div>
            {/* Search Button Placeholder */}
            <div className="absolute w-8 h-8 bg-gray-300 dark:bg-[#2f3b47] rounded-sm right-3 top-1/2 transform -translate-y-1/2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSearchFilterSkeleton;
