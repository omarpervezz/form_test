/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/redux-store/store";
import {
  addHotel,
  toggleHotelDay,
  updateHotelField,
} from "@/redux/feature/package-upload/packageUploadHotelSlice";
import { HotelType } from "@/redux/feature/package-upload/packageUploadHotelSlice";
import { Button } from "@/components/atoms/Button";
import Label from "@/components/atoms/Label";
import { Input } from "@/components/atoms/Input";
import {
  clearHotelError,
  setHotelError,
} from "@/redux/feature/package-upload/packageUploadHotelErrorsSlice";
import Paragraph from "@/components/atoms/Paragraph";
import { cn } from "@/lib/utils";

const PackageHotelsForm: React.FC = () => {
  const dispatch = useDispatch();
  const hotels = useSelector((state: RootState) => state.packageUploadHotels);
  const hotelErrors = useSelector(
    (state: RootState) => state.packageUploadHotelErrors.errors
  );

  const days = useSelector(
    (state: RootState) => state.packageUploadDetails.days
  );

  const [showDaysSelect, setShowDaysSelect] = useState<number | null>(null);
  const daysSelectRef = useRef<(HTMLDivElement | null)[]>([]);
  const daysRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    daysRefs.current = daysRefs.current.slice(0, hotels.length);
  }, [hotels]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showDaysSelect !== null &&
        daysSelectRef.current[showDaysSelect] &&
        !daysSelectRef.current[showDaysSelect]?.contains(event.target as Node)
      ) {
        setShowDaysSelect(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDaysSelect]);

  const validateHotelField = (field: keyof HotelType, value: any): string => {
    if (field === "title") {
      if (!value.trim()) return "Title is required.";
      if (value.length < 2) return "Title must be at least 2 characters.";
    }

    if (field === "hotelName") {
      if (!value.trim()) return "Hotel name is required.";
    }

    if (field === "hotelStar") {
      if (!value) return "Hotel star rating is required.";
      if (isNaN(value)) return "Hotel star must be a number.";
    }

    if (field === "roomType") {
      if (!value.trim()) return "Room type is required.";
    }

    if (field === "roomCategory") {
      if (!value.trim()) return "Room category is required.";
    }

    if (field === "pricePerNight") {
      if (!value) return "Price per night is required.";
      if (isNaN(value)) return "Price per night must be a number.";
    }

    if (field === "totalStays") {
      if (!value) return "Total stays is required.";
      if (isNaN(value)) return "Total stays must be a number.";
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
      field: keyof HotelType,
      e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
      let value: string | number | boolean = e.target.value;

      if (
        field === "hotelStar" ||
        field === "pricePerNight" ||
        field === "totalStays"
      ) {
        value = value === "" ? "" : parseInt(value);
      }
      if (field === "includedWithBaseFare") {
        value = (e as ChangeEvent<HTMLInputElement>).target.checked;
      }

      dispatch(updateHotelField({ index, field, value }));

      const error = validateHotelField(field, value);
      if (error) {
        dispatch(setHotelError({ index, field, error }));
      } else {
        dispatch(clearHotelError({ index, field }));
      }
    },
    [dispatch]
  );
  const toggleDaysSelect = (index: number) => {
    setShowDaysSelect((prev) => (prev === index ? null : index));
  };
  return (
    <div className="p-4 border rounded-md">
      <h2 className="text-lg font-semibold mb-4">Hotels</h2>
      <div className="space-y-6">
        {hotels.map((hotel, index) => (
          <div key={index} className="space-y-5 border-b pb-4 last:border-b-0">
            {/* Included with Base Fare */}
            <div>
              <Label
                htmlFor={`baseFare-${index}`}
                className="flex items-center"
              >
                <input
                  id={`baseFare-${index}`}
                  type="checkbox"
                  checked={hotel.includedWithBaseFare}
                  onChange={(e) =>
                    handleInputChange(index, "includedWithBaseFare", e)
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
                htmlFor={`hotel-${index}-title`}
                className={cn("text-base text-black font-medium mb-2 px-1 ")}
              >
                Title *
              </Label>
              <Input
                type="text"
                id={`hotel-${index}-title`}
                value={hotel.title}
                onChange={(e) => handleInputChange(index, "title", e)}
                className={cn(
                  "w-full bg-transparent border border-input px-3 py-2 transition-colors focus:outline-none focus:ring-0 bg-[#F1F5F7]",
                  hotelErrors[index]?.title
                    ? "border-red-500 focus:border-red-500"
                    : "focus:border-input"
                )}
                placeholder="Enter hotel title"
              />
              {hotelErrors[index]?.title && (
                <Paragraph className="mt-1.5 text-red-500 text-xs">
                  {hotelErrors[index]?.title}
                </Paragraph>
              )}
            </div>

            <div className="flex gap-3">
              {/* Hotel Name */}
              <div className="relative w-full">
                <Label
                  htmlFor={`hotel-${index}-name`}
                  className={cn("text-base text-black font-medium mb-2 px-1 ")}
                >
                  Hotel Name *
                </Label>
                <Input
                  type="text"
                  id={`hotel-${index}-name`}
                  value={hotel.hotelName}
                  onChange={(e) => handleInputChange(index, "hotelName", e)}
                  className={cn(
                    "w-full bg-transparent border border-input px-3 py-2 transition-colors focus:outline-none focus:ring-0 bg-[#F1F5F7]",
                    hotelErrors[index]?.hotelName
                      ? "border-red-500 focus:border-red-500"
                      : "focus:border-input"
                  )}
                  placeholder="Enter hotel name"
                />
                {hotelErrors[index]?.hotelName && (
                  <Paragraph className="mt-1.5 text-red-500 text-xs">
                    {hotelErrors[index]?.hotelName}
                  </Paragraph>
                )}
              </div>

              {/* Hotel Star */}
              <div className="relative w-full">
                <Label
                  htmlFor={`hotel-${index}-star`}
                  className={cn("text-base text-black font-medium mb-2 px-1 ")}
                >
                  Hotel Star *
                </Label>
                <Input
                  type="number"
                  id={`hotel-${index}-star`}
                  value={hotel.hotelStar}
                  onChange={(e) => handleInputChange(index, "hotelStar", e)}
                  className={cn(
                    "w-full bg-transparent border border-input px-3 py-2 transition-colors focus:outline-none focus:ring-0 bg-[#F1F5F7]",
                    hotelErrors[index]?.hotelStar
                      ? "border-red-500 focus:border-red-500"
                      : "focus:border-input"
                  )}
                  placeholder="Enter hotel star rating"
                />
                {hotelErrors[index]?.hotelStar && (
                  <Paragraph className="mt-1.5 text-red-500 text-xs">
                    {hotelErrors[index]?.hotelStar}
                  </Paragraph>
                )}
              </div>
            </div>

            <div className="flex gap-3">
              {/* Room Type */}
              <div className="relative w-full">
                <Label
                  htmlFor={`hotel-${index}-roomType`}
                  className={cn("text-base text-black font-medium mb-2 px-1 ")}
                >
                  Room Type *
                </Label>
                <Input
                  type="text"
                  id={`hotel-${index}-roomType`}
                  value={hotel.roomType}
                  onChange={(e) => handleInputChange(index, "roomType", e)}
                  className={cn(
                    "w-full bg-transparent border border-input px-3 py-2 transition-colors focus:outline-none focus:ring-0 bg-[#F1F5F7]",
                    hotelErrors[index]?.roomType
                      ? "border-red-500 focus:border-red-500"
                      : "focus:border-input"
                  )}
                  placeholder="Enter room type"
                />
                {hotelErrors[index]?.roomType && (
                  <Paragraph className="mt-1.5 text-red-500 text-xs">
                    {hotelErrors[index]?.roomType}
                  </Paragraph>
                )}
              </div>

              {/* Room Category */}
              <div className="relative w-full">
                <Label
                  htmlFor={`hotel-${index}-roomCategory`}
                  className={cn("text-base text-black font-medium mb-2 px-1 ")}
                >
                  Room Category *
                </Label>
                <Input
                  type="text"
                  id={`hotel-${index}-roomCategory`}
                  value={hotel.roomCategory}
                  onChange={(e) => handleInputChange(index, "roomCategory", e)}
                  className={cn(
                    "w-full bg-transparent border border-input px-3 py-2 transition-colors focus:outline-none focus:ring-0 bg-[#F1F5F7]",
                    hotelErrors[index]?.roomCategory
                      ? "border-red-500 focus:border-red-500"
                      : "focus:border-input"
                  )}
                  placeholder="Enter room category"
                />
                {hotelErrors[index]?.roomCategory && (
                  <Paragraph className="mt-1.5 text-red-500 text-xs">
                    {hotelErrors[index]?.roomCategory}
                  </Paragraph>
                )}
              </div>
            </div>

            <div className="flex gap-3">
              {/* Price per Night */}
              <div className="relative w-full">
                <Label
                  htmlFor={`hotel-${index}-pricePerNight`}
                  className={cn("text-base text-black font-medium mb-2 px-1 ")}
                >
                  Price per Night *
                </Label>
                <Input
                  type="number"
                  id={`hotel-${index}-pricePerNight`}
                  value={hotel.pricePerNight}
                  onChange={(e) => handleInputChange(index, "pricePerNight", e)}
                  className={cn(
                    "w-full bg-transparent border border-input px-3 py-2 transition-colors focus:outline-none focus:ring-0 bg-[#F1F5F7]",
                    hotelErrors[index]?.pricePerNight
                      ? "border-red-500 focus:border-red-500"
                      : "focus:border-input"
                  )}
                  placeholder="Enter price per night"
                />
                {hotelErrors[index]?.pricePerNight && (
                  <Paragraph className="mt-1.5 text-red-500 text-xs">
                    {hotelErrors[index]?.pricePerNight}
                  </Paragraph>
                )}
              </div>
              {/* Total Stays */}
              <div className="relative w-full">
                <Label
                  htmlFor={`hotel-${index}-totalStays`}
                  className={cn("text-base text-black font-medium mb-2 px-1 ")}
                >
                  Total Stays *
                </Label>
                <Input
                  type="number"
                  id={`hotel-${index}-totalStays`}
                  value={hotel.totalStays}
                  onChange={(e) => handleInputChange(index, "totalStays", e)}
                  className={cn(
                    "w-full bg-transparent border border-input px-3 py-2 transition-colors focus:outline-none focus:ring-0 bg-[#F1F5F7]",
                    hotelErrors[index]?.totalStays
                      ? "border-red-500 focus:border-red-500"
                      : "focus:border-input"
                  )}
                  placeholder="Enter total stays"
                />
                {hotelErrors[index]?.totalStays && (
                  <Paragraph className="mt-1.5 text-red-500 text-xs">
                    {hotelErrors[index]?.totalStays}
                  </Paragraph>
                )}
              </div>
            </div>
            <div className="flex gap-3">
              {/* hotel days */}
              <div
                className="relative w-full"
                ref={(el) => {
                  daysSelectRef.current[index] = el;
                }}
              >
                <Label
                  htmlFor={`hotel-${index}-days`}
                  className={cn("text-base text-black font-medium mb-2 px-1 ")}
                >
                  Hotel Days *
                </Label>
                <div
                  className={cn(
                    "w-full border rounded-md h-12 bg-[#F1F5F7] px-3 flex items-center transition-colors cursor-pointer text-base text-muted-foreground",
                    hotelErrors[index]?.days &&
                      "border-red-500 focus:border-red-500"
                  )}
                  onClick={() => toggleDaysSelect(index)}
                >
                  {hotel.days.length > 0
                    ? hotel.days.join(", ")
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
                        checked={hotel.days.includes(day)}
                        onChange={() =>
                          dispatch(toggleHotelDay({ index, day }))
                        }
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-2"
                      />
                      Day {day}
                    </label>
                  ))}
                </div>
                {hotelErrors[index]?.days && (
                  <Paragraph className="mt-1.5 text-red-500 text-xs">
                    {hotelErrors[index]?.days}
                  </Paragraph>
                )}
              </div>
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
                  value={hotel.pricePerPax}
                  onChange={(e) => handleInputChange(index, "pricePerPax", e)}
                  className={cn(
                    "w-full bg-transparent border border-input px-3 py-2 transition-colors focus:outline-none focus:ring-0 bg-[#F1F5F7]",
                    hotelErrors[index]?.pricePerPax
                      ? "border-red-500 focus:border-red-500"
                      : "focus:border-input"
                  )}
                  placeholder="Enter price per pax"
                  disabled={hotel.includedWithBaseFare}
                />
                {hotelErrors[index]?.pricePerPax && (
                  <Paragraph className="mt-1.5 text-red-500 text-xs">
                    {hotelErrors[index]?.pricePerPax}
                  </Paragraph>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Add Hotel Button */}
        <Button
          type="button"
          onClick={() => dispatch(addHotel())}
          className="w-full sm:w-auto bg-green-500 text-white px-5 py-2 rounded-md text-sm"
        >
          Add Hotel
        </Button>
      </div>
    </div>
  );
};

export default PackageHotelsForm;
