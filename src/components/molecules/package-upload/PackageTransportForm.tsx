/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/redux-store/store";
import {
  addTransport,
  toggleTransportDay,
  updateTransportField,
} from "@/redux/feature/package-upload/packageUploadTransportSlice";
import { TransportType } from "@/redux/feature/package-upload/packageUploadTransportSlice";
import { Button } from "@/components/atoms/Button";
import Label from "@/components/atoms/Label";
import { Input } from "@/components/atoms/Input";
import { Textarea } from "@/components/atoms/Textaria";
import {
  clearTransportError,
  setTransportError,
} from "@/redux/feature/package-upload/packageUploadTransportErrorsSlice";
import Paragraph from "@/components/atoms/Paragraph";
import { cn } from "@/lib/utils";

const PackageTransportForm: React.FC = () => {
  const dispatch = useDispatch();
  const transports = useSelector(
    (state: RootState) => state.packageUploadTransport
  );
  const transportErrors = useSelector(
    (state: RootState) => state.packageUploadTransportErrors.errors
  );

  const days = useSelector(
    (state: RootState) => state.packageUploadDetails.days
  );

  const [showDaysSelect, setShowDaysSelect] = useState<number | null>(null);
  const daysSelectRef = useRef<(HTMLDivElement | null)[]>([]);
  const daysRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    daysRefs.current = daysRefs.current.slice(0, transports.length);
  }, [transports]);

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

  const validateTransportField = (
    field: keyof TransportType,
    value: any
  ): string => {
    if (field === "title") {
      if (!value.trim()) return "Title is required.";
      if (value.length < 2) return "Title must be at least 2 characters.";
    }

    if (field === "detail") {
      if (!value.trim()) return "Detail is required.";
    }

    if (field === "from") {
      if (!value.trim()) return "Departure location is required.";
    }

    if (field === "to") {
      if (!value.trim()) return "Destination is required.";
    }

    if (field === "vehicleType") {
      if (!value.trim()) return "Vehicle type is required.";
    }

    if (field === "carryType") {
      if (!value.trim()) return "Carry type is required.";
    }

    if (field === "pricePerPax") {
      if (!value) return "Price per pax is required.";
      if (isNaN(value)) return "Price per pax must be a number.";
    }

    return "";
  };

  const handleInputChange = useCallback(
    (
      index: number,
      field: keyof TransportType,
      e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
      let value: string | boolean | number = e.target.value;

      if (field === "includedWithBasePrice") {
        value = (e as ChangeEvent<HTMLInputElement>).target.checked;
      }

      dispatch(updateTransportField({ index, field, value }));

      const error = validateTransportField(field, value);
      if (error) {
        dispatch(setTransportError({ index, field, error }));
      } else {
        dispatch(clearTransportError({ index, field }));
      }
    },
    [dispatch]
  );
  const toggleDaysSelect = (index: number) => {
    setShowDaysSelect((prev) => (prev === index ? null : index));
  };
  return (
    <div className="p-4">
      <h2 className="text-lg font-medium mb-4">Transport</h2>
      <div className="space-y-6">
        {transports.map((transport, index) => (
          <div key={index} className="space-y-5  pb-4">
            {/* Included with Base Price */}
            <div>
              <Label
                htmlFor={`basePrice-${index}`}
                className="flex transports-center"
              >
                <input
                  id={`basePrice-${index}`}
                  type="checkbox"
                  checked={transport.includedWithBasePrice}
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
            <div className="relative w-full">
              <Label
                htmlFor={`transport-${index}-title`}
                className={cn("text-base text-black font-medium mb-2 px-1 ")}
              >
                Title *
              </Label>
              <Input
                type="text"
                id={`transport-${index}-title`}
                value={transport.title}
                onChange={(e) => handleInputChange(index, "title", e)}
                className={cn(
                  "w-full bg-transparent border border-input px-3 py-2 transition-colors focus:outline-none focus:ring-0 bg-[#F1F5F7]",
                  transportErrors[index]?.title
                    ? "border-red-500 focus:border-red-500"
                    : "focus:border-input"
                )}
                placeholder="Enter transport title"
              />
              {transportErrors[index]?.title && (
                <Paragraph className="mt-1.5 text-red-500 text-xs">
                  {transportErrors[index]?.title}
                </Paragraph>
              )}
            </div>

            <div className="flex gap-3">
              {/* From */}
              <div className="relative w-full">
                <Label
                  htmlFor={`transport-${index}-from`}
                  className={cn("text-base text-black font-medium mb-2 px-1 ")}
                >
                  From *
                </Label>
                <Input
                  type="text"
                  id={`transport-${index}-from`}
                  value={transport.from}
                  onChange={(e) => handleInputChange(index, "from", e)}
                  className={cn(
                    "w-full bg-transparent border border-input px-3 py-2 transition-colors focus:outline-none focus:ring-0 bg-[#F1F5F7]",
                    transportErrors[index]?.from
                      ? "border-red-500 focus:border-red-500"
                      : "focus:border-input"
                  )}
                  placeholder="Enter departure location"
                />
                {transportErrors[index]?.from && (
                  <Paragraph className="mt-1.5 text-red-500 text-xs">
                    {transportErrors[index]?.from}
                  </Paragraph>
                )}
              </div>

              {/* To */}
              <div className="relative w-full">
                <Label
                  htmlFor={`transport-${index}-to`}
                  className={cn("text-base text-black font-medium mb-2 px-1 ")}
                >
                  To
                </Label>
                <Input
                  type="text"
                  id={`transport-${index}-to`}
                  value={transport.to}
                  onChange={(e) => handleInputChange(index, "to", e)}
                  className={cn(
                    "w-full bg-transparent border border-input px-3 py-2 transition-colors focus:outline-none focus:ring-0 bg-[#F1F5F7]",
                    transportErrors[index]?.to
                      ? "border-red-500 focus:border-red-500"
                      : "focus:border-input"
                  )}
                  placeholder="Enter destination"
                />
                {transportErrors[index]?.to && (
                  <Paragraph className="mt-1.5 text-red-500 text-xs">
                    {transportErrors[index]?.to}
                  </Paragraph>
                )}
              </div>
            </div>

            <div className="flex gap-3">
              {/* Vehicle Type */}
              <div className="relative w-full">
                <Label
                  htmlFor={`transport-${index}-vehicleType`}
                  className={cn("text-base text-black font-medium mb-2 px-1 ")}
                >
                  Vehicle Type *
                </Label>
                <Input
                  type="text"
                  id={`transport-${index}-vehicleType`}
                  value={transport.vehicleType}
                  onChange={(e) => handleInputChange(index, "vehicleType", e)}
                  className={cn(
                    "w-full bg-transparent border border-input px-3 py-2 transition-colors focus:outline-none focus:ring-0 bg-[#F1F5F7]",
                    transportErrors[index]?.vehicleType
                      ? "border-red-500 focus:border-red-500"
                      : "focus:border-input"
                  )}
                  placeholder="Enter vehicle type"
                />
                {transportErrors[index]?.vehicleType && (
                  <Paragraph className="mt-1.5 text-red-500 text-xs">
                    {transportErrors[index]?.vehicleType}
                  </Paragraph>
                )}
              </div>

              {/* Carry Type */}
              <div className="relative w-full">
                <Label
                  htmlFor={`transport-${index}-carryType`}
                  className={cn("text-base text-black font-medium mb-2 px-1 ")}
                >
                  Carry Type *
                </Label>
                <Input
                  type="text"
                  id={`transport-${index}-carryType`}
                  value={transport.carryType}
                  onChange={(e) => handleInputChange(index, "carryType", e)}
                  className={cn(
                    "w-full bg-transparent border border-input px-3 py-2 transition-colors focus:outline-none focus:ring-0 bg-[#F1F5F7]",
                    transportErrors[index]?.carryType
                      ? "border-red-500 focus:border-red-500"
                      : "focus:border-input"
                  )}
                  placeholder="Enter carry type"
                />
                {transportErrors[index]?.carryType && (
                  <Paragraph className="mt-1.5 text-red-500 text-xs">
                    {transportErrors[index]?.carryType}
                  </Paragraph>
                )}
              </div>
            </div>

            <div className="flex gap-3">
              {/* Price per Pax */}
              <div className="relative w-full">
                <Label
                  htmlFor={`transport-${index}-pricePerPax`}
                  className={cn("text-base text-black font-medium mb-2 px-1 ")}
                >
                  Price per Pax
                </Label>
                <Input
                  type="number"
                  id={`transport-${index}-pricePerPax`}
                  value={transport.pricePerPax}
                  onChange={(e) => handleInputChange(index, "pricePerPax", e)}
                  className={cn(
                    "w-full bg-transparent border border-input px-3 py-2 transition-colors focus:outline-none focus:ring-0 bg-[#F1F5F7]",
                    transportErrors[index]?.pricePerPax
                      ? "border-red-500 focus:border-red-500"
                      : "focus:border-input"
                  )}
                  placeholder="Enter price per pax"
                  disabled={transport.includedWithBasePrice}
                />
                {transportErrors[index]?.pricePerPax && (
                  <Paragraph className="mt-1.5 text-red-500 text-xs">
                    {transportErrors[index]?.pricePerPax}
                  </Paragraph>
                )}
              </div>

              {/* Days */}
              <div
                className="relative w-full"
                ref={(el) => {
                  daysSelectRef.current[index] = el;
                }}
              >
                <Label
                  htmlFor={`transport-${index}-days`}
                  className={cn("text-base text-black font-medium mb-2 px-1 ")}
                >
                  Transport Days *
                </Label>
                <div
                  className={cn(
                    "w-full border rounded-md h-12 bg-[#F1F5F7] px-3 flex items-center transition-colors cursor-pointer text-base text-muted-foreground",
                    transportErrors[index]?.days &&
                      "border-red-500 focus:border-red-500"
                  )}
                  onClick={() => toggleDaysSelect(index)}
                >
                  {transport.days.length > 0
                    ? transport.days.join(", ")
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
                        checked={transport.days.includes(day)}
                        onChange={() =>
                          dispatch(toggleTransportDay({ index, day }))
                        }
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-2"
                      />
                      Day {day}
                    </label>
                  ))}
                </div>
                {transportErrors[index]?.days && (
                  <Paragraph className="mt-1.5 text-red-500 text-xs">
                    {transportErrors[index]?.days}
                  </Paragraph>
                )}
              </div>
            </div>
            {/* Detail */}
            <div className="relative w-full">
              <Label
                htmlFor={`transport-${index}-detail`}
                className={cn("text-base text-black font-medium mb-2 px-1 ")}
              >
                Detail *
              </Label>
              <Textarea
                id={`transport-${index}-detail`}
                value={transport.detail}
                onChange={(e) => handleInputChange(index, "detail", e)}
                className={cn(
                  "w-full bg-transparent border border-input px-3 py-2 transition-colors focus:outline-none focus:ring-0 bg-[#F1F5F7]",
                  transportErrors[index]?.detail
                    ? "border-red-500 focus:border-red-500"
                    : "focus:border-input"
                )}
                placeholder="Enter transport detail"
                rows={6}
              />
              {transportErrors[index]?.detail && (
                <Paragraph className="mt-1.5 text-red-500 text-xs">
                  {transportErrors[index]?.detail}
                </Paragraph>
              )}
            </div>
          </div>
        ))}

        {/* Add Transport Button */}
        <Button
          type="button"
          onClick={() => dispatch(addTransport())}
          className="w-full sm:w-auto bg-green-500 text-white px-5 py-2 rounded-md text-sm"
        >
          Add Transport
        </Button>
      </div>
    </div>
  );
};

export default PackageTransportForm;
