import React, { ChangeEvent, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/redux-store/store";
import { Input } from "@/components/atoms/Input";
import Label from "@/components/atoms/Label";
import { setBasicInfoDetails } from "@/redux/feature/vendor-add/vendorAddBasicInfoSlice";
import { setVendorAddErrors } from "@/redux/feature/vendor-add/vendorAddBasicInfoErrorSlice";
import Paragraph from "@/components/atoms/Paragraph";
import { cn } from "@/lib/utils";
import { defaultValidationConfig, validateNumber } from "@/lib/validationUtils";

const BasicInfo: React.FC = () => {
  const dispatch = useDispatch();
  const basicInfo = useSelector(
    (state: RootState) => state.vendorBasicInfoAddState
  );
  const errors = useSelector(
    (state: RootState) => state.vendorBasicInfoAddErrors
  );

  const validateField = useCallback(
    (field: keyof typeof basicInfo, value: string | number | string[]) => {
      let error = "";

      if (typeof value !== "string") {
        error = "Invalid input type";
        return error;
      }

      if (field === "firstName" || field === "lastName") {
        if (value.trim().length < 2) {
          error = `${
            field === "firstName" ? "First" : "Last"
          } name must be at least 2 characters long`;
        }
      }

      if (field === "email") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value.trim())) {
          error = "Invalid email address";
        }
      }

      if (field === "phone") {
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

  const handleInputChange = useCallback(
    (field: keyof typeof basicInfo, value: string | number | string[]) => {
      const newValue = value === "" ? "" : value;

      dispatch(setBasicInfoDetails({ [field]: newValue }));
      const error = validateField(field, newValue);

      dispatch(setVendorAddErrors({ [field]: error }));
    },

    [dispatch, validateField]
  );

  return (
    <div className="space-y-5">
      <div className="flex gap-3">
        <div className="relative w-full">
          <Label
            htmlFor="firstName"
            className={cn("text-base text-black font-medium mb-2 px-1 ")}
          >
            First Name *
          </Label>
          <Input
            id="firstName"
            value={basicInfo.firstName}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleInputChange("firstName", e.target.value)
            }
            className={cn(
              "w-full bg-transparent border border-input px-3 py-2 transition-colors focus:outline-none focus:ring-0 bg-[#F1F5F7]",
              errors.firstName
                ? "border-red-500 focus:border-red-500"
                : "focus:border-input"
            )}
            placeholder="Enter first name"
          />
          {errors.firstName && (
            <Paragraph className="mt-1.5 text-red-500 text-xs">
              {errors.firstName}
            </Paragraph>
          )}
        </div>
        <div className="relative w-full">
          <Label
            htmlFor="lastName"
            className={cn("text-base text-black font-medium mb-2 px-1 ")}
          >
            Last Name *
          </Label>
          <Input
            id="lastName"
            value={basicInfo.lastName}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleInputChange("lastName", e.target.value)
            }
            className={cn(
              "w-full bg-transparent border border-input px-3 py-2 transition-colors focus:outline-none focus:ring-0 bg-[#F1F5F7]",
              errors.lastName
                ? "border-red-500 focus:border-red-500"
                : "focus:border-input"
            )}
            placeholder="Enter last name"
          />
          {errors.lastName && (
            <Paragraph className="mt-1.5 text-red-500 text-xs">
              {errors.lastName}
            </Paragraph>
          )}
        </div>
      </div>
      <div className="flex gap-3">
        <div className="relative w-full">
          <Label
            htmlFor="email"
            className={cn("text-base text-black font-medium mb-2 px-1 ")}
          >
            Primary Email *
          </Label>
          <Input
            id="email"
            value={basicInfo.email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleInputChange("email", e.target.value)
            }
            className={cn(
              "w-full bg-transparent border border-input px-3 py-2 transition-colors focus:outline-none focus:ring-0 bg-[#F1F5F7]",
              errors.email
                ? "border-red-500 focus:border-red-500"
                : "focus:border-input"
            )}
            placeholder="Enter primary email"
          />
          {errors.email && (
            <Paragraph className="mt-1.5 text-red-500 text-xs">
              {errors.email}
            </Paragraph>
          )}
        </div>
        <div className="relative w-full">
          <Label
            htmlFor="phone"
            className={cn("text-base text-black font-medium mb-2 px-1 ")}
          >
            Phone Number *
          </Label>
          <Input
            id="text"
            value={basicInfo.phone}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const inputValue = e.target.value;
              handleInputChange("phone", inputValue === "" ? "" : inputValue);
            }}
            className={cn(
              "w-full bg-transparent border border-input px-3 py-2 transition-colors focus:outline-none focus:ring-0 bg-[#F1F5F7]",
              errors.phone
                ? "border-red-500 focus:border-red-500"
                : "focus:border-input"
            )}
            placeholder="Enter phone number"
          />
          {errors.phone && (
            <Paragraph className="mt-1.5 text-red-500 text-xs">
              {errors.phone}
            </Paragraph>
          )}
        </div>
      </div>
    </div>
  );
};

export default BasicInfo;
