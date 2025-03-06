import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/redux-store/store";
import { Input } from "@/components/atoms/Input";
import Label from "@/components/atoms/Label";
import Paragraph from "@/components/atoms/Paragraph";
import { Button } from "@/components/atoms/Button";

import { Textarea } from "@/components/atoms/Textaria";
import {
  addMeal,
  MealType,
  removeMeal,
  toggleMealDay,
  updateMealField,
} from "@/redux/feature/hajj-upload/hajjUploadMealsSlice";
import {
  clearMealError,
  setMealError,
} from "@/redux/feature/hajj-upload/hajjUploadMealErrorsSlice";
import Span from "@/components/atoms/Span";
import { cn } from "@/lib/utils";

const daysList = Array.from({ length: 5 }, (_, i) => i + 1);

const HajjMealsForm: React.FC = () => {
  const dispatch = useDispatch();
  const meals = useSelector((state: RootState) => state.hajjUploadMeals.meals);
  const errors = useSelector(
    (state: RootState) => state.hajjUploadMealErrors.mealErrors
  );

  const [showDaysSelect, setShowDaysSelect] = useState<number | null>(null);
  const daysSelectRef = useRef<(HTMLDivElement | null)[]>([]);
  const daysRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    daysRefs.current = daysRefs.current.slice(0, meals.length);
  }, [meals]);

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

  const validateField = useCallback((field: keyof MealType, value: string) => {
    let error = "";
    if (field === "title" && !value.trim()) {
      error = "Title is required";
    }
    if (field === "details" && !value.trim()) {
      error = "Details are required";
    }
    if (field === "pricePerPax" && !value.trim()) {
      error = "Price per pax is required";
    }
    return error;
  }, []);

  const handleInputChange = useCallback(
    (index: number, field: keyof MealType, value: string | boolean) => {
      dispatch(updateMealField({ index, field, value }));
      const error = validateField(field, value.toString());
      if (error) {
        dispatch(setMealError({ index, field, error }));
      } else {
        dispatch(clearMealError({ index, field }));
      }
    },
    [dispatch, validateField]
  );

  const handleAddMeal = () => {
    dispatch(addMeal());
  };

  const handleRemoveMeal = (index: number) => {
    dispatch(removeMeal(index));
  };

  const toggleDaysSelect = (index: number) => {
    setShowDaysSelect((prev) => (prev === index ? null : index));
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-medium mb-4">Meals</h2>
      <div className="space-y-6">
        {meals.map((meal, index) => (
          <div key={index} className="space-y-5  pb-4 last:border-b-0">
            <div className="relative w-full">
              <div>
                <Label
                  htmlFor={`baseFare-${index}`}
                  className="flex items-center"
                >
                  <input
                    id={`baseFare-${index}`}
                    type="checkbox"
                    checked={meal.includedWithBasePrice}
                    onChange={(e) =>
                      handleInputChange(
                        index,
                        "includedWithBasePrice",
                        (e as ChangeEvent<HTMLInputElement>).target.checked
                      )
                    }
                  />
                  <Span className="ml-2 text-sm font-medium text-gray-700">
                    Included with Base Price
                  </Span>
                </Label>
              </div>
            </div>
            <div className="relative w-full">
              <Label
                htmlFor={`title-${index}`}
                className={cn("text-base text-black font-medium mb-2 px-1 ")}
              >
                Title *
              </Label>
              <Input
                id={`title-${index}`}
                value={meal.title}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleInputChange(index, "title", e.target.value)
                }
                className={cn(
                  "w-full bg-transparent border border-input px-3 py-2 transition-colors focus:outline-none focus:ring-0 bg-[#F1F5F7]",
                  errors[index]?.title
                    ? "border-red-500 focus:border-red-500"
                    : "focus:border-input"
                )}
                placeholder="Enter title"
              />
              {errors[index]?.title && (
                <Paragraph className="mt-1.5 text-red-500 text-xs">
                  {errors[index]?.title}
                </Paragraph>
              )}
            </div>
            <div className="flex gap-3">
              <div className="relative w-full">
                <Label
                  htmlFor={`pricePerPax-${index}`}
                  className={cn("text-base text-black font-medium mb-2 px-1 ")}
                >
                  Price per Pax
                </Label>
                <Input
                  id={`pricePerPax-${index}`}
                  value={meal.pricePerPax}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleInputChange(index, "pricePerPax", e.target.value)
                  }
                  className={cn(
                    "w-full bg-transparent border border-input px-3 py-2 transition-colors focus:outline-none focus:ring-0 bg-[#F1F5F7]",
                    errors[index]?.pricePerPax
                      ? "border-red-500 focus:border-red-500"
                      : "focus:border-input"
                  )}
                  placeholder="Enter price per pax"
                />
                {errors[index]?.pricePerPax && (
                  <Paragraph className="mt-1.5 text-red-500 text-xs">
                    {errors[index]?.pricePerPax}
                  </Paragraph>
                )}
              </div>

              {/* Days */}
              <div
                ref={(el) => {
                  daysSelectRef.current[index] = el;
                }}
                className="relative w-full"
              >
                <Label
                  htmlFor={`days-${index}`}
                  className={cn("text-base text-black font-medium mb-2 px-1 ")}
                >
                  Days *
                </Label>
                <div
                  className={cn(
                    "w-full border rounded-md h-12 bg-[#F1F5F7] px-3 flex items-center transition-colors cursor-pointer text-base text-muted-foreground",
                    errors[index]?.days && "border-red-500 focus:border-red-500"
                  )}
                  onClick={() => toggleDaysSelect(index)}
                >
                  {meal.days.length > 0 ? meal.days.join(", ") : "Select days"}
                </div>

                <div
                  className={cn(
                    "absolute z-10 bg-white border w-full rounded-md shadow-md pb-1 transition-all duration-300 transform",
                    showDaysSelect === index
                      ? "opacity-100 translate-y-3"
                      : "opacity-0 translate-y-0 pointer-events-none"
                  )}
                >
                  {daysList.map((day) => (
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
                {errors[index]?.days && (
                  <Paragraph className="mt-1.5 text-red-500 text-xs">
                    {errors[index]?.days}
                  </Paragraph>
                )}
              </div>
            </div>
            <div className="relative w-full">
              <Label
                htmlFor={`details-${index}`}
                className={cn("text-base text-black font-medium mb-2 px-1 ")}
              >
                Details *
              </Label>
              <Textarea
                id={`details-${index}`}
                value={meal.details}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  handleInputChange(index, "details", e.target.value)
                }
                className={cn(
                  "w-full bg-transparent border border-input px-3 py-2 transition-colors focus:outline-none focus:ring-0 bg-[#F1F5F7]",
                  errors[index]?.details
                    ? "border-red-500 focus:border-red-500"
                    : "focus:border-input"
                )}
                placeholder="Enter details"
                rows={6}
              />
              {errors[index]?.details && (
                <Paragraph className="mt-1.5 text-red-500 text-xs">
                  {errors[index]?.details}
                </Paragraph>
              )}
            </div>
            {index !== 0 && (
              <Button
                type="button"
                onClick={() => handleRemoveMeal(index)}
                className="w-full sm:w-auto bg-red-500 text-white px-5 py-2 rounded-md text-sm"
              >
                Remove
              </Button>
            )}
          </div>
        ))}
        <Button
          type="button"
          onClick={handleAddMeal}
          className="w-full sm:w-auto bg-green-500 text-white px-5 py-2 rounded-md text-sm"
        >
          Add Meal
        </Button>
      </div>
    </div>
  );
};

export default HajjMealsForm;
