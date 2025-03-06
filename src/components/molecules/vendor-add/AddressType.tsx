import React, { ChangeEvent, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/redux-store/store";
import { Input } from "@/components/atoms/Input";
import Label from "@/components/atoms/Label";
import Paragraph from "@/components/atoms/Paragraph";
import { Button } from "@/components/atoms/Button";
import {
  updateAddress,
  addAddress,
  removeAddress,
} from "@/redux/feature/vendor-add/addressSlice";
import {
  clearAddressError,
  setAddressError,
} from "@/redux/feature/vendor-add/addressErrorSlice";
import { cn } from "@/lib/utils";

const AddressType: React.FC = () => {
  const dispatch = useDispatch();
  const addresses = useSelector(
    (state: RootState) => state.addressState.addresses
  );
  const errors = useSelector(
    (state: RootState) => state.addressErrors.addressErrors
  );

  const validateField = useCallback(
    (field: keyof (typeof addresses)[0], value: string) => {
      let error = "";

      if (field === "country" || field === "city" || field === "state") {
        if (value.trim().length < 2) {
          error = `${
            field.charAt(0).toUpperCase() + field.slice(1)
          } must be at least 2 characters long`;
        }
      }

      if (field === "postCode" && !/^\d{5}$/.test(value.trim())) {
        error = "Invalid post code";
      }

      return error;
    },
    []
  );

  const handleInputChange = useCallback(
    (index: number, field: keyof (typeof addresses)[0], value: string) => {
      const newValue = value === "" ? "" : value;

      dispatch(updateAddress({ index, field, value: newValue }));
      const error = validateField(field, newValue);

      if (error) {
        dispatch(setAddressError({ index, field, error }));
      } else {
        dispatch(clearAddressError({ index, field }));
      }
    },
    [dispatch, validateField]
  );

  const handleAddAddress = () => {
    dispatch(addAddress());
  };

  const handleRemoveAddress = (index: number) => {
    dispatch(removeAddress(index));
  };

  return (
    <div className="space-y-5">
      {addresses.map((address, index) => (
        <div key={index} className="space-y-5">
          <div className="relative w-full">
            <Label
              htmlFor={`country-${index}`}
              className={cn("text-base text-black font-medium mb-2 px-1 ")}
            >
              Country *
            </Label>
            <Input
              id={`country-${index}`}
              value={address.country}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleInputChange(index, "country", e.target.value)
              }
              className={cn(
                "w-full bg-transparent border border-input px-3 py-2 transition-colors focus:outline-none focus:ring-0 bg-[#F1F5F7]",
                errors[index]?.country
                  ? "border-red-500 focus:border-red-500"
                  : "focus:border-input"
              )}
              placeholder="Enter country"
            />
            {errors[index]?.country && (
              <Paragraph className="mt-1.5 text-red-500 text-xs">
                {errors[index]?.country}
              </Paragraph>
            )}
          </div>

          <div className="relative w-full">
            <Label
              htmlFor={`city-${index}`}
              className={cn("text-base text-black font-medium mb-2 px-1 ")}
            >
              City *
            </Label>
            <Input
              id={`city-${index}`}
              value={address.city}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleInputChange(index, "city", e.target.value)
              }
              className={cn(
                "w-full bg-transparent border border-input px-3 py-2 transition-colors focus:outline-none focus:ring-0 bg-[#F1F5F7]",
                errors[index]?.city
                  ? "border-red-500 focus:border-red-500"
                  : "focus:border-input"
              )}
              placeholder="Enter city"
            />
            {errors[index]?.city && (
              <Paragraph className="mt-1.5 text-red-500 text-xs">
                {errors[index]?.city}
              </Paragraph>
            )}
          </div>

          <div className="relative w-full">
            <Label
              htmlFor={`state-${index}`}
              className={cn("text-base text-black font-medium mb-2 px-1 ")}
            >
              State *
            </Label>
            <Input
              id={`state-${index}`}
              value={address.state}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleInputChange(index, "state", e.target.value)
              }
              className={cn(
                "w-full bg-transparent border border-input px-3 py-2 transition-colors focus:outline-none focus:ring-0 bg-[#F1F5F7]",
                errors[index]?.state
                  ? "border-red-500 focus:border-red-500"
                  : "focus:border-input"
              )}
              placeholder="Enter state"
            />
            {errors[index]?.state && (
              <Paragraph className="mt-1.5 text-red-500 text-xs">
                {errors[index]?.state}
              </Paragraph>
            )}
          </div>

          <div className="relative w-full">
            <Label
              htmlFor={`addressLine1-${index}`}
              className={cn("text-base text-black font-medium mb-2 px-1 ")}
            >
              Address Line 1 *
            </Label>
            <Input
              id={`addressLine1-${index}`}
              value={address.addressLine1}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleInputChange(index, "addressLine1", e.target.value)
              }
              className={cn(
                "w-full bg-transparent border border-input px-3 py-2 transition-colors focus:outline-none focus:ring-0 bg-[#F1F5F7]",
                errors[index]?.addressLine1
                  ? "border-red-500 focus:border-red-500"
                  : "focus:border-input"
              )}
              placeholder="Enter address line 1"
            />
            {errors[index]?.addressLine1 && (
              <Paragraph className="mt-1.5 text-red-500 text-xs">
                {errors[index]?.addressLine1}
              </Paragraph>
            )}
          </div>

          <div className="relative w-full">
            <Label
              htmlFor={`addressLine2-${index}`}
              className={cn("text-base text-black font-medium mb-2 px-1 ")}
            >
              Address Line 2 *
            </Label>
            <Input
              id={`addressLine2-${index}`}
              value={address.addressLine2}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleInputChange(index, "addressLine2", e.target.value)
              }
              className={cn(
                "w-full bg-transparent border border-input px-3 py-2 transition-colors focus:outline-none focus:ring-0 bg-[#F1F5F7]",
                errors[index]?.addressLine2
                  ? "border-red-500 focus:border-red-500"
                  : "focus:border-input"
              )}
              placeholder="Enter address line 2"
            />
            {errors[index]?.addressLine2 && (
              <Paragraph className="mt-1.5 text-red-500 text-xs">
                {errors[index]?.addressLine2}
              </Paragraph>
            )}
          </div>

          <div className="relative w-full">
            <Label
              htmlFor={`postCode-${index}`}
              className={cn("text-base text-black font-medium mb-2 px-1 ")}
            >
              Post Code *
            </Label>
            <Input
              id={`postCode-${index}`}
              value={address.postCode}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleInputChange(index, "postCode", e.target.value)
              }
              className={cn(
                "w-full bg-transparent border border-input px-3 py-2 transition-colors focus:outline-none focus:ring-0 bg-[#F1F5F7]",
                errors[index]?.postCode
                  ? "border-red-500 focus:border-red-500"
                  : "focus:border-input"
              )}
              placeholder="Enter post code"
            />
            {errors[index]?.postCode && (
              <Paragraph className="mt-1.5 text-red-500 text-xs">
                {errors[index]?.postCode}
              </Paragraph>
            )}
          </div>

          {index !== 0 && (
            <Button
              type="button"
              onClick={() => handleRemoveAddress(index)}
              className="w-full sm:w-auto bg-red-500 text-white px-5 py-2 rounded-md text-sm"
            >
              Remove
            </Button>
          )}
        </div>
      ))}

      <Button
        type="button"
        onClick={handleAddAddress}
        className="w-full sm:w-auto bg-green-500 text-white px-5 py-2 rounded-md text-sm"
      >
        Add More
      </Button>
    </div>
  );
};

export default AddressType;
