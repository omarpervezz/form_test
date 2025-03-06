/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  useRef,
  useState,
  useEffect,
  ChangeEvent,
  useCallback,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/redux-store/store";
import { Button } from "@/components/atoms/Button";
import Label from "@/components/atoms/Label";
import { Input } from "@/components/atoms/Input";
import {
  addFlight,
  toggleFlightDay,
  updateFlightField,
} from "@/redux/feature/package-upload/packageUploadFlightSlice";
import { FlightType } from "@/redux/feature/package-upload/packageUploadFlightSlice";
import { cn } from "@/lib/utils";
import {
  clearFlightError,
  setFlightError,
} from "@/redux/feature/package-upload/packageUploadFlightErrorsSlice";
import Paragraph from "@/components/atoms/Paragraph";

const flightTerminals = [
  {
    id: "JFK",
    city: "New York",
    airport: "John F. Kennedy International Airport",
    iataCode: "JFK",
  },
  {
    id: "LAX",
    city: "Los Angeles",
    airport: "Los Angeles International Airport",
    iataCode: "LAX",
  },
  {
    id: "ORD",
    city: "Chicago",
    airport: "O'Hare International Airport",
    iataCode: "ORD",
  },
  {
    id: "SIN",
    city: "Singapore",
    airport: "Changi Airport",
    iataCode: "SIN",
  },
  {
    id: "HKG",
    city: "Hong Kong",
    airport: "Hong Kong International Airport",
    iataCode: "HKG",
  },
  {
    id: "SYD",
    city: "Sydney",
    airport: "Sydney Kingsford Smith Airport",
    iataCode: "SYD",
  },
  {
    id: "DXB",
    city: "Dubai",
    airport: "Dubai International Airport",
    iataCode: "DXB",
  },
  {
    id: "LHR",
    city: "London",
    airport: "Heathrow Airport",
    iataCode: "LHR",
  },
];

