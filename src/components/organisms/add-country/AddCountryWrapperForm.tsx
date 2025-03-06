/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
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
import { updateCountryField } from "@/redux/feature/add-country/addCountrySlice";
import {
  clearCountryError,
  setCountryError,
} from "@/redux/feature/add-country/addCountryErrorsSlice";
import CardTitle from "@/components/atoms/CardTitle";

const currencyOptions = [
  { id: "USD", name: "United States Dollar" },
  { id: "EUR", name: "Euro" },
  { id: "JPY", name: "Japanese Yen" },
  // Add more currencies as needed
];

const issdOptions = [
  { id: "A", name: "Option A" },
  { id: "B", name: "Option B" },
  { id: "C", name: "Option C" },
  // Add more ISSD options as needed
];

const languageOptions = ["English", "Spanish", "French", "German", "Chinese"];

const AddCountryWrapperForm: React.FC = () => {
  const dispatch = useDispatch();
  const country = useSelector((state: RootState) => state.addCountry.country);
  const countryErrors = useSelector(
    (state: RootState) => state.addCountryErrors.countryErrors
  );

  const [showCurrencyDropdown, setShowCurrencyDropdown] =
    useState<boolean>(false);
  const [showIssdDropdown, setShowIssdDropdown] = useState<boolean>(false);
  const [showLanguageDropdown, setShowLanguageDropdown] =
    useState<boolean>(false);
  const [currencySearch, setCurrencySearch] = useState<string>("");
  const [issdSearch, setIssdSearch] = useState<string>("");
  const [languageSearch, setLanguageSearch] = useState<string>("");

  const currencyRef = useRef<HTMLDivElement | null>(null);
  const issdRef = useRef<HTMLDivElement | null>(null);
  const languageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showCurrencyDropdown &&
        currencyRef.current &&
        !currencyRef.current.contains(event.target as Node)
      ) {
        setShowCurrencyDropdown(false);
      }
      if (
        showIssdDropdown &&
        issdRef.current &&
        !issdRef.current.contains(event.target as Node)
      ) {
        setShowIssdDropdown(false);
      }
      if (
        showLanguageDropdown &&
        languageRef.current &&
        !languageRef.current.contains(event.target as Node)
      ) {
        setShowLanguageDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showCurrencyDropdown, showIssdDropdown, showLanguageDropdown]);

  const validateCountryField = useCallback(
    (field: keyof typeof country, value: any): string => {
      if (field === "countryName" && !value.trim()) {
        return "Country name is required.";
      }
      if (field === "currency" && !value.trim()) {
        return "Currency is required.";
      }
      if (field === "issd" && !value.trim()) {
        return "ISSD is required.";
      }
      if (field === "language" && Array.isArray(value) && value.length === 0) {
        return "At least one language is required.";
      }
      return "";
    },
    []
  );

  const handleInputChange = useCallback(
    (field: keyof typeof country, value: string | string[]) => {
      dispatch(updateCountryField({ field, value }));

      const error = validateCountryField(field, value);
      if (error) {
        dispatch(setCountryError({ field, error }));
      } else {
        dispatch(clearCountryError({ field }));
      }
    },
    [dispatch, validateCountryField]
  );

  const handleCurrencySelect = (currency: string) => {
    handleInputChange("currency", currency);
    setShowCurrencyDropdown(false);
  };

  const handleIssdSelect = (issd: string) => {
    handleInputChange("issd", issd);
    setShowIssdDropdown(false);
  };

  const handleLanguageSelect = (language: string) => {
    const updatedLanguages = country.language.includes(language)
      ? country.language.filter((lang) => lang !== language)
      : [...country.language, language];
    handleInputChange("language", updatedLanguages);
  };

  const filteredCurrencies = currencyOptions.filter((currency) =>
    currency.name.toLowerCase().includes(currencySearch.toLowerCase())
  );

  const filteredIssdOptions = issdOptions.filter((issd) =>
    issd.name.toLowerCase().includes(issdSearch.toLowerCase())
  );

  const filteredLanguages = languageOptions.filter((language) =>
    language.toLowerCase().includes(languageSearch.toLowerCase())
  );

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    Object.keys(country).forEach((field) => {
      const error = validateCountryField(
        field as keyof typeof country,
        country[field as keyof typeof country]
      );
      if (error) {
        dispatch(
          setCountryError({ field: field as keyof typeof country, error })
        );
      }
    });
  };

  return (
    <div className="p-1 sm:p-5 space-y-5">
      <CardTitle>Add Country</CardTitle>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Country Name */}
        <div className="relative w-full">
          <Label
            htmlFor="countryName"
            className={cn("text-base text-black font-medium mb-2 px-1 ")}
          >
            Country Name *
          </Label>
          <Input
            id="countryName"
            value={country.countryName}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleInputChange("countryName", e.target.value)
            }
            className={cn(
              "w-full bg-transparent border border-input px-3 py-2 transition-colors focus:outline-none focus:ring-0 bg-[#F1F5F7]",
              countryErrors.countryName
                ? "border-red-500 focus:border-red-500"
                : "focus:border-input"
            )}
            placeholder="Enter country name"
          />
          {countryErrors.countryName && (
            <Paragraph className="mt-1.5 text-red-500 text-xs">
              {countryErrors.countryName}
            </Paragraph>
          )}
        </div>

        {/* Currency */}
        <div ref={currencyRef} className="relative w-full">
          <Label
            htmlFor="currency"
            className={cn("text-base text-black font-medium mb-2 px-1 ")}
          >
            Currency *
          </Label>
          <div
            className={cn(
              "w-full border rounded-md h-12 bg-[#F1F5F7] px-3 flex items-center transition-colors cursor-pointer text-base text-muted-foreground",
              countryErrors.currency && "border-red-500 focus:border-red-500"
            )}
            onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
          >
            {country.currency || "Select currency"}
          </div>

          <div
            className={cn(
              "absolute z-10 bg-white border w-full rounded-md shadow-md pb-1 transition-all duration-300 transform",
              showCurrencyDropdown
                ? "opacity-100 translate-y-3"
                : "opacity-0 translate-y-0 pointer-events-none"
            )}
          >
            <Input
              type="text"
              placeholder="Search currencies..."
              value={currencySearch}
              onChange={(e) => setCurrencySearch(e.target.value)}
              className="w-full p-2 mb-2 border-b border-t-0 border-r-0 border-l-0 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {filteredCurrencies.map((currency) => (
              <div
                key={currency.id}
                className="px-2.5 py-1 cursor-pointer hover:text-white hover:bg-blue-500"
                onClick={() => handleCurrencySelect(currency.name)}
              >
                {currency.name}
              </div>
            ))}
          </div>

          {countryErrors.currency && (
            <Paragraph className="mt-1.5 text-red-500 text-xs">
              {countryErrors.currency}
            </Paragraph>
          )}
        </div>

        {/* ISSD */}
        <div ref={issdRef} className="relative w-full">
          <Label
            htmlFor="issd"
            className={cn("text-base text-black font-medium mb-2 px-1 ")}
          >
            ISSD *
          </Label>
          <div
            className={cn(
              "w-full border rounded-md h-12 bg-[#F1F5F7] px-3 flex items-center transition-colors cursor-pointer text-base text-muted-foreground",
              countryErrors.issd && "border-red-500 focus:border-red-500"
            )}
            onClick={() => setShowIssdDropdown(!showIssdDropdown)}
          >
            {country.issd || "Select ISSD"}
          </div>

          <div
            className={cn(
              "absolute z-10 bg-white border w-full rounded-md shadow-md pb-1 transition-all duration-300 transform",
              showIssdDropdown
                ? "opacity-100 translate-y-3"
                : "opacity-0 translate-y-0 pointer-events-none"
            )}
          >
            <Input
              type="text"
              placeholder="Search ISSD options..."
              value={issdSearch}
              onChange={(e) => setIssdSearch(e.target.value)}
              className="w-full p-2 mb-2 border-b border-t-0 border-r-0 border-l-0 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {filteredIssdOptions.map((issd) => (
              <div
                key={issd.id}
                className="px-2.5 py-1 cursor-pointer hover:text-white hover:bg-blue-500"
                onClick={() => handleIssdSelect(issd.name)}
              >
                {issd.name}
              </div>
            ))}
          </div>

          {countryErrors.issd && (
            <Paragraph className="mt-1.5 text-red-500 text-xs">
              {countryErrors.issd}
            </Paragraph>
          )}
        </div>

        {/* Language */}
        <div ref={languageRef} className="relative w-full">
          <Label
            htmlFor="language"
            className={cn("text-base text-black font-medium mb-2 px-1 ")}
          >
            Language
          </Label>
          <div
            className={cn(
              "w-full border rounded-md h-12 bg-[#F1F5F7] px-3 flex items-center transition-colors cursor-pointer text-base text-muted-foreground",
              countryErrors.language && "border-red-500 focus:border-red-500"
            )}
            onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
          >
            {country.language.length > 0
              ? country.language.join(", ")
              : "Select languages"}
          </div>

          <div
            className={cn(
              "absolute z-10 bg-white border w-full rounded-md shadow-md pb-1 transition-all duration-300 transform",
              showLanguageDropdown
                ? "opacity-100 translate-y-3"
                : "opacity-0 translate-y-0 pointer-events-none"
            )}
          >
            <Input
              type="text"
              placeholder="Search languages..."
              value={languageSearch}
              onChange={(e) => setLanguageSearch(e.target.value)}
              className="w-full p-2 mb-2 border-b border-t-0 border-r-0 border-l-0 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {filteredLanguages.map((language) => (
              <label
                key={language}
                className="flex items-center px-2.5 py-1.5 cursor-pointer hover:bg-gray-100 rounded-md"
              >
                <input
                  type="checkbox"
                  checked={country.language.includes(language)}
                  onChange={() => handleLanguageSelect(language)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-2"
                />
                {language}
              </label>
            ))}
          </div>

          {countryErrors.language && (
            <Paragraph className="mt-1.5 text-red-500 text-xs">
              {countryErrors.language}
            </Paragraph>
          )}
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

export default AddCountryWrapperForm;
