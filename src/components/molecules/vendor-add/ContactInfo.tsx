import React, { ChangeEvent, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/redux-store/store";
import { Input } from "@/components/atoms/Input";
import Label from "@/components/atoms/Label";
import Paragraph from "@/components/atoms/Paragraph";
import { Button } from "@/components/atoms/Button";
import {
  updateContactInfoField,
  addContactInfo,
  removeContactInfo,
} from "@/redux/feature/vendor-add/contactInfoSlice";
import {
  clearContactInfoError,
  setContactInfoError,
} from "@/redux/feature/vendor-add/contactInfoErrorSlice";
import { cn } from "@/lib/utils";
import { defaultValidationConfig, validateNumber } from "@/lib/validationUtils";

const ContactInfo: React.FC = () => {
  const dispatch = useDispatch();
  const contactInfo = useSelector(
    (state: RootState) => state.contactInfoState.contactInfo
  );
  const errors = useSelector(
    (state: RootState) => state.contactInfoErrors.contactInfoErrors
  );

  const validateField = useCallback(
    (field: keyof (typeof contactInfo)[0], value: string) => {
      let error = "";

      if (field === "name") {
        if (value.trim().length < 2) {
          error = "Contact person name must be at least 2 characters long";
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
    (index: number, field: keyof (typeof contactInfo)[0], value: string) => {
      const newValue = value === "" ? "" : value;

      dispatch(updateContactInfoField({ index, field, value: newValue }));
      const error = validateField(field, newValue);

      if (error) {
        dispatch(setContactInfoError({ index, field, error }));
      } else {
        dispatch(clearContactInfoError({ index, field }));
      }
    },
    [dispatch, validateField]
  );

  const handleAddContact = () => {
    dispatch(addContactInfo());
  };

  const handleRemoveContact = (index: number) => {
    dispatch(removeContactInfo(index));
  };

  return (
    <div className="space-y-5">
      {contactInfo.map((contact, index) => (
        <div key={index} className="space-y-5 border-b pb-4 last:border-b-0">
          <div className="relative w-full">
            <Label
              htmlFor={`contactName-${index}`}
              className={cn("text-base text-black font-medium mb-2 px-1 ")}
            >
              Contact Person Name *
            </Label>
            <Input
              id={`contactName-${index}`}
              value={contact.name}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleInputChange(index, "name", e.target.value)
              }
              className={cn(
                "w-full bg-transparent border border-input px-3 py-2 transition-colors focus:outline-none focus:ring-0 bg-[#F1F5F7]",
                errors[index]?.name
                  ? "border-red-500 focus:border-red-500"
                  : "focus:border-input"
              )}
              placeholder="Enter contact person name"
            />
            {errors[index]?.name && (
              <Paragraph className="mt-1.5 text-red-500 text-xs">
                {errors[index]?.name}
              </Paragraph>
            )}
          </div>
          <div className="flex gap-3">
            <div className="relative w-full">
              <Label
                htmlFor={`contactEmail-${index}`}
                className={cn("text-base text-black font-medium mb-2 px-1 ")}
              >
                Contact Email *
              </Label>
              <Input
                id={`contactEmail-${index}`}
                value={contact.email}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleInputChange(index, "email", e.target.value)
                }
                className={cn(
                  "w-full bg-transparent border border-input px-3 py-2 transition-colors focus:outline-none focus:ring-0 bg-[#F1F5F7]",
                  errors[index]?.email
                    ? "border-red-500 focus:border-red-500"
                    : "focus:border-input"
                )}
                placeholder="Enter contact email"
              />
              {errors[index]?.email && (
                <Paragraph className="mt-1.5 text-red-500 text-xs">
                  {errors[index]?.email}
                </Paragraph>
              )}
            </div>

            <div className="relative w-full">
              <Label
                htmlFor={`contactPhone-${index}`}
                className={cn("text-base text-black font-medium mb-2 px-1 ")}
              >
                Contact Phone *
              </Label>
              <Input
                id={`contactPhone-${index}`}
                value={contact.phone}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleInputChange(index, "phone", e.target.value)
                }
                className={cn(
                  "w-full bg-transparent border border-input px-3 py-2 transition-colors focus:outline-none focus:ring-0 bg-[#F1F5F7]",
                  errors[index]?.phone
                    ? "border-red-500 focus:border-red-500"
                    : "focus:border-input"
                )}
                placeholder="Enter contact phone"
              />
              {errors[index]?.phone && (
                <Paragraph className="mt-1.5 text-red-500 text-xs">
                  {errors[index]?.phone}
                </Paragraph>
              )}
            </div>
          </div>
          {index !== 0 && (
            <Button
              type="button"
              onClick={() => handleRemoveContact(index)}
              className="w-full sm:w-auto bg-red-500 text-white px-5 py-2 rounded-md text-sm"
            >
              Remove
            </Button>
          )}
        </div>
      ))}

      <Button
        type="button"
        onClick={handleAddContact}
        className="w-full sm:w-auto bg-green-500 text-white px-5 py-2 rounded-md text-sm"
      >
        Add More
      </Button>
    </div>
  );
};

export default ContactInfo;
