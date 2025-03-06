/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/redux-store/store";
import { Input } from "@/components/atoms/Input";
import Label from "@/components/atoms/Label";
import Paragraph from "@/components/atoms/Paragraph";
import { Button } from "@/components/atoms/Button";
import {
  updateHotelField,
  addHotel,
  removeHotel,
  HajjUploadHotelType,
} from "@/redux/feature/hajj-upload/hajjUploadHotelsSlice";
import {
  setHotelError,
  clearHotelError,
} from "@/redux/feature/hajj-upload/hajjUploadHotelErrorsSlice";
import { cn } from "@/lib/utils";

const HajjHotelForm: React.FC = () => {
  const dispatch = useDispatch();
  const hotels = useSelector(
    (state: RootState) => state.hajjUploadHotels.hotels
  );
  const errors = useSelector(
    (state: RootState) => state.hajjUploadHotelErrors.hotelErrors
  );

  const validateField = useCallback(
    (field: keyof HajjUploadHotelType, value: any) => {
      let error = "";
      if (field === "hotelName" && !value.trim()) {
        error = "Hotel name is required";
      }
      if (field === "hotelType" && !value.trim()) {
        error = "Hotel type is required";
      }
      if (field === "roomType" && !value.trim()) {
        error = "Room type is required";
      }
      if (field === "hotelStar" && !value.trim()) {
        error = "Hotel star is required";
      }
      if (field === "hotelDistance" && !value.trim()) {
        error = "Hotel distance is required";
      }
      if (field === "pricePerNight" && !value.trim()) {
        error = "Price per night is required";
      }
      return error;
    },
    []
  );

  const handleInputChange = useCallback(
    (
      index: number,
      field: keyof HajjUploadHotelType,
      value: string | boolean | number
    ) => {
      dispatch(updateHotelField({ index, field, value }));
      const error = validateField(field, value);
      if (error) {
        dispatch(setHotelError({ index, field, error }));
      } else {
        dispatch(clearHotelError({ index, field }));
      }
    },
    [dispatch, validateField]
  );

  const handleAddHotel = () => {
    dispatch(addHotel());
  };

  const handleRemoveHotel = (index: number) => {
    dispatch(removeHotel(index));
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-medium mb-4">Hotel</h2>
      <div className="space-y-6">
        {hotels.map((hotel, index) => (
          <div key={index} className="space-y-5 pb-4">
            <div className="relative w-full">
              <Label
                htmlFor={`baseFare-${index}`}
                className="flex items-center"
              >
                <input
                  id={`baseFare-${index}`}
                  type="checkbox"
                  checked={hotel.includedWithBasePrice}
                  onChange={(e) =>
                    handleInputChange(
                      index,
                      "includedWithBasePrice",
                      (e as ChangeEvent<HTMLInputElement>).target.checked
                    )
                  }
                />
                <span className="ml-2 text-sm font-medium text-gray-700">
                  Included with Base Price
                </span>
              </Label>
            </div>
            <div className="relative w-full">
              <Label
                htmlFor={`hotelName-${index}`}
                className={cn("text-base text-black font-medium mb-2 px-1 ")}
              >
                Hotel Name
              </Label>
              <Input
                id={`hotelName-${index}`}
                value={hotel.hotelName}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleInputChange(index, "hotelName", e.target.value)
                }
                className={cn(
                  "w-full bg-transparent border border-input px-3 py-2 transition-colors focus:outline-none focus:ring-0 bg-[#F1F5F7]",
                  errors[index]?.hotelName
                    ? "border-red-500 focus:border-red-500"
                    : "focus:border-input"
                )}
                placeholder="Enter hotel name"
              />
              {errors[index]?.hotelName && (
                <Paragraph className="mt-1.5 text-red-500 text-xs">
                  {errors[index]?.hotelName}
                </Paragraph>
              )}
            </div>
            <div className="flex gap-3">
              <div className="relative w-full">
                <Label
                  htmlFor={`hotelType-${index}`}
                  className={cn("text-base text-black font-medium mb-2 px-1 ")}
                >
                  Hotel Type *
                </Label>
                <Input
                  id={`hotelType-${index}`}
                  value={hotel.hotelType}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleInputChange(index, "hotelType", e.target.value)
                  }
                  className={cn(
                    "w-full bg-transparent border border-input px-3 py-2 transition-colors focus:outline-none focus:ring-0 bg-[#F1F5F7]",
                    errors[index]?.hotelType
                      ? "border-red-500 focus:border-red-500"
                      : "focus:border-input"
                  )}
                  placeholder="Enter hotel type"
                />
                {errors[index]?.hotelType && (
                  <Paragraph className="mt-1.5 text-red-500 text-xs">
                    {errors[index]?.hotelType}
                  </Paragraph>
                )}
              </div>
              <div className="relative w-full">
                <Label
                  htmlFor={`roomType-${index}`}
                  className={cn("text-base text-black font-medium mb-2 px-1 ")}
                >
                  Room Type *
                </Label>
                <Input
                  id={`roomType-${index}`}
                  value={hotel.roomType}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleInputChange(index, "roomType", e.target.value)
                  }
                  className={cn(
                    "w-full bg-transparent border border-input px-3 py-2 transition-colors focus:outline-none focus:ring-0 bg-[#F1F5F7]",
                    errors[index]?.roomType
                      ? "border-red-500 focus:border-red-500"
                      : "focus:border-input"
                  )}
                  placeholder="Enter room type"
                />
                {errors[index]?.roomType && (
                  <Paragraph className="mt-1.5 text-red-500 text-xs">
                    {errors[index]?.roomType}
                  </Paragraph>
                )}
              </div>
            </div>
            <div className="flex gap-3">
              <div className="relative w-full">
                <Label
                  htmlFor={`hotelStar-${index}`}
                  className={cn("text-base text-black font-medium mb-2 px-1 ")}
                >
                  Hotel Star *
                </Label>
                <Input
                  id={`hotelStar-${index}`}
                  value={hotel.hotelStar}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleInputChange(index, "hotelStar", e.target.value)
                  }
                  className={cn(
                    "w-full bg-transparent border border-input px-3 py-2 transition-colors focus:outline-none focus:ring-0 bg-[#F1F5F7]",
                    errors[index]?.hotelStar
                      ? "border-red-500 focus:border-red-500"
                      : "focus:border-input"
                  )}
                  placeholder="Enter hotel star"
                />
                {errors[index]?.hotelStar && (
                  <Paragraph className="mt-1.5 text-red-500 text-xs">
                    {errors[index]?.hotelStar}
                  </Paragraph>
                )}
              </div>
              <div className="relative w-full">
                <Label
                  htmlFor={`hotelDistance-${index}`}
                  className={cn("text-base text-black font-medium mb-2 px-1 ")}
                >
                  Hotel Distance *
                </Label>
                <Input
                  id={`hotelDistance-${index}`}
                  value={hotel.hotelDistance}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleInputChange(index, "hotelDistance", e.target.value)
                  }
                  className={cn(
                    "w-full bg-transparent border border-input px-3 py-2 transition-colors focus:outline-none focus:ring-0 bg-[#F1F5F7]",
                    errors[index]?.hotelDistance
                      ? "border-red-500 focus:border-red-500"
                      : "focus:border-input"
                  )}
                  placeholder="Enter hotel distance"
                />
                {errors[index]?.hotelDistance && (
                  <Paragraph className="mt-1.5 text-red-500 text-xs">
                    {errors[index]?.hotelDistance}
                  </Paragraph>
                )}
              </div>
            </div>
            <div className="flex gap-3">
              <div className="relative w-full">
                <Label
                  htmlFor={`pricePerNight-${index}`}
                  className={cn("text-base text-black font-medium mb-2 px-1 ")}
                >
                  Price per Night *
                </Label>
                <Input
                  id={`pricePerNight-${index}`}
                  value={hotel.pricePerNight}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleInputChange(index, "pricePerNight", e.target.value)
                  }
                  className={cn(
                    "w-full bg-transparent border border-input px-3 py-2 transition-colors focus:outline-none focus:ring-0 bg-[#F1F5F7]",
                    errors[index]?.pricePerNight
                      ? "border-red-500 focus:border-red-500"
                      : "focus:border-input"
                  )}
                  placeholder="Enter price per night"
                />
                {errors[index]?.pricePerNight && (
                  <Paragraph className="mt-1.5 text-red-500 text-xs">
                    {errors[index]?.pricePerNight}
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
                  onChange={(e) =>
                    handleInputChange(
                      index,
                      "pricePerPax",
                      parseFloat(e.target.value)
                    )
                  }
                  className={cn(
                    "w-full bg-transparent border border-input px-3 py-2 transition-colors focus:outline-none focus:ring-0 bg-[#F1F5F7]"
                  )}
                  placeholder="Enter price per pax"
                  disabled={hotel.includedWithBasePrice}
                />
              </div>
            </div>

            {index !== 0 && (
              <Button
                type="button"
                onClick={() => handleRemoveHotel(index)}
                className="w-full sm:w-auto bg-red-500 text-white px-5 py-2 rounded-md text-sm"
              >
                Remove
              </Button>
            )}
          </div>
        ))}
        <Button
          type="button"
          onClick={handleAddHotel}
          className="w-full sm:w-auto bg-green-500 text-white px-5 py-2 rounded-md text-sm"
        >
          Add Hotel
        </Button>
      </div>
    </div>
  );
};

export default HajjHotelForm;
