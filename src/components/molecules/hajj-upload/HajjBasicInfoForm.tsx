import React, { ChangeEvent, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/redux-store/store";
import { Input } from "@/components/atoms/Input";
import Label from "@/components/atoms/Label";

import { updateBasicInfoField } from "@/redux/feature/hajj-upload/hajjUploadDetailsSlice";
import { cn } from "@/lib/utils";

const HajjBasicInfoForm: React.FC = () => {
  const dispatch = useDispatch();
  const basicInfo = useSelector((state: RootState) => state.hajjUploadDetails);

  const handleInputChange = useCallback(
    (field: keyof typeof basicInfo, value: string) => {
      dispatch(updateBasicInfoField({ field, value }));
    },
    [dispatch]
  );

  return (
    <div className="p-4">
      <h2 className="text-lg font-medium mb-4">Hajj</h2>
      <div className="space-y-6">
        <div className="relative w-full">
          <Label
            htmlFor="packageTitle"
            className={cn("text-base text-black font-medium mb-2 px-1 ")}
          >
            Package Title *
          </Label>
          <Input
            id="packageTitle"
            value={basicInfo.packageTitle}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleInputChange("packageTitle", e.target.value)
            }
            className="w-full bg-transparent border border-input px-3 py-2 transition-colors focus:outline-none focus:ring-0 bg-[#F1F5F7]"
            placeholder="Enter package title"
          />
        </div>
        <div className="relative w-full">
          <Label
            htmlFor="description"
            className={cn("text-base text-black font-medium mb-2 px-1 ")}
          >
            Description *
          </Label>
          <Input
            id="description"
            value={basicInfo.description}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleInputChange("description", e.target.value)
            }
            className="w-full bg-transparent border border-input px-3 py-2 transition-colors focus:outline-none focus:ring-0 bg-[#F1F5F7]"
            placeholder="Enter description"
          />
        </div>
        <div className="relative w-full">
          <Label
            htmlFor="basePrice"
            className={cn("text-base text-black font-medium mb-2 px-1 ")}
          >
            Base Price *
          </Label>
          <Input
            id="basePrice"
            value={basicInfo.basePrice}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleInputChange("basePrice", e.target.value)
            }
            className="w-full bg-transparent border border-input px-3 py-2 transition-colors focus:outline-none focus:ring-0 bg-[#F1F5F7]"
            placeholder="Enter base price"
          />
        </div>
        <div className="relative w-full">
          <Label
            htmlFor="acceptPartialPayment"
            className={cn("text-base text-black font-medium mb-2 px-1 ")}
          >
            Accept Partial Payment *
          </Label>
          <Input
            id="acceptPartialPayment"
            value={basicInfo.acceptPartialPayment}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleInputChange("acceptPartialPayment", e.target.value)
            }
            className="w-full bg-transparent border border-input px-3 py-2 transition-colors focus:outline-none focus:ring-0 bg-[#F1F5F7]"
            placeholder="Yes or No"
          />
        </div>
        <div className="relative w-full">
          <Label
            htmlFor="registrationPartialPayment"
            className={cn("text-base text-black font-medium mb-2 px-1 ")}
          >
            Registration Partial Payment *
          </Label>
          <Input
            id="registrationPartialPayment"
            value={basicInfo.registrationPartialPayment}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleInputChange("registrationPartialPayment", e.target.value)
            }
            className="w-full bg-transparent border border-input px-3 py-2 transition-colors focus:outline-none focus:ring-0 bg-[#F1F5F7]"
            placeholder="Enter registration partial payment"
          />
        </div>
      </div>
    </div>
  );
};

export default HajjBasicInfoForm;
