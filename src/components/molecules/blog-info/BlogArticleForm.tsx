/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { ChangeEvent, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/redux-store/store";
import {
  updateBlogArticleField,
  addKeyword,
  removeKeyword,
  removeFeatureImage,
} from "@/redux/feature/blog-info/blogArticleSlice";
import {
  setBlogArticleError,
  clearBlogArticleError,
} from "@/redux/feature/blog-info/blogArticleErrorsSlice";
import Label from "@/components/atoms/Label";
import { Input } from "@/components/atoms/Input";
import Paragraph from "@/components/atoms/Paragraph";
import { Textarea } from "@/components/atoms/Textaria";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "@/components/atoms/Button";
import { X } from "lucide-react";

function BlogArticleForm() {
  const dispatch = useDispatch();
  const blogArticle = useSelector((state: RootState) => state.blogArticle);
  const blogArticleErrors = useSelector(
    (state: RootState) => state.blogArticleErrors
  );
  const [newKeyword, setNewKeyword] = useState<string>("");
  const [mediaPreview, setMediaPreview] = useState<string | null>(
    blogArticle.featureImage
      ? URL.createObjectURL(blogArticle.featureImage)
      : null
  );
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const validateBlogArticleField = useCallback(
    (field: keyof typeof blogArticle, value: any): string => {
      if (field === "articleTitle" && !value.trim())
        return "Article title is required.";
      if (field === "contents" && !value.trim())
        return "Contents are required.";
      if (field === "featureImage" && !value)
        return "Feature image is required.";
      return "";
    },
    []
  );

  const handleInputChange = useCallback(
    (field: keyof typeof blogArticle, value: any) => {
      dispatch(updateBlogArticleField({ field, value }));

      const error = validateBlogArticleField(field, value);
      if (error) {
        dispatch(setBlogArticleError({ field, error }));
      } else {
        dispatch(clearBlogArticleError({ field }));
      }
    },
    [dispatch, validateBlogArticleField]
  );

  const handleAddKeyword = () => {
    if (newKeyword.trim() !== "") {
      dispatch(addKeyword(newKeyword));
      setNewKeyword("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (!newKeyword.trim()) return;

      if (blogArticle?.keywords?.length >= 10) {
        alert("Maximum keyword limit reached");
        return;
      }

      dispatch(addKeyword(newKeyword));
      setNewKeyword("");
    }
  };
  const handleRemoveKeyword = (index: number) => {
    dispatch(removeKeyword(index));
  };

  const handleRemoveFeatureImage = () => {
    dispatch(removeFeatureImage());
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
        dispatch(
          updateBlogArticleField({ field: "featureImage", value: file })
        );
        setMediaPreview(URL.createObjectURL(file));
        dispatch(clearBlogArticleError({ field: "featureImage" }));
        clearInterval(interval);
        setUploadProgress(100);
      }, 1000);
    }
  };

  return (
    <>
      <div className="relative w-full">
        <Label
          htmlFor="articleTitle"
          className={cn("text-base text-black font-medium mb-2 px-1 ")}
        >
          Article Title *
        </Label>
        <Input
          id="articleTitle"
          value={blogArticle.articleTitle}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleInputChange("articleTitle", e.target.value)
          }
          className={`w-full bg-transparent border border-input px-3 py-2 transition-colors focus:outline-none focus:ring-0 bg-[#F1F5F7] ${
            blogArticleErrors.articleTitle
              ? "border-red-500 focus:border-red-500"
              : "focus:border-input"
          }`}
          placeholder="Enter article title"
        />
        {blogArticleErrors.articleTitle && (
          <Paragraph className="mt-1.5 text-red-500 text-xs">
            {blogArticleErrors.articleTitle}
          </Paragraph>
        )}
      </div>

      <div className="relative w-full">
        <Label
          htmlFor="keywords"
          className={cn("text-base text-black font-medium mb-2 px-1 ")}
        >
          Keywords
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
            onClick={handleAddKeyword}
            className="bg-green-500 text-white px-4 py-2 rounded-md"
          >
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {blogArticle.keywords.map((keyword, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-[#F1F5F7] rounded-md p-2"
            >
              <span className="text-xs">{keyword}</span>
              <Button
                type="button"
                className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                onClick={() => handleRemoveKeyword(index)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="relative w-full">
        <Label
          htmlFor="contents"
          className={cn("text-base text-black font-medium mb-2 px-1 ")}
        >
          Contents *
        </Label>
        <Textarea
          id="contents"
          value={blogArticle.contents}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            handleInputChange("contents", e.target.value)
          }
          className={`w-full bg-transparent border border-input px-3 py-2 transition-colors focus:outline-none focus:ring-0 bg-[#F1F5F7] ${
            blogArticleErrors.contents
              ? "border-red-500 focus:border-red-500"
              : "focus:border-input"
          }`}
          placeholder="Enter contents"
          rows={6}
        />
        {blogArticleErrors.contents && (
          <Paragraph className="mt-1.5 text-red-500 text-xs">
            {blogArticleErrors.contents}
          </Paragraph>
        )}
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
          Feature Image *
        </Label>
        <div
          className={cn(
            "border-2 bg-[#F1F5F7] border-dashed rounded-lg p-4 text-center w-full transition-colors h-[220px] flex items-center justify-center",
            blogArticleErrors.featureImage
              ? "border-red-500 focus:border-red-500"
              : "border-gray-300 hover:border-blue-500"
          )}
        >
          <input
            type="file"
            id="featureImage"
            className="hidden"
            onChange={handleMediaChange}
            accept="image/*"
          />
          <label
            htmlFor="featureImage"
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
                  onClick={handleRemoveFeatureImage}
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
        {blogArticleErrors.featureImage && (
          <Paragraph className="mt-1.5 text-red-500 text-xs">
            {blogArticleErrors.featureImage}
          </Paragraph>
        )}
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          className="w-full sm:w-auto bg-green-500 text-white px-5 py-2 rounded-md text-sm"
        >
          Add Article
        </Button>
      </div>
    </>
  );
}

export default BlogArticleForm;
