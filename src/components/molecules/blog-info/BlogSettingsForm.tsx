"use client";
import React, {
  ChangeEvent,
  useCallback,
  useState,
  useRef,
  useEffect,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/redux-store/store";
import { updateBlogSettingsField } from "@/redux/feature/blog-info/blogSettingsSlice";
import {
  setBlogSettingsError,
  clearBlogSettingsError,
} from "@/redux/feature/blog-info/blogSettingsErrorsSlice";
import Label from "@/components/atoms/Label";
import { cn } from "@/lib/utils";
import Switch from "@/components/atoms/Switch";
import Paragraph from "@/components/atoms/Paragraph";

const authorOptions = [
  { value: "author1", label: "Author 1" },
  { value: "author2", label: "Author 2" },
];

const dateTypeOptions = [
  { value: "dynamic", label: "Dynamic" },
  { value: "static", label: "Static" },
];

function BlogSettingsForm() {
  const dispatch = useDispatch();
  const blogSettings = useSelector((state: RootState) => state.blogSettings);
  const blogSettingsErrors = useSelector(
    (state: RootState) => state.blogSettingsErrors
  );

  const [showDateTypeDropdown, setShowDateTypeDropdown] = useState(false);
  const [showAuthorDropdown, setShowAuthorDropdown] = useState(false);
  const dateTypeRef = useRef<HTMLDivElement | null>(null);
  const authorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showDateTypeDropdown &&
        dateTypeRef.current &&
        !dateTypeRef.current.contains(event.target as Node)
      ) {
        setShowDateTypeDropdown(false);
      }
      if (
        showAuthorDropdown &&
        authorRef.current &&
        !authorRef.current.contains(event.target as Node)
      ) {
        setShowAuthorDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDateTypeDropdown, showAuthorDropdown]);

  const handleInputChange = useCallback(
    (field: keyof typeof blogSettings, value: any) => {
      dispatch(updateBlogSettingsField({ field, value }));

      const error = "";
      if (error) {
        dispatch(setBlogSettingsError({ field, error }));
      } else {
        dispatch(clearBlogSettingsError({ field }));
      }
    },
    [dispatch]
  );

  const toggleDropdown = (field: string) => {
    if (field === "dateType") {
      setShowDateTypeDropdown((prev) => !prev);
    } else if (field === "selectedAuthor") {
      setShowAuthorDropdown((prev) => !prev);
    }
  };

  const handleOptionSelect = (
    field: keyof typeof blogSettings,
    value: string
  ) => {
    handleInputChange(field, value);

    if (field === "dateType") {
      setShowDateTypeDropdown(false);
    } else if (field === "selectedAuthor") {
      setShowAuthorDropdown(false);
    }
  };

  return (
    <>
      <div className="relative w-full">
        <Label
          htmlFor="showDate"
          className={cn("text-base text-black font-medium mb-2 px-1 ")}
        >
          Show Date
        </Label>
        <Switch
          id="showDate"
          checked={blogSettings.showDate}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleInputChange("showDate", e.target.checked)
          }
          className="mb-4"
        />
      </div>

      <div ref={dateTypeRef} className="relative w-full">
        <Label
          htmlFor="dateType"
          className={cn("text-base text-black font-medium mb-2 px-1 ")}
        >
          Date Type
        </Label>
        <div
          className={cn(
            "w-full border rounded-md h-12 bg-[#F1F5F7] px-3 flex items-center transition-colors cursor-pointer text-base text-muted-foreground",
            blogSettingsErrors.dateType &&
              "border-red-500 focus:border-red-500",
            !blogSettings.showDate && "opacity-50 cursor-not-allowed"
          )}
          onClick={() => blogSettings.showDate && toggleDropdown("dateType")}
          tabIndex={0}
        >
          {dateTypeOptions.find(
            (option) => option.value === blogSettings.dateType
          )?.label || "Select Date Type"}
        </div>
        <div
          className={cn(
            "absolute z-10 bg-white border w-full rounded-md shadow-md transition-all duration-300 transform",
            showDateTypeDropdown
              ? "opacity-100 translate-y-3"
              : "opacity-0 translate-y-0 pointer-events-none"
          )}
        >
          {dateTypeOptions.map((option) => (
            <div
              key={option.value}
              className={cn(
                "px-2.5 py-1 hover:text-white hover:bg-blue-500 cursor-pointer"
              )}
              onClick={() => handleOptionSelect("dateType", option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
        {blogSettingsErrors.dateType && (
          <Paragraph className="mt-1.5 text-red-500 text-xs">
            {blogSettingsErrors.dateType}
          </Paragraph>
        )}
      </div>

      <div className="relative w-full mt-4">
        <Label
          htmlFor="showAuthor"
          className={cn("text-base text-black font-medium mb-2 px-1 ")}
        >
          Show Author
        </Label>
        <Switch
          id="showAuthor"
          checked={blogSettings.showAuthor}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleInputChange("showAuthor", e.target.checked)
          }
          className="mb-4"
        />
      </div>

      <div ref={authorRef} className="relative w-full">
        <Label
          htmlFor="selectedAuthor"
          className={cn("text-base text-black font-medium mb-2 px-1 ")}
        >
          Select Author
        </Label>
        <div
          className={cn(
            "w-full border rounded-md h-12 bg-[#F1F5F7] px-3 flex items-center transition-colors cursor-pointer text-base text-muted-foreground",
            blogSettingsErrors.selectedAuthor &&
              "border-red-500 focus:border-red-500",
            !blogSettings.showAuthor && "opacity-50 cursor-not-allowed"
          )}
          onClick={() =>
            blogSettings.showAuthor && toggleDropdown("selectedAuthor")
          }
          tabIndex={0}
        >
          {authorOptions.find(
            (option) => option.value === blogSettings.selectedAuthor
          )?.label || "Select Author"}
        </div>
        <div
          className={cn(
            "absolute z-10 bg-white border w-full rounded-md shadow-md transition-all duration-300 transform",
            showAuthorDropdown
              ? "opacity-100 translate-y-3"
              : "opacity-0 translate-y-0 pointer-events-none"
          )}
        >
          {authorOptions.map((option) => (
            <div
              key={option.value}
              className={cn(
                "px-2.5 py-1 hover:text-white hover:bg-blue-500 cursor-pointer"
              )}
              onClick={() => handleOptionSelect("selectedAuthor", option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
        {blogSettingsErrors.selectedAuthor && (
          <Paragraph className="mt-1.5 text-red-500 text-xs">
            {blogSettingsErrors.selectedAuthor}
          </Paragraph>
        )}
      </div>

      <div className="relative w-full mt-4">
        <Label
          htmlFor="showRecents"
          className={cn("text-base text-black font-medium mb-2 px-1 ")}
        >
          Show Recents
        </Label>
        <Switch
          id="showRecents"
          checked={blogSettings.showRecents}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleInputChange("showRecents", e.target.checked)
          }
          className="mb-4"
        />
      </div>

      <div className="relative w-full">
        <Label
          htmlFor="showCategories"
          className={cn("text-base text-black font-medium mb-2 px-1 ")}
        >
          Show Categories
        </Label>
        <Switch
          id="showCategories"
          checked={blogSettings.showCategories}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleInputChange("showCategories", e.target.checked)
          }
          className="mb-4"
        />
      </div>
    </>
  );
}

export default BlogSettingsForm;
