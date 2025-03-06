/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  ChangeEvent,
  useCallback,
  useState,
  useRef,
  useEffect,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/redux-store/store";
import { Input } from "@/components/atoms/Input";
import Label from "@/components/atoms/Label";
import Paragraph from "@/components/atoms/Paragraph";
import { updateAirportField } from "@/redux/feature/add-airport/addAirportSlice";
import {
  clearError,
  setError,
} from "@/redux/feature/add-airport/addAirportErrorsSlice";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/atoms/Textaria";

const airportTypes = ["International", "Domestic", "Private"];

const AirportBasicInfoForm: React.FC = () => {
  const dispatch = useDispatch();
  const details = useSelector((state: RootState) => state.addAirport.details);
  const errors = useSelector(
    (state: RootState) => state.addAirportErrors.errors
  );
  const [showAirportTypeDropdown, setShowAirportTypeDropdown] =
    useState<boolean>(false);
  const airportTypeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        airportTypeRef.current &&
        !airportTypeRef.current.contains(event.target as Node)
      ) {
        setShowAirportTypeDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const validateField = useCallback(
    (field: keyof typeof details, value: any): string => {
      if (!value.trim()) {
        return `${field} is required.`;
      }
      return "";
    },
    []
  );

  const handleInputChange = useCallback(
    (field: keyof typeof details, value: string) => {
      dispatch(updateAirportField({ field, value }));

      const error = validateField(field, value);
      if (error) {
        dispatch(setError({ field, error }));
      } else {
        dispatch(clearError({ field }));
      }
    },
    [dispatch, validateField]
  );

  const handleAirportTypeSelect = (value: string) => {
    handleInputChange("airportType", value);
    setShowAirportTypeDropdown(false);
  };

  return (
    <div className="space-y-6">
      <div className="relative w-full">
        <Label
          htmlFor="airportName"
          className={cn("text-base text-black font-medium mb-2 px-1 ")}
        >
          Airport Name *
        </Label>
        <Input
          id="airportName"
          value={details.airportName}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleInputChange("airportName", e.target.value)
          }
          className={cn(
            "w-full bg-transparent border border-input px-3 py-2 transition-colors focus:outline-none focus:ring-0 bg-[#F1F5F7]",
            errors.airportName
              ? "border-red-500 focus:border-red-500"
              : "focus:border-input"
          )}
          placeholder="Enter airport name"
        />
        {errors.airportName && (
          <Paragraph className="mt-1.5 text-red-500 text-xs">
            {errors.airportName}
          </Paragraph>
        )}
      </div>
      <div className="flex gap-3">
        <div className="relative w-full">
          <Label
            htmlFor="shortCode"
            className={cn("text-base text-black font-medium mb-2 px-1 ")}
          >
            Short Code *
          </Label>
          <Input
            id="shortCode"
            value={details.shortCode}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleInputChange("shortCode", e.target.value)
            }
            className={cn(
              "w-full bg-transparent border border-input px-3 py-2 transition-colors focus:outline-none focus:ring-0 bg-[#F1F5F7]",
              errors.shortCode
                ? "border-red-500 focus:border-red-500"
                : "focus:border-input"
            )}
            placeholder="Enter short code"
          />
          {errors.shortCode && (
            <Paragraph className="mt-1.5 text-red-500 text-xs">
              {errors.shortCode}
            </Paragraph>
          )}
        </div>

        <div className="relative w-full">
          <Label
            htmlFor="country"
            className={cn("text-base text-black font-medium mb-2 px-1 ")}
          >
            Country
          </Label>
          <Input
            id="country"
            value={details.country}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleInputChange("country", e.target.value)
            }
            className={cn(
              "w-full bg-transparent border border-input px-3 py-2 transition-colors focus:outline-none focus:ring-0 bg-[#F1F5F7]",
              errors.country
                ? "border-red-500 focus:border-red-500"
                : "focus:border-input"
            )}
            placeholder="Enter country"
          />
          {errors.country && (
            <Paragraph className="mt-1.5 text-red-500 text-xs">
              {errors.country}
            </Paragraph>
          )}
        </div>
      </div>
      <div className="flex gap-3">
        <div className="relative w-full">
          <Label
            htmlFor="city"
            className={cn("text-base text-black font-medium mb-2 px-1 ")}
          >
            City *
          </Label>
          <Input
            id="city"
            value={details.city}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleInputChange("city", e.target.value)
            }
            className={cn(
              "w-full bg-transparent border border-input px-3 py-2 transition-colors focus:outline-none focus:ring-0 bg-[#F1F5F7]",
              errors.city
                ? "border-red-500 focus:border-red-500"
                : "focus:border-input"
            )}
            placeholder="Enter city"
          />
          {errors.city && (
            <Paragraph className="mt-1.5 text-red-500 text-xs">
              {errors.city}
            </Paragraph>
          )}
        </div>

        <div className="relative w-full" ref={airportTypeRef}>
          <Label
            htmlFor="airportType"
            className={cn("text-base text-black font-medium mb-2 px-1 ")}
          >
            Airport Type
          </Label>
          <div
            className={cn(
              "w-full border rounded-md h-12 bg-[#F1F5F7] px-3 flex items-center transition-colors cursor-pointer text-base text-muted-foreground",
              errors.airportType && "border-red-500 focus:border-red-500"
            )}
            onClick={() => setShowAirportTypeDropdown(!showAirportTypeDropdown)}
          >
            {details.airportType || "Select airport type"}
          </div>
          <div
            className={cn(
              "absolute z-10 bg-white border w-full rounded-md shadow-md pb-1 transition-all duration-300 transform",
              showAirportTypeDropdown
                ? "opacity-100 translate-y-3"
                : "opacity-0 translate-y-0 pointer-events-none"
            )}
          >
            {airportTypes.map((type) => (
              <div
                key={type}
                className="px-2.5 py-1 cursor-pointer hover:text-white hover:bg-blue-500"
                onClick={() => handleAirportTypeSelect(type)}
              >
                {type}
              </div>
            ))}
          </div>
          {errors.airportType && (
            <Paragraph className="mt-1.5 text-red-500 text-xs">
              {errors.airportType}
            </Paragraph>
          )}
        </div>
      </div>

      <div className="relative w-full">
        <Label
          htmlFor="description"
          className={cn("text-base text-black font-medium mb-2 px-1 ")}
        >
          Description *
        </Label>
        <Textarea
          id="description"
          value={details.description}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            handleInputChange("description", e.target.value)
          }
          className={cn(
            "w-full bg-transparent border border-input px-3 py-2 transition-colors focus:outline-none focus:ring-0 bg-[#F1F5F7]",
            errors.description
              ? "border-red-500 focus:border-red-500"
              : "focus:border-input"
          )}
          placeholder="Enter description"
          rows={6}
        />
        {errors.description && (
          <Paragraph className="mt-1.5 text-red-500 text-xs">
            {errors.description}
          </Paragraph>
        )}
      </div>
    </div>
  );
};

export default AirportBasicInfoForm;
