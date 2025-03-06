// useHotelFilter.ts
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterHotelsByName,
  filterHotelsByPriceRange,
  selectSearchQuery,
  selectPriceRange,
} from "@/redux/feature/search/hotel-search/hotelSlice";
import { RootState } from "@/redux/redux-store/store";

interface PriceRange {
  min: number;
  max: number;
}

const useHotelFilter = () => {
  const dispatch = useDispatch();

  // Get current search query and price filter values from Redux.
  const searchQuery = useSelector((state: RootState) =>
    selectSearchQuery(state)
  );
  const priceRange = useSelector((state: RootState) => selectPriceRange(state));

  // Also retrieve the full hotel data to compute min and max price from the response.
  const hotels = useSelector((state: RootState) => state.hotel.data);

  // Compute the minimum and maximum prices from the hotel data.
  const computedMinPrice = hotels.length
    ? Math.min(...hotels.map((hotel) => hotel.discountPrice))
    : 0;
  const computedMaxPrice = hotels.length
    ? Math.max(...hotels.map((hotel) => hotel.discountPrice))
    : 1000; // default value if no data exists

  // Memoized function to update the search query.
  const setSearchQuery = useCallback(
    (query: string) => {
      dispatch(filterHotelsByName(query));
    },
    [dispatch]
  );

  // Memoized function to update the price range filter.
  const setPriceRange = useCallback(
    (range: PriceRange) => {
      dispatch(filterHotelsByPriceRange(range));
    },
    [dispatch]
  );

  // Handler for when the price range slider changes.
  const handlePriceRangeChange = useCallback(
    (newRange: [number, number]) => {
      setPriceRange({ min: newRange[0], max: newRange[1] });
    },
    [setPriceRange]
  );

  // Global reset function clears both the search query and the price filter.
  const resetFilter = useCallback(() => {
    dispatch(filterHotelsByName(""));
    dispatch(
      filterHotelsByPriceRange({ min: computedMinPrice, max: computedMaxPrice })
    );
  }, [dispatch, computedMinPrice, computedMaxPrice]);

  // Individual reset functions.
  const resetSearchFilter = useCallback(() => {
    dispatch(filterHotelsByName(""));
  }, [dispatch]);

  const resetPriceFilter = useCallback(() => {
    dispatch(
      filterHotelsByPriceRange({ min: computedMinPrice, max: computedMaxPrice })
    );
  }, [dispatch, computedMinPrice, computedMaxPrice]);

  // Create an array of the current price range values.
  const priceRangeValues: [number, number] = [priceRange.min, priceRange.max];

  // Determine if filters are applied.
  const isSearchFilterApplied = searchQuery.trim() !== "";
  const isPriceFilterApplied =
    priceRange.min !== computedMinPrice || priceRange.max !== computedMaxPrice;
  const isAnyFilterApplied = isSearchFilterApplied || isPriceFilterApplied;

  return {
    searchQuery,
    setSearchQuery,
    priceRange,
    computedMinPrice,
    computedMaxPrice,
    priceRangeValues,
    resetFilter, // Global reset for all filters.
    resetSearchFilter, // Reset only the search filter.
    resetPriceFilter, // Reset only the price filter.
    handlePriceRangeChange,
    isSearchFilterApplied,
    isPriceFilterApplied,
    isAnyFilterApplied,
  };
};

export default useHotelFilter;
