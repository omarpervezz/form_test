/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  ChangeEvent,
  useCallback,
  useRef,
  useState,
  useEffect,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/redux-store/store";
import {
  addGuide,
  updateGuideField,
  toggleGuideDay,
  GuideType,
} from "@/redux/feature/package-upload/packageUploadGuideSlice";
import { Button } from "@/components/atoms/Button";
import Label from "@/components/atoms/Label";
import { Input } from "@/components/atoms/Input";
import { Textarea } from "@/components/atoms/Textaria";
import {
  clearGuideError,
  setGuideError,
} from "@/redux/feature/package-upload/packageUploadGuideErrorsSlice";
import Paragraph from "@/components/atoms/Paragraph";
import { cn } from "@/lib/utils";

const genderOptions = ["Male", "Female", "Other"];

const PackageGuideForm: React.FC = () => {
  const dispatch = useDispatch();
  const guides = useSelector((state: RootState) => state.packageUploadGuides);
  const guideErrors = useSelector(
    (state: RootState) => state.packageUploadGuideErrors.errors
  );
  const days = useSelector(
    (state: RootState) => state.packageUploadDetails.days
  );

  const [showDaysSelect, setShowDaysSelect] = useState<number | null>(null);
  const [showGenderDropdown, setShowGenderDropdown] = useState<boolean[]>(
    guides.map(() => false)
  );
  const daysSelectRef = useRef<(HTMLDivElement | null)[]>([]);
  const daysRefs = useRef<HTMLDivElement[]>([]);
  const genderRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    daysRefs.current = daysRefs.current.slice(0, guides.length);
    genderRefs.current = genderRefs.current.slice(0, guides.length);
  }, [guides]);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      setShowGenderDropdown((prev) => {
        let updated = false;
        const newDropdownState = prev.map((isOpen, index) => {
          if (
            isOpen &&
            genderRefs.current[index] &&
            !genderRefs.current[index]?.contains(event.target as Node)
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

  const validateGuideField = useCallback(
    (field: keyof GuideType, value: any): string => {
      if (field === "title") {
        if (!value.trim()) return "Title is required.";
        if (value.length < 2) return "Title must be at least 2 characters.";
      }

      if (field === "detail") {
        if (!value.trim()) return "Detail is required.";
      }

      if (field === "guideType") {
        if (!value.trim()) return "Guide type is required.";
      }

      if (field === "guideAt") {
        if (!value || value.length === 0)
          return "At least one day must be selected.";
      }

      if (field === "gender") {
        if (!value.trim()) return "Gender is required.";
      }

      if (
        field === "pricePerPax" &&
        !guides[guides.length - 1].includedWithBasePrice
      ) {
        if (!value) return "Price per pax is required.";
        if (isNaN(value)) return "Price per pax must be a number.";
      }

      return "";
    },
    [guides]
  );

  const handleInputChange = useCallback(
    (
      index: number,
      field: keyof GuideType,
      e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
      let value: string | number | number[] | boolean | null = e.target.value;

      if (field === "guideAt") {
        const target = e.target as HTMLSelectElement;
        value = Array.from(target.selectedOptions, (option) =>
          parseInt(option.value)
        );
      }

      if (field === "includedWithBasePrice") {
        value = (e as ChangeEvent<HTMLInputElement>).target.checked;
      }

      dispatch(updateGuideField({ index, field, value }));

      const error = validateGuideField(field, value);
      if (error) {
        dispatch(setGuideError({ index, field, error }));
      } else {
        dispatch(clearGuideError({ index, field }));
      }
    },
    [dispatch, validateGuideField]
  );

  const toggleDaysSelect = (index: number) => {
    setShowDaysSelect((prev) => (prev === index ? null : index));
  };

  const toggleGenderDropdown = (index: number) => {
    setShowGenderDropdown((prev) => {
      const newDropdownState = [...prev];
      newDropdownState[index] = !newDropdownState[index];
      return newDropdownState;
    });
  };

  const handleGenderSelect = (index: number, value: string) => {
    dispatch(updateGuideField({ index, field: "gender", value }));

    setShowGenderDropdown((prev) => {
      const newDropdownState = [...prev];
      newDropdownState[index] = false;
      return newDropdownState;
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Guides</h2>
      <div className="space-y-6">
        {guides.map((guide, index) => (
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
                  checked={guide.includedWithBasePrice}
                  onChange={(e) =>
                    handleInputChange(index, "includedWithBasePrice", e)
                  }
                />
                <span className="ml-2 text-sm font-medium text-gray-700">
                  Included with Base Price
                </span>
              </Label>
            </div>

            {/* Title */}
            <div className="w-full">
              <Label
                htmlFor={`guide-${index}-title`}
                className={cn("text-base text-black font-medium mb-2 px-1 ")}
              >
                Title *
              </Label>
              <Input
                type="text"
                id={`guide-${index}-title`}
                value={guide.title}
                onChange={(e) => handleInputChange(index, "title", e)}
                className={cn(
                  "w-full bg-transparent border border-input px-3 py-2 transition-colors focus:outline-none focus:ring-0 bg-[#F1F5F7]",
                  guideErrors[index]?.title
                    ? "border-red-500 focus:border-red-500"
                    : "focus:border-input"
                )}
                placeholder="Enter guide title"
              />
              {guideErrors[index]?.title && (
                <Paragraph className="mt-1.5 text-red-500 text-xs">
                  {guideErrors[index]?.title}
                </Paragraph>
              )}
            </div>

            <div className="flex gap-3">
              {/* Guide Type */}
              <div className="relative w-full">
                <Label
                  htmlFor={`guide-${index}-guideType`}
                  className={cn("text-base text-black font-medium mb-2 px-1 ")}
                >
                  Guide Type *
                </Label>
                <Input
                  type="text"
                  id={`guide-${index}-guideType`}
                  value={guide.guideType}
                  onChange={(e) => handleInputChange(index, "guideType", e)}
                  className={cn(
                    "w-full bg-transparent border border-input px-3 py-2 transition-colors focus:outline-none focus:ring-0 bg-[#F1F5F7]",
                    guideErrors[index]?.guideType
                      ? "border-red-500 focus:border-red-500"
                      : "focus:border-input"
                  )}
                  placeholder="Enter guide type"
                />
                {guideErrors[index]?.guideType && (
                  <Paragraph className="mt-1.5 text-red-500 text-xs">
                    {guideErrors[index]?.guideType}
                  </Paragraph>
                )}
              </div>

              {/* Guide At */}
              <div
                className="relative w-full"
                ref={(el) => {
                  daysSelectRef.current[index] = el;
                }}
              >
                <Label
                  htmlFor={`guide-${index}-guideAt`}
                  className={cn("text-base text-black font-medium mb-2 px-1 ")}
                >
                  Guide At *
                </Label>
                <div
                  className={cn(
                    "w-full border rounded-md h-12 bg-[#F1F5F7] px-3 flex items-center transition-colors cursor-pointer text-base text-muted-foreground",
                    guideErrors[index]?.guideAt &&
                      "border-red-500 focus:border-red-500"
                  )}
                  onClick={() => toggleDaysSelect(index)}
                >
                  {guide.guideAt.length > 0
                    ? guide.guideAt.join(", ")
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
                        checked={guide.guideAt.includes(day)}
                        onChange={() =>
                          dispatch(toggleGuideDay({ index, day }))
                        }
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-2"
                      />
                      Day {day}
                    </label>
                  ))}
                </div>
                {guideErrors[index]?.guideAt && (
                  <Paragraph className="mt-1.5 text-red-500 text-xs">
                    {guideErrors[index]?.guideAt}
                  </Paragraph>
                )}
              </div>
            </div>

            <div className="flex gap-3">
              {/* Gender */}
              <div
                className="relative w-full"
                ref={(el) => {
                  genderRefs.current[index] = el;
                }}
              >
                <Label
                  htmlFor={`guide-${index}-gender`}
                  className={cn("text-base text-black font-medium mb-2 px-1 ")}
                >
                  Gender *
                </Label>
                <div
                  className={cn(
                    "w-full border rounded-md h-12 bg-[#F1F5F7] px-3 flex items-center transition-colors cursor-pointer text-base text-muted-foreground",
                    guideErrors[index]?.gender &&
                      "border-red-500 focus:border-red-500"
                  )}
                  onClick={() => toggleGenderDropdown(index)}
                  tabIndex={0}
                >
                  {guide.gender || "Select Gender"}
                </div>
                <div
                  className={cn(
                    "absolute z-10 bg-white border w-full rounded-md shadow-md transition-all duration-300 transform",
                    showGenderDropdown[index]
                      ? "opacity-100 translate-y-3"
                      : "opacity-0 translate-y-0 pointer-events-none"
                  )}
                >
                  {genderOptions.map((gender) => (
                    <div
                      key={gender}
                      className={cn(
                        "px-2.5 py-1 hover:text-white hover:bg-blue-500 cursor-pointer"
                      )}
                      onClick={() => handleGenderSelect(index, gender)}
                    >
                      {gender}
                    </div>
                  ))}
                </div>
                {guideErrors[index]?.gender && (
                  <Paragraph className="mt-1.5 text-red-500 text-xs">
                    {guideErrors[index]?.gender}
                  </Paragraph>
                )}
              </div>

              {/* Price per Pax */}
              <div className="relative w-full">
                <Label
                  htmlFor={`guide-${index}-pricePerPax`}
                  className={cn("text-base text-black font-medium mb-2 px-1 ")}
                >
                  Price per Pax
                </Label>
                <Input
                  type="number"
                  id={`guide-${index}-pricePerPax`}
                  value={guide.pricePerPax ?? ""}
                  onChange={(e) => handleInputChange(index, "pricePerPax", e)}
                  className={cn(
                    "w-full bg-transparent border border-input px-3 py-2 transition-colors focus:outline-none focus:ring-0 bg-[#F1F5F7]",
                    guideErrors[index]?.pricePerPax
                      ? "border-red-500 focus:border-red-500"
                      : "focus:border-input"
                  )}
                  placeholder="Enter price per pax"
                  disabled={guide.includedWithBasePrice}
                />
                {guideErrors[index]?.pricePerPax && (
                  <Paragraph className="mt-1.5 text-red-500 text-xs">
                    {guideErrors[index]?.pricePerPax}
                  </Paragraph>
                )}
              </div>
            </div>
            {/* Detail */}
            <div className="relative w-full">
              <Label
                htmlFor={`guide-${index}-detail`}
                className={cn("text-base text-black font-medium mb-2 px-1 ")}
              >
                Detail
              </Label>
              <Textarea
                id={`guide-${index}-detail`}
                value={guide.detail}
                onChange={(e) => handleInputChange(index, "detail", e)}
                className={cn(
                  "w-full bg-transparent border border-input px-3 py-2 transition-colors focus:outline-none focus:ring-0 bg-[#F1F5F7]",
                  guideErrors[index]?.detail
                    ? "border-red-500 focus:border-red-500"
                    : "focus:border-input"
                )}
                placeholder="Enter guide detail"
                rows={6}
              />
              {guideErrors[index]?.detail && (
                <Paragraph className="mt-1.5 text-red-500 text-xs">
                  {guideErrors[index]?.detail}
                </Paragraph>
              )}
            </div>
          </div>
        ))}

        {/* Add Guide Button */}
        <Button
          type="button"
          onClick={() => dispatch(addGuide())}
          className="w-full sm:w-auto bg-green-500 text-white px-5 py-2 rounded-md text-sm"
        >
          Add Guide
        </Button>
      </div>
    </div>
  );
};

export default PackageGuideForm;
