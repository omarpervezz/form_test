"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  useState,
  useRef,
  useEffect,
  ChangeEvent,
  useCallback,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/redux-store/store";
import { Button } from "@/components/atoms/Button";
import Label from "@/components/atoms/Label";
import { Input } from "@/components/atoms/Input";
import Paragraph from "@/components/atoms/Paragraph";
import { cn } from "@/lib/utils";
import { updateCityField } from "@/redux/feature/add-city/addCitySlice";
import {
  clearCityError,
  setCityError,
} from "@/redux/feature/add-city/addCityErrorsSlice";
import CardTitle from "@/components/atoms/CardTitle";

const countryOptions = ["USA", "Canada", "UK", "Germany", "France"];

const AddCityWrapperForm: React.FC = () => {
  const dispatch = useDispatch();
  const city = useSelector((state: RootState) => state.addCity.city);
  const cityErrors = useSelector(
    (state: RootState) => state.addCityErrors.cityErrors
  );

  const [showCountryDropdown, setShowCountryDropdown] =
    useState<boolean>(false);
  const [countrySearch, setCountrySearch] = useState<string>("");

  const countryRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showCountryDropdown &&
        countryRef.current &&
        !countryRef.current.contains(event.target as Node)
      ) {
        setShowCountryDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showCountryDropdown]);

  const validateCityField = useCallback(
    (field: keyof typeof city, value: any): string => {
      if (field === "cityName" && !value.trim()) {
        return "City name is required.";
      }
      if (field === "country" && !value.trim()) {
        return "Country is required.";
      }
      return "";
    },
    []
  );

  const handleInputChange = useCallback(
    (field: keyof typeof city, value: string) => {
      dispatch(updateCityField({ field, value }));

      const error = validateCityField(field, value);
      if (error) {
        dispatch(setCityError({ field, error }));
      } else {
        dispatch(clearCityError({ field }));
      }
    },
    [dispatch, validateCityField]
  );

  const handleCountrySelect = (country: string) => {
    handleInputChange("country", country);
    setShowCountryDropdown(false);
  };

  const filteredCountries = countryOptions.filter((country) =>
    country.toLowerCase().includes(countrySearch.toLowerCase())
  );

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    Object.keys(city).forEach((field) => {
      const error = validateCityField(
        field as keyof typeof city,
        city[field as keyof typeof city]
      );
      if (error) {
        dispatch(setCityError({ field: field as keyof typeof city, error }));
      }
    });
  };

  return (
    <div className="p-1 sm:p-5 space-y-5">
      <CardTitle>Add Country</CardTitle>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* City Name */}
        <div className=" flex gap-2">
          <div className="relative w-full">
            <Label
              htmlFor="cityName"
              className={cn("text-base text-black font-medium mb-2 px-1 ")}
            >
              City Name *
            </Label>
            <Input
              id="cityName"
              value={city.cityName}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleInputChange("cityName", e.target.value)
              }
              className={cn(
                "w-full bg-transparent border border-input px-3 py-2 transition-colors focus:outline-none focus:ring-0 bg-[#F1F5F7]",
                cityErrors.cityName
                  ? "border-red-500 focus:border-red-500"
                  : "focus:border-input"
              )}
              placeholder="Enter city name"
            />
            {cityErrors.cityName && (
              <Paragraph className="mt-1.5 text-red-500 text-xs">
                {cityErrors.cityName}
              </Paragraph>
            )}
          </div>
          {/* Country */}
          <div ref={countryRef} className="relative w-full">
            <Label
              htmlFor="country"
              className={cn("text-base text-black font-medium mb-2 px-1 ")}
            >
              Select Country *
            </Label>
            <div
              className={cn(
                "w-full border rounded-md h-12 bg-[#F1F5F7] px-3 flex items-center transition-colors cursor-pointer text-base text-muted-foreground",
                cityErrors.country && "border-red-500 focus:border-red-500"
              )}
              onClick={() => setShowCountryDropdown(!showCountryDropdown)}
            >
              {city.country || "Select country"}
            </div>

            <div
              className={cn(
                "absolute z-10 bg-white border w-full rounded-md shadow-md pb-1 transition-all duration-300 transform",
                showCountryDropdown
                  ? "opacity-100 translate-y-3"
                  : "opacity-0 translate-y-0 pointer-events-none"
              )}
            >
              <Input
                type="text"
                placeholder="Search countries..."
                value={countrySearch}
                onChange={(e) => setCountrySearch(e.target.value)}
                className="w-full p-2 mb-2 border-b border-t-0 border-r-0 border-l-0 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {filteredCountries.map((country) => (
                <div
                  key={country}
                  className="px-2.5 py-1 cursor-pointer hover:text-white hover:bg-blue-500"
                  onClick={() => handleCountrySelect(country)}
                >
                  {country}
                </div>
              ))}
            </div>

            {cityErrors.country && (
              <Paragraph className="mt-1.5 text-red-500 text-xs">
                {cityErrors.country}
              </Paragraph>
            )}
          </div>
        </div>
        <div className="flex justify-end">
          <Button
            type="submit"
            className="w-full sm:w-auto bg-green-500 text-white px-5 py-2 rounded-md text-sm"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddCityWrapperForm;
