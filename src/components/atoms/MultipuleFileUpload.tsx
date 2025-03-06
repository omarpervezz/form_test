"use client";

import { Button } from "@/components/atoms/Button";
import CardTitle from "@/components/atoms/CardTitle";
import { InputFile } from "@/components/atoms/InputFile";
import Paragraph from "@/components/atoms/Paragraph";
import Span from "@/components/atoms/Span";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useState } from "react";
import { PiImageLight } from "react-icons/pi";
import { RiCloseLine } from "react-icons/ri";

interface MultipleFileUploadProps {
  id: string;
  attachments?: File[] | null;
  onFilesChange: (files: File[]) => void;
  allowedFileTypes?: string[];
  maxFileSize?: number; // in MB
  maxFiles?: number;
  className?: string;
  cardTitle?: string;
  cardTititleStyle?: string;
  cardDes?: string;
}

const MultipleFileUpload: React.FC<MultipleFileUploadProps> = ({
  onFilesChange,
  allowedFileTypes = ["image/jpeg", "image/png", "image/webp"],
  maxFileSize = 3,
  maxFiles = 5,
  className,
  id,
  cardTitle,
  cardTititleStyle,
  cardDes,
}) => {
  const [selectedMultipuleFiles, setSelectedMultipuleFiles] = useState<File[]>(
    []
  );
  const [previews, setPreviews] = useState<string[]>([]);
  const [isMultipuleDragOver, setIsMultipuleDragOver] = useState(false);

  const handleMultipuleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(event.target.files || []);
    processFiles(files);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setIsMultipuleDragOver(true);
  };

  const handleDragLeave = (): void => {
    setIsMultipuleDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setIsMultipuleDragOver(false);
    const files = Array.from(e.dataTransfer.files || []);
    processFiles(files);
  };

  const processFiles = (files: File[]) => {
    let validFiles = files.filter(validateFile);

    if (selectedMultipuleFiles.length + validFiles.length > maxFiles) {
      alert(`You can only upload up to ${maxFiles} files.`);
      validFiles = validFiles.slice(
        0,
        maxFiles - selectedMultipuleFiles.length
      );
    }

    const newFiles = [...selectedMultipuleFiles, ...validFiles];
    setSelectedMultipuleFiles(newFiles);
    setPreviews(newFiles.map((file) => URL.createObjectURL(file)));
    onFilesChange(newFiles);
  };

  const validateFile = (file: File): boolean => {
    if (!allowedFileTypes.includes(file.type)) {
      alert("Invalid file type. Only JPG, PNG, and WEBP are allowed.");
      return false;
    }
    if (file.size / 1024 / 1024 > maxFileSize) {
      alert(`File size exceeds ${maxFileSize}MB limit.`);
      return false;
    }
    return true;
  };

  const removeFile = (index: number) => {
    const updatedFiles = selectedMultipuleFiles.filter((_, i) => i !== index);
    setSelectedMultipuleFiles(updatedFiles);
    setPreviews(updatedFiles.map((files) => URL.createObjectURL(files)));
    onFilesChange(updatedFiles);
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="mt-8 shadow-md rounded-md p-2 md:p-6 w-full relative">
        <CardTitle
          className={cn(
            `font-semibold capitalize text-base md:text-lg lg:text-lg text-[#243045] dark:text-white`,
            cardTititleStyle
          )}
        >
          {cardTitle || "Attachment"}
        </CardTitle>
        <CardTitle className="text-[#656565] font-normal text-xs">
          {cardDes}
        </CardTitle>
        {previews.length > 0 && (
          <div className="grid grid-cols-4 gap-4 mt-6">
            {previews.map((preview, index) => (
              <div
                key={index}
                className="relative border rounded-md shadow-md p-2"
              >
                <Button
                  className="absolute top-0 right-0 bg-red-300 py-2 text-xs px-2 text-white rounded-full hover:bg-red-500 transition-all duration-200"
                  onClick={() => removeFile(index)}
                  type="button"
                >
                  <RiCloseLine />
                </Button>
                <Image
                  src={preview}
                  alt={`Uploaded File ${index + 1}`}
                  width={250}
                  height={250}
                  className="object-cover rounded-md w-[120px] h-[100px]"
                />
              </div>
            ))}
          </div>
        )}
        <div
          className={`flex border-dashed border-2 mt-4 rounded-md ${
            isMultipuleDragOver
              ? "border-blue-700 bg-blue-100"
              : "border-blue-500"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex mx-auto items-center justify-center flex-col py-12">
            <PiImageLight size={30} className="cursor-pointer" />
            <InputFile
              id={id}
              type="file"
              multiple
              onChange={handleMultipuleFileInputChange}
              className="hidden"
            />
            <Span className="text-[#243045] py-1 text-xs lg:text-sm font-normal dark:text-white">
              Drag your files to start uploading
            </Span>
            <div className="flex items-center gap-3">
              <span className="w-[50px] sm:w-[160px] h-[1px] bg-[#DCDCDC] block"></span>
              <Span className="font-normal text-xs lg:text-xs text-[#7C7C7C] dark:text-white">
                OR
              </Span>
              <span className="w-[50px] sm:w-[160px] h-[1px] bg-[#DCDCDC] block"></span>
            </div>
            <Button
              type="button"
              onClick={() => document.getElementById(id)?.click()}
              className="text-[#1768D0] border px-3 py-1.5 rounded-md mt-3 border-[#1768D0] text-sm"
            >
              Browse Files
            </Button>
          </div>
        </div>
        <Paragraph className="text-[#656565] font-normal text-sm mt-2 lg:text-base sm:mt-1 dark:text-white">
          Upload up to {maxFiles} JPG, PNG & WEBP files. File Size Max{" "}
          {maxFileSize} MB each.
        </Paragraph>
      </div>
    </div>
  );
};

export default MultipleFileUpload;
