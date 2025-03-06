import { RootState } from "@/redux/redux-store/store";
import { setPackageUploadDetails } from "@/redux/feature/package-upload/packageUploadDetailsSlice";
import React, { ChangeEvent, useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "@/components/atoms/Input";
import Label from "@/components/atoms/Label";
import { cn } from "@/lib/utils";
import { setErrors } from "@/redux/feature/package-upload/packageUploadErrorsSlice";
import Paragraph from "@/components/atoms/Paragraph";
import { validateNumber, defaultValidationConfig } from "@/lib/validationUtils";
import useClickOutside from "@/hooks/useClickOutside";

// Dummy data for Days and Nights (1-15)
const daysOptions = Array.from({ length: 15 }, (_, i) => i + 1);
const nightsOptions = Array.from({ length: 15 }, (_, i) => i + 1);

// Dummy data for Countries and Cities
const countryOptions = ["USA", "Canada", "UK", "Australia"];
const cityOptionsByCountry: { [key: string]: string[] } = {
  USA: ["New York", "Los Angeles", "Chicago"],
  Canada: ["Toronto", "Vancouver", "Montreal"],
  UK: ["London", "Manchester", "Edinburgh"],
  Australia: ["Sydney", "Melbourne", "Brisbane"],
};

function PackageDetailsForm() {
  const dispatch = useDispatch();
  const packageUploadDetailsForm = useSelector(
    (state: RootState) => state.packageUploadDetails
  );
  const errors = useSelector((state: RootState) => state.packageUploadErrors);
  const [showDaysDropdown, setShowDaysDropdown] = useState(false);
  const [showNightsDropdown, setShowNightsDropdown] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");
  const [citySearch, setCitySearch] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const [highlightedNightsIndex, setHighlightedNightsIndex] = useState<
    number | null
  >(null);

  const daysRef = useRef<HTMLDivElement>(null);
  const nightsRef = useRef<HTMLDivElement>(null);
  const countryRef = useRef<HTMLDivElement>(null);
  const cityRef = useRef<HTMLDivElement>(null);

  // Use the custom hook to close dropdowns when clicking outside
  useClickOutside(daysRef, () => setShowDaysDropdown(false));
  useClickOutside(nightsRef, () => setShowNightsDropdown(false));
  useClickOutside(countryRef, () => setShowCountryDropdown(false));
  useClickOutside(cityRef, () => setShowCityDropdown(false));

  /**
   * Validates the input field based on the provided field type and value.
   *
   * @param {keyof typeof packageUploadDetailsForm} field - The name of the field being validated.
   * @param {string | number | string[]} value - The value entered by the user.
   * @returns {string} - Returns an error message if validation fails; otherwise, an empty string.
   */
  const validateField = useCallback(
    (
      field: keyof typeof packageUploadDetailsForm,
      value: string | number | string[]
    ) => {
      let error = "";

      if (field === "packageTitle") {
        if (typeof value !== "string" || !value.trim()) {
          error = "Package Title must be at least 2 characters.";
        }
      }

      if (field === "basePrice" || field === "discountPrice") {
        if (Array.isArray(value)) {
          error = "Invalid input format.";
        } else {
          error = validateNumber(value, defaultValidationConfig);
        }
      }

      return error;
    },
    []
  );

  /**
   * Handles user input changes for form fields.
   *
   * - Updates the Redux store with the new field value.
   * - Validates the input and updates the error state accordingly.
   *
   * @param {keyof typeof packageUploadDetailsForm} field - The name of the field being updated.
   * @param {string | number | string[]} value - The new value entered by the user.
   */
  const handleInputChange = useCallback(
    (
      field: keyof typeof packageUploadDetailsForm,
      value: string | number | string[]
    ) => {
      const newValue = value === "" ? "" : value;

      dispatch(setPackageUploadDetails({ [field]: newValue }));

      const error = validateField(field, newValue);
      dispatch(setErrors({ [field]: error }));
    },
    [dispatch, validateField]
  );

  /**
   * Handles the selection of an option from the dropdown menus.
   *
   * - Updates the selected value for "days" or "nights" in the form state.
   * - Closes the corresponding dropdown after selection.
   *
   * @param {"days" | "nights"} field - The name of the field being updated.
   * @param {number} value - The selected value from the dropdown.
   */
  const handleOptionSelect = useCallback(
    (field: "days" | "nights", value: number) => {
      // Update the form state with the selected value
      handleInputChange(field, value);

      // Close the respective dropdown after selection
      if (field === "days") setShowDaysDropdown(false);
      if (field === "nights") setShowNightsDropdown(false);
    },
    [handleInputChange]
  );

  /**
   * Handles multi-selection of values for "countries" or "cities".
   *
   * - Adds or removes the selected value from the current selection.
   * - Updates the form state with the new selection.
   * - If no countries are selected, resets the cities selection.
   *
   * @param {"countries" | "cities"} field - The field being updated.
   * @param {string} value - The selected value to be added or removed.
   * @param {string[]} currentValues - The current list of selected values.
   */
  const handleMultiSelect = useCallback(
    (field: "countries" | "cities", value: string, currentValues: string[]) => {
      // Add the selected value if not already in the list, otherwise remove it
      const updatedValues = currentValues.includes(value)
        ? currentValues.filter((item) => item !== value)
        : [...currentValues, value];

      // Update the form state with the new selection
      handleInputChange(field, updatedValues);

      // If all countries are removed, reset the cities selection
      if (field === "countries" && updatedValues.length === 0) {
        handleInputChange("cities", []);
      }
    },
    [handleInputChange]
  );

  /**
   * Retrieves the list of available cities based on the selected countries.
   *
   * - If no countries are selected, returns an empty list.
   * - Maps selected countries to their respective city options.
   * - Ensures the returned list contains only unique cities.
   *
   * @returns {string[]} - A list of unique available cities based on selected countries.
   */
  const getAvailableCities = () => {
    // Get the list of selected countries or default to an empty array
    const selectedCountries = packageUploadDetailsForm.countries || [];

    // If no countries are selected, return an empty list
    if (selectedCountries.length === 0) return [];
    // Retrieve cities for each selected country and ensure uniqueness
    return selectedCountries
      .flatMap((country) => cityOptionsByCountry[country] || [])
      .filter((city, index, self) => self.indexOf(city) === index);
  };

  /**
   * Filters the list of available countries based on the search input.
   *
   * - Converts both country names and search input to lowercase for case-insensitive matching.
   * - Returns only countries that include the search term.
   */
  const filteredCountries = countryOptions.filter((country) =>
    country.toLowerCase().includes(countrySearch.toLowerCase())
  );

  /**
   * Filters the list of available cities based on the search input.
   *
   * - Retrieves the list of cities based on selected countries.
   * - Converts both city names and search input to lowercase for case-insensitive matching.
   * - Returns only cities that include the search term.
   */
  const filteredCities = getAvailableCities().filter((city) =>
    city.toLowerCase().includes(citySearch.toLowerCase())
  );

  /**
   * Handles keyboard navigation for the dropdown.
   *
   * - `ArrowDown`: Moves selection to the next option.
   * - `ArrowUp`: Moves selection to the previous option.
   * - `Enter` or `Space`: Selects the highlighted option.
   * - `Escape`: Closes the dropdown.
   *
   * @param {React.KeyboardEvent<HTMLDivElement>} event - The keyboard event triggered by user input.
   */
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      // Exit if dropdown is not open
      if (!showDaysDropdown) return;

      if (event.key === "ArrowDown") {
        event.preventDefault();
        // Move to the next option or loop back to the first
        setHighlightedIndex((prev) =>
          prev === null || prev >= daysOptions.length - 1 ? 0 : prev + 1
        );
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        // Move to the previous option or loop back to the last
        setHighlightedIndex((prev) =>
          prev === null || prev <= 0 ? daysOptions.length - 1 : prev - 1
        );
      } else if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        // Select the highlighted option and close the dropdown
        if (highlightedIndex !== null) {
          handleOptionSelect("days", daysOptions[highlightedIndex]);
          setShowDaysDropdown(false);
        }
      } else if (event.key === "Escape") {
        // Close the dropdown
        setShowDaysDropdown(false);
      }
    },
    [showDaysDropdown, highlightedIndex, handleOptionSelect]
  );

  /**
   * Handles keyboard navigation for the Nights dropdown.
   *
   * - `ArrowDown`: Moves selection to the next option.
   * - `ArrowUp`: Moves selection to the previous option.
   * - `Enter` or `Space`: Selects the highlighted option.
   * - `Escape`: Closes the dropdown.
   *
   * @param {React.KeyboardEvent<HTMLDivElement>} event - The keyboard event triggered by user input.
   */
  const handleNightsKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      // Exit if dropdown is not open
      if (!showNightsDropdown) return;

      if (event.key === "ArrowDown") {
        event.preventDefault();
        // Move to the next option or loop back to the first
        setHighlightedNightsIndex((prev) =>
          prev === null || prev >= nightsOptions.length - 1 ? 0 : prev + 1
        );
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        // Move to the previous option or loop back to the last
        setHighlightedNightsIndex((prev) =>
          prev === null || prev <= 0 ? nightsOptions.length - 1 : prev - 1
        );
      } else if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        // Select the highlighted option and close the dropdown
        if (highlightedNightsIndex !== null) {
          handleOptionSelect("nights", nightsOptions[highlightedNightsIndex]);
          setShowNightsDropdown(false);
        }
      } else if (event.key === "Escape") {
        // Close the dropdown
        setShowNightsDropdown(false);
      }
    },
    [showNightsDropdown, highlightedNightsIndex, handleOptionSelect]
  );

  return (
    <div className="p-4">
      <h2 className="text-lg font-medium mb-4">Package Details</h2>
      <div className="space-y-6">
        {/* Package Title */}
        <div className="relative w-full">
          <Label
            htmlFor="packageTitle"
            className={cn("text-base text-black font-medium mb-2 px-1 ")}
          >
            Enter Package Title *
          </Label>
          <div>
            <Input
              id="packageTitle"
              type="text"
              name="packageTitle"
              placeholder="Enter package title"
              value={packageUploadDetailsForm.packageTitle}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleInputChange("packageTitle", e.target.value)
              }
              className={cn(
                "w-full bg-transparent border border-input px-3 py-2 transition-colors focus:outline-none focus:ring-0 bg-[#F1F5F7]",
                errors.packageTitle
                  ? "border-red-500 focus:border-red-500"
                  : "focus:border-input"
              )}
            />
            {errors.packageTitle && (
              <Paragraph className="mt-1.5 text-red-500 text-xs">
                {errors.packageTitle}
              </Paragraph>
            )}
          </div>
        </div>

        {/* Package Duration Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium mb-4">Package Duration</h2>
          <div className="flex flex-row gap-3">
            {/* Days Custom Select */}
            <div ref={daysRef} className="relative w-full">
              <Label
                htmlFor="days"
                className={cn("text-base text-black font-medium mb-2 px-1 ")}
              >
                Day *
              </Label>
              <div
                className={cn(
                  "w-full border rounded-md h-12 bg-[#F1F5F7] px-3 flex items-center transition-colors cursor-pointer text-base text-muted-foreground",
                  errors.nights && "border-red-500 focus:border-red-500"
                )}
                onClick={() => setShowDaysDropdown(!showDaysDropdown)}
                onKeyDown={handleKeyDown}
                tabIndex={0}
              >
                {packageUploadDetailsForm.days
                  ? packageUploadDetailsForm.days
                  : "Select day"}
              </div>
              <div
                className={cn(
                  "absolute z-10 bg-white border mt-1 w-full rounded-md shadow-md  transition-all duration-300 transform",
                  showDaysDropdown
                    ? "opacity-100 translate-y-3"
                    : "opacity-0 translate-y-0 pointer-events-none"
                )}
              >
                {daysOptions.map((day, index) => (
                  <div
                    key={day}
                    className={cn(
                      "px-2.5 py-1 cursor-pointer",
                      highlightedIndex === index
                        ? "text-white bg-blue-500"
                        : "hover:text-white hover:bg-blue-gradient"
                    )}
                    onClick={() => handleOptionSelect("days", day)}
                    onMouseEnter={() => setHighlightedIndex(index)}
                  >
                    {day}
                  </div>
                ))}
              </div>
              {errors.days && (
                <Paragraph className="mt-1.5 text-red-500 text-xs">
                  {errors.days}
                </Paragraph>
              )}
            </div>

            {/* Nights Custom Select */}
            <div ref={nightsRef} className="relative w-full">
              <Label
                htmlFor="days"
                className={cn("text-base text-black font-medium mb-2 px-1 ")}
              >
                Night *
              </Label>
              <div
                className={`w-full border rounded-md h-12 bg-[#F1F5F7] px-3 flex items-center cursor-pointer transition-colors text-muted-foreground ${
                  errors.nights && "border-red-500"
                }`}
                onClick={() => setShowNightsDropdown(!showNightsDropdown)}
                onKeyDown={handleNightsKeyDown}
                tabIndex={0}
              >
                {packageUploadDetailsForm.nights
                  ? packageUploadDetailsForm.nights
                  : "Select Nights"}
              </div>
              <div
                className={cn(
                  "absolute z-10 bg-white border mt-1 w-full rounded-md shadow-md  transition-all duration-300 transform",
                  showNightsDropdown
                    ? "opacity-100 translate-y-3"
                    : "opacity-0 translate-y-0 pointer-events-none"
                )}
              >
                {nightsOptions.map((night, index) => (
                  <div
                    key={night}
                    className={cn(
                      "px-2.5 py-1 cursor-pointer",
                      highlightedNightsIndex === index
                        ? "text-white bg-blue-500"
                        : "hover:text-white hover:bg-blue-gradient"
                    )}
                    onClick={() => handleOptionSelect("nights", night)}
                    onMouseEnter={() => setHighlightedNightsIndex(index)} // Highlight when hovering
                  >
                    {night}
                  </div>
                ))}
              </div>
              {errors.nights && (
                <Paragraph className="mt-1.5 text-red-500 text-xs">
                  {errors.nights}
                </Paragraph>
              )}
            </div>
          </div>
        </div>

        {/* Location Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium mb-4">Location</h2>
          <div className="flex flex-row gap-3">
            {/* Country Multi-Select */}
            <div ref={countryRef} className="relative w-full">
              <Label
                htmlFor="days"
                className={cn("text-base text-black font-medium mb-2 px-1 ")}
              >
                Country *
              </Label>
              <div
                className={`w-full border rounded-md h-12 bg-[#F1F5F7] px-3 flex items-center cursor-pointer transition-colors text-base text-muted-foreground ${
                  errors.countries && "border-red-500"
                }`}
                onClick={() => setShowCountryDropdown(!showCountryDropdown)}
              >
                {packageUploadDetailsForm.countries.length > 0
                  ? packageUploadDetailsForm.countries.join(", ")
                  : "Select countries"}
              </div>
              <div
                className={cn(
                  "absolute z-10 bg-white border pb-1 w-full rounded-md shadow-md  transition-all duration-200 ease-in-out transform",
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
                  onClick={(e) => e.stopPropagation()}
                />
                {filteredCountries.length > 0 ? (
                  filteredCountries.map((country) => (
                    <label
                      key={country}
                      className="flex items-center px-2.5 py-1.5 hover:bg-gray-100 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={packageUploadDetailsForm.countries.includes(
                          country
                        )}
                        onChange={() =>
                          handleMultiSelect(
                            "countries",
                            country,
                            packageUploadDetailsForm.countries
                          )
                        }
                        className="mr-2"
                      />
                      {country}
                    </label>
                  ))
                ) : (
                  <div className="p-1 text-gray-500">No countries found</div>
                )}
              </div>
              {errors.countries && (
                <Paragraph className="mt-1.5 text-red-500 text-xs">
                  {errors.countries}
                </Paragraph>
              )}
            </div>

            {/* City Multi-Select */}
            <div
              ref={cityRef}
              className={cn(
                "relative w-full",
                packageUploadDetailsForm.countries.length === 0
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              )}
            >
              <Label
                className={cn("text-base text-black font-medium mb-2 px-1")}
              >
                City *
              </Label>
              <div
                className={`w-full border rounded-md h-12 bg-[#F1F5F7] px-3 flex items-center transition-colors text-base text-muted-foreground ${
                  packageUploadDetailsForm.countries.length === 0
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                } ${errors.cities && "border-red-500 focus:border-red-500"}`}
                onClick={() =>
                  packageUploadDetailsForm.countries.length > 0 &&
                  setShowCityDropdown(!showCityDropdown)
                }
              >
                {packageUploadDetailsForm.cities.length > 0
                  ? packageUploadDetailsForm.cities.join(", ").slice(0, 10) +
                    (packageUploadDetailsForm.cities.join(", ").length > 10
                      ? " more..."
                      : "")
                  : "Select cities"}
              </div>
              <div
                className={cn(
                  "absolute z-10 bg-white border w-full rounded-md shadow-md pb-1 transition-all duration-300 transform",
                  showCityDropdown
                    ? "opacity-100 translate-y-3"
                    : "opacity-0 translate-y-0 pointer-events-none"
                )}
              >
                <Input
                  type="text"
                  placeholder="Search cities..."
                  value={citySearch}
                  onChange={(e) => setCitySearch(e.target.value)}
                  className="w-full p-2 mb-2 border-b border-t-0 border-r-0 border-l-0 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={(e) => e.stopPropagation()}
                />
                {filteredCities.length > 0 ? (
                  filteredCities.map((city) => (
                    <label
                      key={city}
                      className="flex items-center px-2.5 py-1.5 hover:bg-gray-100 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={packageUploadDetailsForm.cities.includes(city)}
                        onChange={() =>
                          handleMultiSelect(
                            "cities",
                            city,
                            packageUploadDetailsForm.cities
                          )
                        }
                        className="mr-2"
                      />
                      {city}
                    </label>
                  ))
                ) : (
                  <div className="p-1 text-gray-500">No cities found</div>
                )}
              </div>
              {errors.cities && (
                <Paragraph className="mt-1.5 text-red-500 text-xs">
                  {errors.cities}
                </Paragraph>
              )}
            </div>
          </div>
        </div>

        {/* Prices Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium mb-4">Prices</h2>
          <div className="flex flex-row gap-3">
            {/* Base Price */}
            <div className="relative w-full">
              <Label
                htmlFor="basePrice"
                className={cn("text-base text-black font-medium mb-2 px-1 ")}
              >
                Base Price *
              </Label>
              <Input
                id="basePrice"
                type="text"
                name="basePrice"
                placeholder="Enter base price"
                value={packageUploadDetailsForm.basePrice}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const inputValue = e.target.value;
                  handleInputChange(
                    "basePrice",
                    inputValue === "" ? "" : inputValue
                  );
                }}
                className={`w-full bg-transparent border border-input bg-[#F1F5F7] px-3 py-2 transition-colors focus:outline-none focus:ring-0 ${
                  errors.basePrice
                    ? "border-red-500 focus:border-red-500"
                    : "focus:border-input"
                }`}
              />

              {errors.basePrice && (
                <Paragraph className="mt-1.5 text-red-500 text-xs">
                  {errors.basePrice}
                </Paragraph>
              )}
            </div>

            {/* Discounted Price */}
            <div className="relative w-full">
              <Label
                htmlFor="discountedPrice"
                className={cn("text-base text-black font-medium mb-2 px-1 ")}
              >
                Discount Price *
              </Label>
              <Input
                id="discountedPrice"
                type="text"
                name="discountedPrice"
                placeholder="Enter discounted price"
                value={packageUploadDetailsForm.discountPrice}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const inputValue = e.target.value;
                  handleInputChange(
                    "discountPrice",
                    inputValue === "" ? "" : inputValue
                  );
                }}
                className={`w-full bg-transparent border border-input px-3 py-2 transition-colors focus:outline-none focus:ring-0 bg-[#F1F5F7] ${
                  errors.discountPrice
                    ? "border-red-500 focus:border-red-500"
                    : "focus:border-input"
                }`}
              />
              {errors.discountPrice && (
                <Paragraph className="mt-1.5 text-red-500 text-xs">
                  {errors.discountPrice}
                </Paragraph>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PackageDetailsForm;
