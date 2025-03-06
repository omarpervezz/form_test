/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
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
  updateBlogInfoField,
  removeThumbnailImage,
  addSecondaryKeyword,
  removeSecondaryKeyword,
} from "@/redux/feature/blog-info/blogInfoSlice";
import {
  setBlogInfoError,
  clearBlogInfoError,
} from "@/redux/feature/blog-info/blogInfoErrorsSlice";
import Label from "@/components/atoms/Label";
import { Input } from "@/components/atoms/Input";
import Paragraph from "@/components/atoms/Paragraph";
import { Textarea } from "@/components/atoms/Textaria";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "@/components/atoms/Button";
import { X } from "lucide-react";

const categoryOptions = ["Technology", "Health", "Finance", "Travel"];
const subCategoryOptions = [
  "Web Development",
  "Nutrition",
  "Investment",
  "Tourism",
];

function BlogInfoForm() {
  const dispatch = useDispatch();
  const blogInfo = useSelector((state: RootState) => state.blogInfo);
  const blogInfoErrors = useSelector(
    (state: RootState) => state.blogInfoErrors
  );
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showSubCategoryDropdown, setShowSubCategoryDropdown] = useState(false);
  const [categorySearch, setCategorySearch] = useState("");
  const [subCategorySearch, setSubCategorySearch] = useState("");
  const [mediaPreview, setMediaPreview] = useState<string | null>(
    blogInfo.thumbnailImage
      ? URL.createObjectURL(blogInfo.thumbnailImage)
      : null
  );
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [newKeyword, setNewKeyword] = useState<string>("");
  const categoryRef = useRef<HTMLDivElement | null>(null);
  const subCategoryRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showCategoryDropdown &&
        categoryRef.current &&
        !categoryRef.current.contains(event.target as Node)
      ) {
        setShowCategoryDropdown(false);
      }
      if (
        showSubCategoryDropdown &&
        subCategoryRef.current &&
        !subCategoryRef.current.contains(event.target as Node)
      ) {
        setShowSubCategoryDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showCategoryDropdown, showSubCategoryDropdown]);

  useEffect(() => {
    return () => {
      if (mediaPreview) URL.revokeObjectURL(mediaPreview);
    };
  }, [mediaPreview]);

  const validateBlogInfoField = useCallback(
    (field: keyof typeof blogInfo, value: any): string => {
      if (field === "blogTitle" && !value.trim())
        return "Blog title is required.";
      if (field === "category" && !value.trim()) return "Category is required.";
      if (field === "subCategory" && !value.trim())
        return "Sub category is required.";
      if (field === "metaTitle" && !value.trim())
        return "Meta title is required.";
      if (field === "shortDescription" && !value.trim())
        return "Short description is required.";
      if (field === "metaDescription" && !value.trim())
        return "Meta description is required.";
      if (field === "primaryKeyword" && !value.trim())
        return "Primary keyword is required.";
      if (field === "thumbnailImage" && !value)
        return "Thumbnail image is required.";
      if (field === "imageAlt" && !value.trim())
        return "Image alt text is required.";
      return "";
    },
    []
  );

  const handleInputChange = useCallback(
    (field: keyof typeof blogInfo, value: any) => {
      dispatch(updateBlogInfoField({ field, value }));

      const error = validateBlogInfoField(field, value);
      if (error) {
        dispatch(setBlogInfoError({ field, error }));
      } else {
        dispatch(clearBlogInfoError({ field }));
      }
    },
    [dispatch, validateBlogInfoField]
  );

  const handleCategorySelect = (option: string) => {
    handleInputChange("category", option);
    setShowCategoryDropdown(false);
  };

  const handleSubCategorySelect = (option: string) => {
    handleInputChange("subCategory", option);
    setShowSubCategoryDropdown(false);
  };

  const handleRemoveThumbnailImage = () => {
    dispatch(removeThumbnailImage());
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
        dispatch(updateBlogInfoField({ field: "thumbnailImage", value: file }));
        setMediaPreview(URL.createObjectURL(file));
        dispatch(clearBlogInfoError({ field: "thumbnailImage" }));
        clearInterval(interval);
        setUploadProgress(100);
      }, 1000);
    }
  };

  const handleAddSecondaryKeyword = () => {
    if (!newKeyword.trim()) return;

    if (blogInfo?.secondaryKeywords?.length >= 4) {
      alert("Maximum keyword limit reached");
      return;
    }

    dispatch(addSecondaryKeyword(newKeyword));
    setNewKeyword("");
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (!newKeyword.trim()) return;

      if (blogInfo?.secondaryKeywords?.length >= 10) {
        alert("Maximum keyword limit reached");
        return;
      }

      dispatch(addSecondaryKeyword(newKeyword));
      setNewKeyword("");
    }
  };

  const handleRemoveSecondaryKeyword = (index: number) => {
    dispatch(removeSecondaryKeyword(index));
  };

  return (
    <>
      <div className="relative w-full">
        <Label
          htmlFor="blogTitle"
          className={cn("text-base text-black font-medium mb-2 px-1 ")}
        >
          Blog Title *
        </Label>
        <Input
          id="blogTitle"
          value={blogInfo.blogTitle}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleInputChange("blogTitle", e.target.value)
          }
          className={`w-full bg-transparent border border-input px-3 py-2 transition-colors focus:outline-none focus:ring-0 bg-[#F1F5F7] ${
            blogInfoErrors.blogTitle
              ? "border-red-500 focus:border-red-500"
              : "focus:border-input"
          }`}
          placeholder="Enter blog title"
        />
        {blogInfoErrors.blogTitle && (
          <Paragraph className="mt-1.5 text-red-500 text-xs">
            {blogInfoErrors.blogTitle}
          </Paragraph>
        )}
      </div>
      <div ref={categoryRef} className="relative w-full">
        <Label
          htmlFor="category"
          className={cn("text-base text-black font-medium mb-2 px-1 ")}
        >
          Category *
        </Label>
        <div
          className={cn(
            "w-full border rounded-md h-12 bg-[#F1F5F7] px-3 flex items-center transition-colors cursor-pointer text-base text-muted-foreground",
            blogInfoErrors.category && "border-red-500 focus:border-red-500"
          )}
          onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
        >
          {blogInfo.category || "Select category"}
        </div>
        <div
          className={cn(
            "absolute z-10 bg-white border w-full rounded-md shadow-md pb-1 transition-all duration-300 transform",
            showCategoryDropdown
              ? "opacity-100 translate-y-3"
              : "opacity-0 translate-y-0 pointer-events-none"
          )}
        >
          <Input
            type="text"
            placeholder="Search categories..."
            value={categorySearch}
            onChange={(e) => setCategorySearch(e.target.value)}
            className="w-full p-2 mb-2 border-b border-t-0 border-r-0 border-l-0 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {categoryOptions
            .filter((option) =>
              option.toLowerCase().includes(categorySearch.toLowerCase())
            )
            .map((option) => (
              <div
                key={option}
                className="px-2.5 py-1 cursor-pointer hover:text-white hover:bg-blue-500"
                onClick={() => handleCategorySelect(option)}
              >
                {option}
              </div>
            ))}
        </div>
        {blogInfoErrors.category && (
          <Paragraph className="mt-1.5 text-red-500 text-xs">
            {blogInfoErrors.category}
          </Paragraph>
        )}
      </div>

      <div ref={subCategoryRef} className="relative w-full">
        <Label
          htmlFor="subCategory"
          className={cn("text-base text-black font-medium mb-2 px-1 ")}
        >
          Sub Category *
        </Label>
        <div
          className={cn(
            "w-full border rounded-md h-12 bg-[#F1F5F7] px-3 flex items-center transition-colors cursor-pointer text-base text-muted-foreground",
            blogInfoErrors.subCategory && "border-red-500 focus:border-red-500"
          )}
          onClick={() => setShowSubCategoryDropdown(!showSubCategoryDropdown)}
        >
          {blogInfo.subCategory || "Select sub category"}
        </div>
        <div
          className={cn(
            "absolute z-10 bg-white border w-full rounded-md shadow-md pb-1 transition-all duration-300 transform",
            showSubCategoryDropdown
              ? "opacity-100 translate-y-3"
              : "opacity-0 translate-y-0 pointer-events-none"
          )}
        >
          <Input
            type="text"
            placeholder="Search sub categories..."
            value={subCategorySearch}
            onChange={(e) => setSubCategorySearch(e.target.value)}
            className="w-full p-2 mb-2 border-b border-t-0 border-r-0 border-l-0 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {subCategoryOptions
            .filter((option) =>
              option.toLowerCase().includes(subCategorySearch.toLowerCase())
            )
            .map((option) => (
              <div
                key={option}
                className="px-2.5 py-1 cursor-pointer hover:text-white hover:bg-blue-500"
                onClick={() => handleSubCategorySelect(option)}
              >
                {option}
              </div>
            ))}
        </div>
        {blogInfoErrors.subCategory && (
          <Paragraph className="mt-1.5 text-red-500 text-xs">
            {blogInfoErrors.subCategory}
          </Paragraph>
        )}
      </div>

      <div className="relative w-full">
        <Label
          htmlFor="metaTitle"
          className={cn("text-base text-black font-medium mb-2 px-1 ")}
        >
          Meta Title *
        </Label>
        <Input
          id="metaTitle"
          value={blogInfo.metaTitle}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleInputChange("metaTitle", e.target.value)
          }
          className={`w-full bg-transparent border border-input px-3 py-2 transition-colors focus:outline-none focus:ring-0 bg-[#F1F5F7] ${
            blogInfoErrors.metaTitle
              ? "border-red-500 focus:border-red-500"
              : "focus:border-input"
          }`}
          placeholder="Enter meta title"
        />
        {blogInfoErrors.metaTitle && (
          <Paragraph className="mt-1.5 text-red-500 text-xs">
            {blogInfoErrors.metaTitle}
          </Paragraph>
        )}
      </div>

      <div className="relative w-full">
        <Label
          htmlFor="shortDescription"
          className={cn("text-base text-black font-medium mb-2 px-1 ")}
        >
          Short Description *
        </Label>
        <Textarea
          id="shortDescription"
          value={blogInfo.shortDescription}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            handleInputChange("shortDescription", e.target.value)
          }
          className={`w-full bg-transparent border border-input px-3 py-2 transition-colors focus:outline-none focus:ring-0 bg-[#F1F5F7] ${
            blogInfoErrors.shortDescription
              ? "border-red-500 focus:border-red-500"
              : "focus:border-input"
          }`}
          placeholder="Enter short description"
          rows={4}
        />
        {blogInfoErrors.shortDescription && (
          <Paragraph className="mt-1.5 text-red-500 text-xs">
            {blogInfoErrors.shortDescription}
          </Paragraph>
        )}
      </div>

      <div className="relative w-full">
        <Label
          htmlFor="metaDescription"
          className={cn("text-base text-black font-medium mb-2 px-1 ")}
        >
          Meta Description *
        </Label>
        <Textarea
          id="metaDescription"
          value={blogInfo.metaDescription}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            handleInputChange("metaDescription", e.target.value)
          }
          className={`w-full bg-transparent border border-input px-3 py-2 transition-colors focus:outline-none focus:ring-0 bg-[#F1F5F7] ${
            blogInfoErrors.metaDescription
              ? "border-red-500 focus:border-red-500"
              : "focus:border-input"
          }`}
          placeholder="Enter meta description"
          rows={4}
        />
        {blogInfoErrors.metaDescription && (
          <Paragraph className="mt-1.5 text-red-500 text-xs">
            {blogInfoErrors.metaDescription}
          </Paragraph>
        )}
      </div>

      <div className="relative w-full">
        <Label
          htmlFor="primaryKeyword"
          className={cn("text-base text-black font-medium mb-2 px-1 ")}
        >
          Primary Keyword *
        </Label>
        <Input
          id="primaryKeyword"
          value={blogInfo.primaryKeyword}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleInputChange("primaryKeyword", e.target.value)
          }
          className={`w-full bg-transparent border border-input px-3 py-2 transition-colors focus:outline-none focus:ring-0 bg-[#F1F5F7] ${
            blogInfoErrors.primaryKeyword
              ? "border-red-500 focus:border-red-500"
              : "focus:border-input"
          }`}
          placeholder="Enter primary keyword"
        />
        {blogInfoErrors.primaryKeyword && (
          <Paragraph className="mt-1.5 text-red-500 text-xs">
            {blogInfoErrors.primaryKeyword}
          </Paragraph>
        )}
      </div>

      <div className="relative w-full">
        <Label
          htmlFor="secondaryKeywords"
          className={cn("text-base text-black font-medium mb-2 px-1 ")}
        >
          Secondary Keywords
        </Label>
        <div className="flex flex-wrap gap-2">
          <Input
            id="new-keyword"
            placeholder="Add a keyword"
            className="flex-1 bg-[#F1F5F7]"
            value={newKeyword}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setNewKeyword(e.target.value)
            }
            onKeyDown={handleKeyDown}
          />
          <Button
            type="button"
            onClick={handleAddSecondaryKeyword}
            className="bg-green-500 text-white px-4 py-2 rounded-md"
          >
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {blogInfo.secondaryKeywords.map((keyword, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-gray-200 rounded-md p-2"
            >
              <span className="text-xs">{keyword}</span>
              <Button
                type="button"
                className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                onClick={() => handleRemoveSecondaryKeyword(index)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

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
          Thumbnail Image *
        </Label>
        <div
          className={cn(
            "border-2 bg-[#F1F5F7] border-dashed rounded-lg p-4 text-center w-full transition-colors h-[220px] flex items-center justify-center",
            blogInfoErrors.thumbnailImage
              ? "border-red-500 focus:border-red-500"
              : "border-gray-300 hover:border-blue-500"
          )}
        >
          <input
            type="file"
            id="thumbnailImage"
            className="hidden"
            onChange={handleMediaChange}
            accept="image/*"
          />
          <label
            htmlFor="thumbnailImage"
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
                  onClick={handleRemoveThumbnailImage}
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
        {blogInfoErrors.thumbnailImage && (
          <Paragraph className="mt-1.5 text-red-500 text-xs">
            {blogInfoErrors.thumbnailImage}
          </Paragraph>
        )}
      </div>

      <div className="relative w-full">
        <Label
          htmlFor="imageAlt"
          className={cn("text-base text-black font-medium mb-2 px-1 ")}
        >
          Image Alt *
        </Label>
        <Input
          id="imageAlt"
          value={blogInfo.imageAlt}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleInputChange("imageAlt", e.target.value)
          }
          className={`w-full bg-transparent border border-input px-3 py-2 transition-colors focus:outline-none focus:ring-0 bg-[#F1F5F7] ${
            blogInfoErrors.imageAlt
              ? "border-red-500 focus:border-red-500"
              : "focus:border-input"
          }`}
          placeholder="Enter image alt text"
        />
        {blogInfoErrors.imageAlt && (
          <Paragraph className="mt-1.5 text-red-500 text-xs">
            {blogInfoErrors.imageAlt}
          </Paragraph>
        )}
      </div>
    </>
  );
}

export default BlogInfoForm;
