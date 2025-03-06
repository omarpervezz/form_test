import { Flight } from "@/types/api";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/redux-store/store";
import {
  setPriceRange,
  setSelectedAirlines,
  setSelectedFlightType,
  setSelectedRefundType,
  setSortOption,
  TripType,
} from "@/redux/feature/search/flight-search/flightFiltersSlice";
import { useEffect, useState } from "react";

export function useFlightFilter(flights: Flight[], tripType: TripType) {
  const dispatch = useDispatch();
  const filters = useSelector(
    (state: RootState) => state.flightFilters[tripType]
  );

  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [airlineNames, setAirlineNames] = useState<
    { name: string; price: number }[]
  >([]);
  const [cheapestPrice, setCheapestPrice] = useState<number | null>(null);
  const [earliestTime, setEarliestTime] = useState<string | null>(null);
  const [fastestDuration, setFastestDuration] = useState<string | null>(null);

  useEffect(() => {
    if (flights.length > 0) {
      const prices = flights.map((flight) => flight.price);
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      setMinPrice(minPrice);
      setMaxPrice(maxPrice);

      if (filters.priceRange[0] === 0 && filters.priceRange[1] === 0) {
        dispatch(setPriceRange({ tripType, priceRange: [minPrice, maxPrice] }));
      }

      setCheapestPrice(minPrice);

      const uniqueAirlines = flights.reduce<{ name: string; price: number }[]>(
        (acc, flight) => {
          flight.airlines.forEach((airline) => {
            if (!acc.some((item) => item.name === airline.name)) {
              acc.push({ name: airline.name, price: flight.price });
            }
          });
          return acc;
        },
        []
      );
      setAirlineNames(uniqueAirlines);

      const times = flights
        .flatMap((flight) =>
          flight.airlines.map((airline) => airline.departureTime)
        )
        .sort();
      setEarliestTime(times[0]);

      const durations = flights
        .flatMap((flight) =>
          flight.airlines.map((airline) => parseDuration(airline.duration))
        )
        .sort((a, b) => a - b);
      setFastestDuration(formatDuration(durations[0]));
    }
  }, [flights, dispatch, filters.priceRange, tripType]);

  // ✅ Filtering logic
  let filteredFlights = flights.filter(
    (flight) =>
      flight.price >= filters.priceRange[0] &&
      flight.price <= filters.priceRange[1] &&
      (filters.selectedAirlines.length === 0 ||
        flight.airlines.some((airline) =>
          filters.selectedAirlines.includes(airline.name)
        )) &&
      (filters.selectedFlightType === "" ||
        flight.flightType === filters.selectedFlightType) &&
      (filters.selectedRefundType === "" ||
        (filters.selectedRefundType === "Refundable" && flight.refundable) ||
        (filters.selectedRefundType === "Non-Refundable" && !flight.refundable))
  );

  // ✅ Apply sorting
  switch (filters.sortOption) {
    case "cheapest":
      filteredFlights = filteredFlights.sort((a, b) => a.price - b.price);
      break;
    case "earliest":
      filteredFlights = filteredFlights.sort((a, b) =>
        a.airlines[0]?.departureTime.localeCompare(b.airlines[0]?.departureTime)
      );
      break;
    case "fastest":
      filteredFlights = filteredFlights.sort(
        (a, b) =>
          parseDuration(a.airlines[0]?.duration) -
          parseDuration(b.airlines[0]?.duration)
      );
      break;
    default:
      break;
  }

  return {
    minPrice,
    maxPrice,
    priceRangeValues: filters.priceRange,
    setPriceRangeValues: (values: [number, number]) =>
      dispatch(setPriceRange({ tripType, priceRange: values })),
    filteredFlights,
    airlineNames,
    selectedAirlines: filters.selectedAirlines,
    handleAirlineSelect: (name: string) =>
      dispatch(
        setSelectedAirlines({
          tripType,
          selectedAirlines: filters.selectedAirlines.includes(name)
            ? filters.selectedAirlines.filter((n) => n !== name)
            : [...filters.selectedAirlines, name],
        })
      ),
    handleSortChange: (option: string) =>
      dispatch(setSortOption({ tripType, sortOption: option })),
    sortOption: filters.sortOption,
    cheapestPrice,
    earliestTime,
    fastestDuration,
    selectedFlightType: filters.selectedFlightType,
    handleFlightTypeChange: (type: string) =>
      dispatch(setSelectedFlightType({ tripType, selectedFlightType: type })),
    selectedRefundType: filters.selectedRefundType,
    handleRefundTypeChange: (type: string) =>
      dispatch(setSelectedRefundType({ tripType, selectedRefundType: type })),
  };
}

// ✅ Helper functions for duration conversion
const parseDuration = (duration: string): number => {
  const match = duration.match(/(\d+)hr\s*(\d*)m?/);
  if (!match) return 0;

  const hours = parseInt(match[1], 10);
  const minutes = match[2] ? parseInt(match[2], 10) : 0;

  return hours * 60 + minutes;
};

const formatDuration = (minutes: number): string => {
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hrs}hr ${mins}m` : `${hrs}hr`;
};
