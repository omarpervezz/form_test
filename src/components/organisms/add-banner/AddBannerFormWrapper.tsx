/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, {
  useState,
  useRef,
  useEffect,
  ChangeEvent,
  useCallback,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/redux-store/store";
import { Button } from "@/components/atoms/Button";
import Label from "@/components/atoms/Label";
import { Input } from "@/components/atoms/Input";
import Paragraph from "@/components/atoms/Paragraph";
import { Textarea } from "@/components/atoms/Textaria";
import { cn } from "@/lib/utils";
import { updateBannerField } from "@/redux/feature/add-banner/addBannerSlice";
import {
  clearBannerError,
  setBannerError,
} from "@/redux/feature/add-banner/addBannerErrorsSlice";
import Image from "next/image";
import { X } from "lucide-react";
import { removeBannerMedia } from "../../../redux/feature/add-banner/addBannerSlice";

const bannerForOptions = [
  "Home Page",
  "Sidebar",
  "Footer",
  "Product Page",
  "Category Page",
  "Checkout Page",
  "Blog Page",
  "About Page",
];

const bannerPositionOptions = [
  "top",
  "bottom",
  "left",
  "right",
  "center",
  "header",
  "footer",
  "floating",
];

const AddBannerFormWrapper: React.FC = () => {
  const dispatch = useDispatch();
  const banner = useSelector((state: RootState) => state.addBanner.banner);
  const bannerErrors = useSelector(
    (state: RootState) => state.addBannerErrors.bannerErrors
  );

  const [showBannerForDropdown, setShowBannerForDropdown] =
    useState<boolean>(false);
  const [showBannerPositionDropdown, setShowBannerPositionDropdown] =
    useState<boolean>(false);
  const [bannerForSearch, setBannerForSearch] = useState<string>("");
  const [bannerPositionSearch, setBannerPositionSearch] = useState<string>("");
  const [mediaPreview, setMediaPreview] = useState<string | null>(
    banner.media ? URL.createObjectURL(banner.media) : null
  );
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const bannerForRef = useRef<HTMLDivElement | null>(null);
  const bannerPositionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showBannerForDropdown &&
        bannerForRef.current &&
        !bannerForRef.current.contains(event.target as Node)
      ) {
        setShowBannerForDropdown(false);
      }
      if (
        showBannerPositionDropdown &&
        bannerPositionRef.current &&
        !bannerPositionRef.current.contains(event.target as Node)
      ) {
        setShowBannerPositionDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showBannerForDropdown, showBannerPositionDropdown]);

  useEffect(() => {
    return () => {
      if (mediaPreview) URL.revokeObjectURL(mediaPreview);
    };
  }, [mediaPreview]);

  const validateBannerField = useCallback(
    (field: keyof typeof banner, value: any): string => {
      if (field === "bannerTitle" && !value.trim()) {
        return "Banner title is required.";
      }
      if (field === "bannerDescription" && !value.trim()) {
        return "Banner description is required.";
      }
      if (field === "media" && !value) {
        return "Media is required.";
      }
      if (field === "bannerFor" && !value.trim()) {
        return "Banner for is required.";
      }
      if (field === "bannerPosition" && !value.trim()) {
        return "Banner position is required.";
      }
      return "";
    },
    []
  );

  const handleInputChange = useCallback(
    (field: keyof typeof banner, value: string | File | null) => {
      dispatch(updateBannerField({ field, value }));

      const error = validateBannerField(field, value);
      if (error) {
        dispatch(setBannerError({ field, error }));
      } else {
        dispatch(clearBannerError({ field }));
      }
    },
    [dispatch, validateBannerField]
  );

  const handleBannerForSelect = (option: string) => {
    handleInputChange("bannerFor", option);
    setShowBannerForDropdown(false);
  };

  const handleBannerPositionSelect = (option: string) => {
    handleInputChange("bannerPosition", option);
    setShowBannerPositionDropdown(false);
  };

  const handleRemoveMedia = () => {
    dispatch(removeBannerMedia());
    setMediaPreview(null);
  };

  const handleMediaChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file.");
        return;
      }
      setUploadProgress(0);
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 100);
      setTimeout(() => {
        dispatch(updateBannerField({ field: "media", value: file }));
        setMediaPreview(URL.createObjectURL(file));
        dispatch(clearBannerError({ field: "media" }));
        clearInterval(interval);
        setUploadProgress(100);
      }, 1000);
    }
  };

  const filteredBannerForOptions = bannerForOptions.filter((option) =>
    option.toLowerCase().includes(bannerForSearch.toLowerCase())
  );

  const filteredBannerPositionOptions = bannerPositionOptions.filter((option) =>
    option.toLowerCase().includes(bannerPositionSearch.toLowerCase())
  );

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    Object.keys(banner).forEach((field) => {
      const error = validateBannerField(
        field as keyof typeof banner,
        banner[field as keyof typeof banner]
      );
      if (error) {
        dispatch(
          setBannerError({ field: field as keyof typeof banner, error })
        );
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-4 rounded-md">
      <h2 className="text-lg font-medium mb-4">Add Banner</h2>

      {/* Banner Title */}
      <div className="relative w-full">
        <Label
          htmlFor="bannerTitle"
          className={cn("text-base text-black font-medium mb-2 px-1 ")}
        >
          Banner Title *
        </Label>
        <Input
          id="bannerTitle"
          value={banner.bannerTitle}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleInputChange("bannerTitle", e.target.value)
          }
          className={`w-full bg-transparent border border-input px-3 py-2 transition-colors focus:outline-none focus:ring-0 bg-[#F1F5F7] ${
            bannerErrors.bannerTitle
              ? "border-red-500 focus:border-red-500"
              : "focus:border-input"
          }`}
          placeholder="Enter banner title"
        />
        {bannerErrors.bannerTitle && (
          <Paragraph className="mt-1.5 text-red-500 text-xs">
            {bannerErrors.bannerTitle}
          </Paragraph>
        )}
      </div>

      {/* Banner Description */}
      <div className="relative w-full">
        <Label
          htmlFor="bannerDescription"
          className={cn("text-base text-black font-medium mb-2 px-1 ")}
        >
          Banner Description *
        </Label>
        <Textarea
          id="bannerDescription"
          value={banner.bannerDescription}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            handleInputChange("bannerDescription", e.target.value)
          }
          className={`w-full bg-transparent border border-input px-3 py-2 transition-colors focus:outline-none focus:ring-0 bg-[#F1F5F7] ${
            bannerErrors.bannerDescription
              ? "border-red-500 focus:border-red-500"
              : "focus:border-input"
          }`}
          placeholder="Enter banner description"
          rows={6}
        />
        {bannerErrors.bannerDescription && (
          <Paragraph className="mt-1.5 text-red-500 text-xs">
            {bannerErrors.bannerDescription}
          </Paragraph>
        )}
      </div>

      {/* Media */}
      <div className="relative w-full">
        <div className="h-4 mb-1">
          {uploadProgress > 0 && uploadProgress < 100 && (
            <div className="w-full bg-gray-200 rounded-full h-3.5 relative transition-opacity duration-300 opacity-100">
              <div
                className="bg-blue-500 h-3.5 transition-[width] duration-300 ease-in-out rounded-full text-white text-xs flex items-center justify-center"
                style={{ width: `${uploadProgress}%` }}
              >
                {uploadProgress}%
              </div>
            </div>
          )}
        </div>
        <Label className={cn("text-base text-black font-medium mb-2 px-1 ")}>
          Media *
        </Label>
        <div
          className={cn(
            "border-2 bg-[#F1F5F7] border-dashed rounded-lg p-4 text-center w-full transition-colors h-[220px] flex items-center justify-center",
            bannerErrors.media
              ? "border-red-500 focus:border-red-500"
              : "border-gray-300 hover:border-blue-500"
          )}
        >
          <input
            type="file"
            id="media"
            className="hidden"
            onChange={handleMediaChange}
            accept="image/*"
          />
          <label
            htmlFor="media"
            className="w-full h-full cursor-pointer flex items-center justify-center"
          >
            {mediaPreview ? (
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={mediaPreview}
                  alt="Media Preview"
                  width={300}
                  height={200}
                  className="rounded-md h-full object-contain"
                />
                <Button
                  onClick={handleRemoveMedia}
                  className="absolute top-1 right-1 flex items-center justify-center bg-red-600 text-white w-7 h-7 rounded-full"
                  aria-label="Remove media"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <p className="text-gray-500">Click to upload media</p>
            )}
          </label>
        </div>

        {bannerErrors.media && (
          <Paragraph className="mt-1.5 text-red-500 text-xs">
            {bannerErrors.media}
          </Paragraph>
        )}
      </div>

      {/* Banner For */}
      <div ref={bannerForRef} className="relative w-full">
        <Label
          htmlFor="bannerFor"
          className={cn("text-base text-black font-medium mb-2 px-1 ")}
        >
          Banner For *
        </Label>
        <div
          className={cn(
            "w-full border rounded-md h-12 bg-[#F1F5F7] px-3 flex items-center transition-colors cursor-pointer text-base text-muted-foreground",
            bannerErrors.bannerFor && "border-red-500 focus:border-red-500"
          )}
          onClick={() => setShowBannerForDropdown(!showBannerForDropdown)}
        >
          {banner.bannerFor || "Select banner for"}
        </div>

        <div
          className={cn(
            "absolute z-10 bg-white border w-full rounded-md shadow-md pb-1 transition-all duration-300 transform",
            showBannerForDropdown
              ? "opacity-100 translate-y-3"
              : "opacity-0 translate-y-0 pointer-events-none"
          )}
        >
          <Input
            type="text"
            placeholder="Search banner for options..."
            value={bannerForSearch}
            onChange={(e) => setBannerForSearch(e.target.value)}
            className="w-full p-2 mb-2 border-b border-t-0 border-r-0 border-l-0 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {filteredBannerForOptions.map((option) => (
            <div
              key={option}
              className="px-2.5 py-1 cursor-pointer hover:text-white hover:bg-blue-500"
              onClick={() => handleBannerForSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>

        {bannerErrors.bannerFor && (
          <Paragraph className="mt-1.5 text-red-500 text-xs">
            {bannerErrors.bannerFor}
          </Paragraph>
        )}
      </div>

      {/* Banner Position */}
      <div ref={bannerPositionRef} className="relative w-full">
        <Label
          htmlFor="bannerPosition"
          className={cn("text-base text-black font-medium mb-2 px-1 ")}
        >
          Banner Position *
        </Label>
        <div
          className={cn(
            "w-full border rounded-md h-12 bg-[#F1F5F7] px-3 flex items-center transition-colors cursor-pointer text-base text-muted-foreground",
            bannerErrors.bannerPosition && "border-red-500 focus:border-red-500"
          )}
          onClick={() =>
            setShowBannerPositionDropdown(!showBannerPositionDropdown)
          }
        >
          {banner.bannerPosition || "Select banner position"}
        </div>

        <div
          className={cn(
            "absolute z-10 bg-white border w-full rounded-md shadow-md pb-1 transition-all duration-300 transform",
            showBannerPositionDropdown
              ? "opacity-100 translate-y-3"
              : "opacity-0 translate-y-0 pointer-events-none"
          )}
        >
          <Input
            type="text"
            placeholder="Search banner position options..."
            value={bannerPositionSearch}
            onChange={(e) => setBannerPositionSearch(e.target.value)}
            className="w-full p-2 mb-2 border-b border-t-0 border-r-0 border-l-0 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {filteredBannerPositionOptions.map((option) => (
            <div
              key={option}
              className="px-2.5 py-1 cursor-pointer hover:text-white hover:bg-blue-500"
              onClick={() => handleBannerPositionSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>

        {bannerErrors.bannerPosition && (
          <Paragraph className="mt-1.5 text-red-500 text-xs">
            {bannerErrors.bannerPosition}
          </Paragraph>
        )}
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          className="w-full sm:w-auto bg-green-500 text-white px-5 py-2 rounded-md text-sm"
        >
          Add Banner
        </Button>
      </div>
    </form>
  );
};

export default AddBannerFormWrapper;
