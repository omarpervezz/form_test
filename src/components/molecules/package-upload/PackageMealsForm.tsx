/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  addMeal,
  toggleMealDay,
  updateMealField,
  updateMealOption,
} from "@/redux/feature/package-upload/packageUploadMealsSlice";
import { RootState } from "@/redux/redux-store/store";
import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { MealType } from "@/redux/feature/package-upload/packageUploadMealsSlice";
import Span from "@/components/atoms/Span";
import Label from "@/components/atoms/Label";
import { Input } from "@/components/atoms/Input";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/atoms/Textaria";
import {
  clearMealError,
  setMealError,
} from "@/redux/feature/package-upload/packageUploadMealsErrorsSlice";
import Paragraph from "@/components/atoms/Paragraph";
import { defaultValidationConfig, validateNumber } from "@/lib/validationUtils";
const foodTypeOptions = ["Breakfast", "Lunch", "Dinner", "Snack", "Brunch"];

const PackageMealsForm: React.FC = () => {
  const dispatch = useDispatch();
  const meals = useSelector((state: RootState) => state.packageUploadMeals);
  const days = useSelector(
    (state: RootState) => state.packageUploadDetails.days
  );
  const mealErrors = useSelector(
    (state: RootState) => state.packageUploadMealsErrors.errors
  );
  const [showDaysDropdown, setShowDaysDropdown] = useState<boolean[]>(
    meals.map(() => false)
  );
  const [showDaysSelect, setShowDaysSelect] = useState<number | null>(null);
  const daysSelectRef = useRef<(HTMLDivElement | null)[]>([]);
  const daysRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    daysRefs.current = daysRefs.current.slice(0, meals.length);
  }, [meals]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      setShowDaysDropdown((prev) => {
        let updated = false;
        const newDropdownState = prev.map((isOpen, index) => {
          if (
            isOpen &&
            daysRefs.current[index] &&
            !daysRefs.current[index]?.contains(event.target as Node)
          ) {
            updated = true;
            return false;
          }
          return isOpen;
        });

        return updated ? newDropdownState : prev;
      });
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  const validateMealField = (field: keyof MealType, value: any): string => {
    if (field === "title") {
      if (!value.trim()) return "Title is required.";
      if (value.length < 2) return "Title must be at least 2 characters.";
    }

    if (field === "details") {
      if (!value.trim()) return "Details are required.";
    }

    if (field === "pricePerPax") {
      if (Array.isArray(value)) {
        return "Invalid input format.";
      } else {
        return validateNumber(value, defaultValidationConfig);
      }
    }

    return "";
  };

  const handleInputChange = useCallback(
    (
      index: number,
      field: keyof MealType,
      e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
      let value: string | boolean | number = e.target.value;

      if (field === "includedWithBasePrice") {
        value = (e as ChangeEvent<HTMLInputElement>).target.checked;
      }

      if (field === "pricePerPax") {
        value = value === "" ? "" : value;
      }

      dispatch(updateMealField({ index, field, value }));

      const error = validateMealField(field, value);
      if (error) {
        dispatch(setMealError({ index, field, error }));
      } else {
        dispatch(clearMealError({ index, field }));
      }
    },
    [dispatch]
  );

  const toggleDropdown = (index: number) => {
    setShowDaysDropdown((prev) => {
      const newDropdownState = [...prev];
      newDropdownState[index] = !newDropdownState[index];
      return newDropdownState;
    });
  };

  const toggleDaysSelect = (index: number) => {
    setShowDaysSelect((prev) => (prev === index ? null : index));
  };

  const handleOptionSelect = (
    index: number,
    field: keyof MealType,
    value: string
  ) => {
    dispatch(updateMealOption({ index, field, value }));

    setShowDaysDropdown((prev) => {
      const newDropdownState = [...prev];
      newDropdownState[index] = false;
      return newDropdownState;
    });
  };

  const setDaysRef = (index: number) => (el: HTMLDivElement | null) => {
    if (el) daysRefs.current[index] = el;
  };

  // Add a new meal
  const handleAddMeal = () => {
    dispatch(addMeal());
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-medium mb-4">Meals</h2>
      <div className="space-y-6">
        {meals.map((meal, index) => (
          <div key={index} className="space-y-5 pb-4">
            {/* Included with Base Price */}
            <div>
              <Label
                htmlFor={`basePrice-${index}`}
                className="flex items-center"
              >
                <input
                  id={`basePrice-${index}`}
                  type="checkbox"
                  checked={meal.includedWithBasePrice}
                  onChange={(e) =>
                    handleInputChange(index, "includedWithBasePrice", e)
                  }
                />
                <Span className="ml-2 text-sm font-medium text-gray-700">
                  Included with Base Price
                </Span>
              </Label>
            </div>
            <div className="flex gap-3">
              {/* Title */}
              <div className="relative w-full">
                <div>
                  <Label
                    htmlFor={`meal-${index}-title`}
                    className={cn(
                      "text-base text-black font-medium mb-2 px-1 "
                    )}
                  >
                    Title *
                  </Label>
                  <Input
                    type="text"
                    id={`meal-${index}-title`}
                    value={meal.title}
                    onChange={(e) => handleInputChange(index, "title", e)}
                    className={cn(
                      "w-full bg-transparent border border-input px-3 py-2 transition-colors focus:outline-none focus:ring-0 bg-[#F1F5F7]",
                      mealErrors[index]?.title
                        ? "border-red-500 focus:border-red-500"
                        : "focus:border-input"
                    )}
                    placeholder="Enter meal title"
                  />
                  {mealErrors[index]?.title && (
                    <Paragraph className="mt-1.5 text-red-500 text-xs">
                      {mealErrors[index]?.title}
                    </Paragraph>
                  )}
                </div>
              </div>

              {/* Food Type Custom Select */}
              <div ref={setDaysRef(index)} className="relative w-full">
                <Label
                  htmlFor="days"
                  className={cn("text-base text-black font-medium mb-2 px-1 ")}
                >
                  Food Type *
                </Label>
                <div
                  className={cn(
                    "w-full border rounded-md h-12 bg-[#F1F5F7] px-3 flex items-center transition-colors cursor-pointer text-base text-muted-foreground",
                    mealErrors[index]?.foodType &&
                      "border-red-500 focus:border-red-500"
                  )}
                  onClick={() => toggleDropdown(index)}
                  tabIndex={0}
                >
                  {meal.foodType || "Select Food Type"}
                </div>
                <div
                  className={cn(
                    "absolute z-10 bg-white border w-full rounded-md shadow-md  transition-all duration-300 transform",
                    showDaysDropdown[index]
                      ? "opacity-100 translate-y-3"
                      : "opacity-0 translate-y-0 pointer-events-none"
                  )}
                >
                  {foodTypeOptions.map((type) => (
                    <div
                      key={type}
                      className={cn(
                        "px-2.5 py-1 hover:text-white hover:bg-blue-500 cursor-pointer"
                      )}
                      onClick={() =>
                        handleOptionSelect(index, "foodType", type)
                      }
                    >
                      {type}
                    </div>
                  ))}
                </div>
                {mealErrors[index]?.foodType && (
                  <Paragraph className="mt-1.5 text-red-500 text-xs">
                    {mealErrors[index]?.foodType}
                  </Paragraph>
                )}
              </div>
            </div>
            {/* Details */}
            <div className="relative w-full">
              <div>
                <Label
                  htmlFor={`meal-${index}-details`}
                  className={cn("text-base text-black font-medium mb-2 px-1 ")}
                >
                  Details *
                </Label>
                <Textarea
                  id={`meal-${index}-details`}
                  value={meal.details}
                  onChange={(e) => handleInputChange(index, "details", e)}
                  className={cn(
                    "w-full bg-transparent border border-input px-3 py-2 transition-colors focus:outline-none focus:ring-0 bg-[#F1F5F7]",
                    mealErrors[index]?.details
                      ? "border-red-500 focus:border-red-500"
                      : "focus:border-input"
                  )}
                  placeholder="Enter meal details"
                  rows={6}
                />
                {mealErrors[index]?.details && (
                  <Paragraph className="mt-1.5 text-red-500 text-xs">
                    {mealErrors[index]?.details}
                  </Paragraph>
                )}
              </div>
            </div>

            <div className="flex gap-3">
              <div
                className="relative w-full"
                ref={(el) => {
                  daysSelectRef.current[index] = el;
                }}
              >
                <Label
                  className={cn("text-base text-black font-medium mb-2 px-1 ")}
                >
                  Food for days
                </Label>

                {/* Toggle Dropdown */}
                <div
                  className={cn(
                    "w-full border rounded-md h-12 bg-[#F1F5F7] px-3 flex items-center transition-colors cursor-pointer text-base text-muted-foreground",
                    mealErrors[index]?.days &&
                      "border-red-500 focus:border-red-500"
                  )}
                  onClick={() => toggleDaysSelect(index)}
                >
                  {meal.days.length > 0 ? meal.days.join(", ") : "Select Days"}
                </div>

                {/* Dropdown Menu with Checkboxes */}
                <div
                  className={cn(
                    "absolute z-10 bg-white border w-full rounded-md shadow-md  transition-all duration-200 ease-in-out transform",
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
                        checked={meal.days.includes(day)}
                        onChange={() => dispatch(toggleMealDay({ index, day }))}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-2"
                      />
                      Day {day}
                    </label>
                  ))}
                </div>
                {mealErrors[index]?.days && (
                  <Paragraph className="bg-red-500 rounded-b-md px-2.5 py-2 text-white text-xs">
                    {mealErrors[index]?.days}
                  </Paragraph>
                )}
              </div>

              {/* Price per Pax Field */}
              <div className="relative w-full">
                <Label
                  htmlFor={`meal-${index}-pricePerPax`}
                  className={cn("text-base text-black font-medium mb-2 px-1 ")}
                >
                  Price per Pax
                </Label>
                <Input
                  type="text"
                  id={`meal-${index}-pricePerPax`}
                  value={meal.pricePerPax}
                  placeholder="Enter price per pax"
                  onChange={(e) => handleInputChange(index, "pricePerPax", e)}
                  className={cn(
                    "w-full bg-transparent border border-input px-3 py-2 transition-colors focus:outline-none focus:ring-0 bg-[#F1F5F7]",
                    mealErrors[index]?.pricePerPax
                      ? "border-red-500 focus:border-red-500"
                      : "focus:border-input"
                  )}
                  disabled={meal.includedWithBasePrice}
                />
                {mealErrors[index]?.pricePerPax && (
                  <Paragraph className="bg-red-500 rounded-b-md px-2.5 py-2 text-white text-xs">
                    {mealErrors[index]?.pricePerPax}
                  </Paragraph>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Add Meal Button */}
        <div>
          <button
            type="button"
            onClick={handleAddMeal}
            className="w-full sm:w-auto bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Add Meal
          </button>
        </div>
      </div>
    </div>
  );
};

export default PackageMealsForm;
