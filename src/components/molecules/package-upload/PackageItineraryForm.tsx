import React, { ChangeEvent, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/redux-store/store";
import {
  addDay,
  updateDay,
} from "@/redux/feature/package-upload/packageUploadItinerarySlice";
import { Button } from "@/components/atoms/Button";
import Label from "@/components/atoms/Label";
import { cn } from "@/lib/utils";
import { Input } from "@/components/atoms/Input";
import { Textarea } from "@/components/atoms/Textaria";
import { setErrors } from "@/redux/feature/package-upload/packageUploadErrorsSlice";
import Paragraph from "@/components/atoms/Paragraph";

const PackageItineraryForm: React.FC = () => {
  const dispatch = useDispatch();
  const days = useSelector(
    (state: RootState) => state.packageUploadItinerary.days
  );
  const errors = useSelector((state: RootState) => state.packageUploadErrors);

  const validateField = useCallback(
    (index: number, field: "title" | "activity", value: string) => {
      let error = "";
      if (field === "title") {
        if (!value.trim()) {
          error = "Title is required";
        }
      } else if (field === "activity") {
        if (!value.trim()) {
          error = "Activity is required";
        }
      }
      return error;
    },
    []
  ); // Handle input changes for a specific day

  const handleInputChange = (
    index: number,
    field: "title" | "activity",
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    dispatch(updateDay({ index, field, value }));

    const error = validateField(index, field, value);
    dispatch(setErrors({ [`days[${index}].${field}`]: error }));
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-medium mb-4">Itinerary</h2>
      <div className="space-y-3">
        {days.map((day, index) => (
          <div key={index} className="space-y-6 pb-4">
            {/* Day Title */}
            <div className="relative w-full">
              <div>
                <Label
                  htmlFor={`day-${index}-title`}
                  className={cn("text-base text-black font-medium mb-2 px-1 ")}
                >
                  Package Title *
                </Label>
                <Input
                  type="text"
                  id={`day-${index}-title`}
                  value={day.title}
                  onChange={(e) => handleInputChange(index, "title", e)}
                  className={cn(
                    "w-full bg-transparent border border-input px-3 py-2 transition-colors focus:outline-none focus:ring-0 bg-[#F1F5F7]",
                    errors?.[`days[${index}].title`]
                      ? "border-red-500 focus:border-red-500"
                      : "focus:border-input"
                  )}
                  placeholder={`Enter title for Day ${index + 1}`}
                />
                {errors?.[`days[${index}].title`] && (
                  <Paragraph className="mt-1.5 text-red-500 text-xs">
                    {errors?.[`days[${index}].title`]}
                  </Paragraph>
                )}
              </div>
            </div>
            {/* Day Activity */}

            <div className="relative w-full">
              <div>
                <Label
                  htmlFor={`day-${index}-activity`}
                  className={cn("text-base text-black font-medium mb-2 px-1 ")}
                >
                  Day {index + 1} Activity *
                </Label>
                <Textarea
                  id={`day-${index}-activity`}
                  value={day.activity}
                  onChange={(e) => handleInputChange(index, "activity", e)}
                  className={cn(
                    "w-full bg-transparent border border-input px-3 py-2 transition-colors focus:outline-none focus:ring-0 bg-[#F1F5F7]",
                    errors?.[`days[${index}].activity`]
                      ? "border-red-500 focus:border-red-500"
                      : "focus:border-input"
                  )}
                  placeholder={`Enter activity description for Day ${
                    index + 1
                  }`}
                  rows={6}
                />
                {errors?.[`days[${index}].activity`] && (
                  <Paragraph className="mt-1.5 text-red-500 text-xs">
                    {errors?.[`days[${index}].activity`]}
                  </Paragraph>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Add Day Button */}
        <div>
          <Button
            type="button"
            onClick={() => dispatch(addDay())}
            className="w-full sm:w-auto bg-green-500 text-white px-5 py-2 rounded-md text-sm"
          >
            Add Day
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PackageItineraryForm;