const PackageFlightsForm: React.FC = () => {
  const dispatch = useDispatch();
  const flights = useSelector((state: RootState) => state.packageUploadFlights);
  const days = useSelector(
    (state: RootState) => state.packageUploadDetails.days
  );
  const flightErrors = useSelector(
    (state: RootState) => state.packageUploadFlightErrors.errors
  );

  const [showDaysSelect, setShowDaysSelect] = useState<number | null>(null);
  const [showFlightFromDropdown, setShowFlightFromDropdown] = useState<
    number | null
  >(null);
  const [showFlightToDropdown, setShowFlightToDropdown] = useState<
    number | null
  >(null);
  const [flightFromSearch, setFlightFromSearch] = useState<string>("");
  const [flightToSearch, setFlightToSearch] = useState<string>("");

  const daysSelectRef = useRef<(HTMLDivElement | null)[]>([]);
  const daysRefs = useRef<HTMLDivElement[]>([]);
  const flightFromRefs = useRef<(HTMLDivElement | null)[]>([]);
  const flightToRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    daysRefs.current = daysRefs.current.slice(0, flights.length);
    flightFromRefs.current = flightFromRefs.current.slice(0, flights.length);
    flightToRefs.current = flightToRefs.current.slice(0, flights.length);
  }, [flights]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showDaysSelect !== null &&
        daysSelectRef.current[showDaysSelect] &&
        !daysSelectRef.current[showDaysSelect]?.contains(event.target as Node)
      ) {
        setShowDaysSelect(null);
      }
      if (
        showFlightFromDropdown !== null &&
        flightFromRefs.current[showFlightFromDropdown] &&
        !flightFromRefs.current[showFlightFromDropdown]?.contains(
          event.target as Node
        )
      ) {
        setShowFlightFromDropdown(null);
      }
      if (
        showFlightToDropdown !== null &&
        flightToRefs.current[showFlightToDropdown] &&
        !flightToRefs.current[showFlightToDropdown]?.contains(
          event.target as Node
        )
      ) {
        setShowFlightToDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDaysSelect, showFlightFromDropdown, showFlightToDropdown]);

  const validateFlightField = (field: keyof FlightType, value: any): string => {
    if (field === "title") {
      if (!value.trim()) return "Title is required.";
      if (value.length < 2) return "Title must be at least 2 characters.";
    }

    if (field === "flightType") {
      if (!value.trim()) return "Flight type is required.";
    }

    if (field === "carrierName") {
      if (!value.trim()) return "Carrier name is required.";
    }

    if (field === "pricePerPax") {
      if (!value) return "Price per pax is required.";
      if (isNaN(value)) return "Price per pax must be a number.";
    }

    return "";
  };

  const handleInputChange = useCallback(
    (
      index: number,
      field: keyof FlightType,
      value: string | boolean | number
    ) => {
      dispatch(updateFlightField({ index, field, value }));

      const error = validateFlightField(field, value);
      if (error) {
        dispatch(setFlightError({ index, field, error }));
      } else {
        dispatch(clearFlightError({ index, field }));
      }
    },
    [dispatch]
  );

  const handleFlightFromSelect = (index: number, terminal: string) => {
    handleInputChange(index, "flightFrom", terminal);
    setShowFlightFromDropdown(null);
  };

  const handleFlightToSelect = (index: number, terminal: string) => {
    handleInputChange(index, "flightTo", terminal);
    setShowFlightToDropdown(null);
  };

  const filteredFlightFromTerminals = flightTerminals.filter((terminal) =>
    terminal.airport.toLowerCase().includes(flightFromSearch.toLowerCase())
  );

  const filteredFlightToTerminals = flightTerminals.filter((terminal) =>
    terminal.airport.toLowerCase().includes(flightToSearch.toLowerCase())
  );

  const toggleDaysSelect = (index: number) => {
    setShowDaysSelect((prev) => (prev === index ? null : index));
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Flights</h2>
      <div className="space-y-6">
        {flights.map((flight, index) => (
          <div key={index} className="space-y-5 pb-4">
            {/* Included with Base Fare */}
            <div>
              <Label
                htmlFor={`baseFare-${index}`}
                className="flex items-center"
              >
                <input
                  id={`baseFare-${index}`}
                  type="checkbox"
                  checked={flight.includedWithBaseFare}
                  onChange={(e) =>
                    handleInputChange(
                      index,
                      "includedWithBaseFare",
                      (e as ChangeEvent<HTMLInputElement>).target.checked
                    )
                  }
                />
                <span className="ml-2 text-sm font-medium text-gray-700">
                  Included with Base Fare
                </span>
              </Label>
            </div>

            {/* Title */}
            <div className="relative w-full">
              <Label
                htmlFor={`flight-${index}-title`}
                className={cn("text-base text-black font-medium mb-2 px-1 ")}
              >
                Title *
              </Label>
              <Input
                type="text"
                id={`flight-${index}-title`}
                value={flight.title}
                onChange={(e) =>
                  handleInputChange(index, "title", e.target.value)
                }
                className={`w-full bg-transparent border border-input px-3 py-2 transition-colors focus:outline-none focus:ring-0 bg-[#F1F5F7] ${
                  flightErrors[index]?.title
                    ? "border-red-500 focus:border-red-500"
                    : "focus:border-input"
                }`}
                placeholder="Enter flight title"
              />
              {flightErrors[index]?.title && (
                <Paragraph className="mt-1.5 text-red-500 text-xs">
                  {flightErrors[index]?.title}
                </Paragraph>
              )}
            </div>

            <div className="flex gap-3">
              {/* Flight From */}
              <div
                ref={(el) => {
                  flightFromRefs.current[index] = el;
                }}
                className="relative w-full"
              >
                <Label
                  htmlFor={`flight-${index}-from`}
                  className={cn("text-base text-black font-medium mb-2 px-1 ")}
                >
                  Flight From *
                </Label>
                <div
                  className={cn(
                    "w-full border rounded-md h-12 bg-[#F1F5F7] px-3 flex items-center transition-colors cursor-pointer text-base text-muted-foreground",
                    flightErrors[index]?.flightFrom &&
                      "border-red-500 focus:border-red-500"
                  )}
                  onClick={() => setShowFlightFromDropdown(index)}
                >
                  {flight.flightFrom || "Select departure location"}
                </div>

                <div
                  className={cn(
                    "absolute z-10 bg-white border w-full rounded-md shadow-md pb-1 transition-all duration-300 transform",
                    showFlightFromDropdown === index
                      ? "opacity-100 translate-y-3"
                      : "opacity-0 translate-y-0 pointer-events-none"
                  )}
                >
                  <Input
                    type="text"
                    placeholder="Search terminals..."
                    value={flightFromSearch}
                    onChange={(e) => setFlightFromSearch(e.target.value)}
                    className="w-full p-2 mb-2 border-b border-t-0 border-r-0 border-l-0 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {filteredFlightFromTerminals.map((terminal) => (
                    <div
                      key={terminal.id}
                      className="px-2.5 py-1 cursor-pointer hover:text-white hover:bg-blue-500 "
                      onClick={() =>
                        handleFlightFromSelect(index, terminal.airport)
                      }
                    >
                      {terminal.airport} ({terminal.iataCode})
                    </div>
                  ))}
                </div>

                {flightErrors[index]?.flightFrom && (
                  <Paragraph className="mt-1.5 text-red-500 text-xs">
                    {flightErrors[index]?.flightFrom}
                  </Paragraph>
                )}
              </div>

              {/* Flight To */}
              <div
                ref={(el) => {
                  flightToRefs.current[index] = el;
                }}
                className="relative w-full"
              >
                <Label
                  htmlFor={`flight-${index}-to`}
                  className={cn("text-base text-black font-medium mb-2 px-1 ")}
                >
                  Flight To *
                </Label>
                <div
                  className={cn(
                    "w-full border rounded-md h-12 bg-[#F1F5F7] px-3 flex items-center transition-colors cursor-pointer text-base text-muted-foreground",
                    flightErrors[index]?.flightTo &&
                      "border-red-500 focus:border-red-500"
                  )}
                  onClick={() => setShowFlightToDropdown(index)}
                >
                  {flight.flightTo || "Select destination"}
                </div>

                <div
                  className={cn(
                    "absolute z-10 bg-white border w-full rounded-md shadow-md pb-1 transition-all duration-300 transform",
                    showFlightToDropdown === index
                      ? "opacity-100 translate-y-3"
                      : "opacity-0 translate-y-0 pointer-events-none"
                  )}
                >
                  <Input
                    type="text"
                    placeholder="Search terminals..."
                    value={flightToSearch}
                    onChange={(e) => setFlightToSearch(e.target.value)}
                    className="w-full p-2 mb-2 border-b border-t-0 border-r-0 border-l-0 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {filteredFlightToTerminals.map((terminal) => (
                    <div
                      key={terminal.id}
                      className="px-2.5 py-1 hover:text-white hover:bg-blue-500 cursor-pointer"
                      onClick={() =>
                        handleFlightToSelect(index, terminal.airport)
                      }
                    >
                      {terminal.airport} ({terminal.iataCode})
                    </div>
                  ))}
                </div>

                {flightErrors[index]?.flightTo && (
                  <Paragraph className="mt-1.5 text-red-500 text-xs">
                    {flightErrors[index]?.flightTo}
                  </Paragraph>
                )}
              </div>
            </div>

            <div className="flex gap-3">
              {/* Flight Type */}
              <div className="relative w-full">
                <Label
                  htmlFor={`flight-${index}-type`}
                  className={cn("text-base text-black font-medium mb-2 px-1 ")}
                >
                  Flight Type
                </Label>
                <Input
                  type="text"
                  id={`flight-${index}-type`}
                  value={flight.flightType}
                  onChange={(e) =>
                    handleInputChange(index, "flightType", e.target.value)
                  }
                  className={cn(
                    "w-full bg-transparent border border-input px-3 py-2 transition-colors focus:outline-none focus:ring-0 bg-[#F1F5F7]",
                    flightErrors[index]?.flightType
                      ? "border-red-500 focus:border-red-500"
                      : "focus:border-input"
                  )}
                  placeholder="Enter flight type"
                />
                {flightErrors[index]?.flightType && (
                  <Paragraph className="mt-1.5 text-red-500 text-xs">
                    {flightErrors[index]?.flightType}
                  </Paragraph>
                )}
              </div>

              {/* Carrier Name */}
              <div className="relative w-full">
                <Label
                  htmlFor={`flight-${index}-carrier`}
                  className={cn("text-base text-black font-medium mb-2 px-1 ")}
                >
                  Carrier Name *
                </Label>
                <Input
                  type="text"
                  id={`flight-${index}-carrier`}
                  value={flight.carrierName}
                  onChange={(e) =>
                    handleInputChange(index, "carrierName", e.target.value)
                  }
                  className={cn(
                    "w-full bg-transparent border border-input px-3 py-2 transition-colors focus:outline-none focus:ring-0 bg-[#F1F5F7]",
                    flightErrors[index]?.carrierName
                      ? "border-red-500 focus:border-red-500"
                      : "focus:border-input"
                  )}
                  placeholder="Enter carrier name"
                />
                {flightErrors[index]?.carrierName && (
                  <Paragraph className="mt-1.5 text-red-500 text-xs">
                    {flightErrors[index]?.carrierName}
                  </Paragraph>
                )}
              </div>
            </div>

            <div className="flex gap-3">
              {/* Price per Pax */}
              <div className="relative w-full">
                <Label
                  htmlFor={`flight-${index}-pricePerPax`}
                  className={cn("text-base text-black font-medium mb-2 px-1 ")}
                >
                  Price per Pax
                </Label>
                <Input
                  type="number"
                  id={`flight-${index}-pricePerPax`}
                  value={flight.pricePerPax}
                  onChange={(e) =>
                    handleInputChange(
                      index,
                      "pricePerPax",
                      parseFloat(e.target.value)
                    )
                  }
                  className={cn(
                    "w-full bg-transparent border border-input px-3 py-2 transition-colors focus:outline-none focus:ring-0 bg-[#F1F5F7]",
                    flightErrors[index]?.pricePerPax
                      ? "border-red-500 focus:border-red-500"
                      : "focus:border-input"
                  )}
                  placeholder="Enter price per pax"
                  disabled={flight.includedWithBaseFare}
                />
                {flightErrors[index]?.pricePerPax && (
                  <Paragraph className="mt-1.5 text-red-500 text-xs">
                    {flightErrors[index]?.pricePerPax}
                  </Paragraph>
                )}
              </div>

              {/* Flight Days */}
              <div
                className="relative w-full"
                ref={(el) => {
                  daysSelectRef.current[index] = el;
                }}
              >
                <Label
                  htmlFor={`flight-${index}-days`}
                  className={cn("text-base text-black font-medium mb-2 px-1 ")}
                >
                  Flight Days
                </Label>
                <div
                  className={cn(
                    "w-full border rounded-md h-12 bg-[#F1F5F7] px-3 flex items-center transition-colors cursor-pointer text-base text-muted-foreground",
                    flightErrors[index]?.days &&
                      "border-red-500 focus:border-red-500"
                  )}
                  onClick={() => toggleDaysSelect(index)}
                >
                  {flight.days.length > 0
                    ? flight.days.join(", ")
                    : "Select Days"}
                </div>

                {/* Dropdown Menu with Checkboxes */}
                <div
                  className={cn(
                    "absolute z-10 bg-white border w-full rounded-md shadow-md transition-all duration-200 ease-in-out transform",
                    showDaysSelect == index
                      ? "opacity-100 translate-y-3"
                      : "opacity-0 translate-y-0 pointer-events-none"
                  )}
                >
                  {Array.from({ length: days }, (_, i) => i + 1).map((day) => (
                    <label
                      key={day}
                      className="flex items-center px-2.5 py-1.5 cursor-pointer hover:bg-gray-100 rounded-md"
                    >
                      <input
                        type="checkbox"
                        checked={flight.days.includes(day)}
                        onChange={() =>
                          dispatch(toggleFlightDay({ index, day }))
                        }
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-2"
                      />
                      Day {day}
                    </label>
                  ))}
                </div>
                {flightErrors[index]?.days && (
                  <Paragraph className="mt-1.5 text-red-500 text-xs">
                    {flightErrors[index]?.days}
                  </Paragraph>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Add Flight Button */}
        <Button
          type="button"
          onClick={() => dispatch(addFlight())}
          className="w-full sm:w-auto bg-green-500 text-white px-5 py-2 rounded-md text-sm"
        >
          Add Flight
        </Button>
      </div>
    </div>
  );
};

export default PackageFlightsForm;
