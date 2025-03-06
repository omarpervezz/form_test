import React, { ChangeEvent, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/redux-store/store";
import { Button } from "@/components/atoms/Button";
import {
  updateAirportField,
  removeGalleryImage,
} from "@/redux/feature/add-airport/addAirportSlice";
import Image from "next/image";
import { X } from "lucide-react";
import Label from "@/components/atoms/Label";
import { cn } from "@/lib/utils";
import Paragraph from "@/components/atoms/Paragraph";
import { clearError } from "@/redux/feature/add-airport/addAirportErrorsSlice";
const AirportMediaForm: React.FC = () => {
  const dispatch = useDispatch();
  const details = useSelector((state: RootState) => state.addAirport.details);
  const errors = useSelector(
    (state: RootState) => state.addAirportErrors.errors
  );
  const [mainImagePreview, setMainImagePreview] = useState<string | null>(
    details.mainImage ? URL.createObjectURL(details.mainImage) : null
  );
  const [galleryImagePreviews, setGalleryImagePreviews] = useState<string[]>(
    details.galleryImages.map((file) => URL.createObjectURL(file))
  );
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  useEffect(() => {
    return () => {
      if (mainImagePreview) URL.revokeObjectURL(mainImagePreview);
      galleryImagePreviews.forEach((preview) => URL.revokeObjectURL(preview));
    };
  }, [mainImagePreview, galleryImagePreviews]);

  const simulateUpload = (callback: () => void) => {
    setUploadProgress(0);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        callback();
      }
    }, 100);
  };

  const handleMainImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file.");
        return;
      }
      simulateUpload(() => {
        dispatch(updateAirportField({ field: "mainImage", value: file }));
        setMainImagePreview(URL.createObjectURL(file));
        dispatch(clearError({ field: "mainImage" }));
      });
    }
  };

  const handleRemoveMainImage = () => {
    dispatch(updateAirportField({ field: "mainImage", value: null }));
    if (mainImagePreview) {
      URL.revokeObjectURL(mainImagePreview);
    }
    setMainImagePreview(null);
  };

  const handleGalleryImagesChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).filter((file) =>
        file.type.startsWith("image/")
      );
      if (filesArray.length < e.target.files.length) {
        alert("Some files were ignored because they are not images.");
      }
      simulateUpload(() => {
        const updatedGalleryImages = [...details.galleryImages, ...filesArray];
        dispatch(
          updateAirportField({
            field: "galleryImages",
            value: updatedGalleryImages,
          })
        );
        const newPreviews = filesArray.map((file) => URL.createObjectURL(file));
        setGalleryImagePreviews([...galleryImagePreviews, ...newPreviews]);
        dispatch(clearError({ field: "galleryImages" }));
      });
    }
  };

  const handleRemoveGalleryImage = (index: number) => {
    dispatch(removeGalleryImage(index));
    URL.revokeObjectURL(galleryImagePreviews[index]);
    setGalleryImagePreviews(galleryImagePreviews.filter((_, i) => i !== index));
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-medium mb-2">Media Upload</h2>
      <div className="h-4 mb-2">
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
        Main Image *
      </Label>
      <div
        className={cn(
          "border-2 bg-[#F1F5F7] border-dashed rounded-lg p-4 text-center w-full transition-colors h-[220px] flex items-center justify-center",
          errors.mainImage
            ? "border-red-500 focus:border-red-500"
            : "border-gray-300 hover:border-blue-500"
        )}
      >
        <input
          type="file"
          id="mainImage"
          className="hidden"
          onChange={handleMainImageChange}
          accept="image/*"
        />
        <label
          htmlFor="mainImage"
          className="w-full h-full cursor-pointer flex items-center justify-center"
        >
          {mainImagePreview ? (
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={mainImagePreview}
                alt="Media Preview"
                width={300}
                height={200}
                className="rounded-md h-full object-contain"
              />
              <Button
                onClick={handleRemoveMainImage}
                className="absolute top-1 right-1 flex items-center justify-center bg-red-600 text-white w-7 h-7 rounded-full"
                aria-label="Remove media"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <p className="text-gray-500">Click to upload a main image</p>
          )}
        </label>
      </div>
      {errors.mainImage && (
        <Paragraph className="mt-1.5 text-red-500 text-xs">
          {errors.mainImage}
        </Paragraph>
      )}
      <Label className={cn("text-base text-black font-medium mt-4 mb-2 px-1 ")}>
        Gallery Image *
      </Label>
      <div
        className={cn(
          "border-2 bg-[#F1F5F7] border-dashed rounded-lg p-4 text-center w-full transition-colors h-[220px] flex items-center justify-center",
          errors.galleryImages
            ? "border-red-500 focus:border-red-500"
            : "border-gray-300 hover:border-blue-500"
        )}
      >
        <input
          type="file"
          id="galleryImages"
          multiple
          className="hidden"
          onChange={handleGalleryImagesChange}
          accept="image/*"
        />
        <label
          htmlFor="galleryImages"
          className="w-full h-full cursor-pointer flex items-center justify-center"
        >
          <p className="text-gray-500">Click to upload gallery images</p>
        </label>
      </div>
      {errors.galleryImages && (
        <Paragraph className="mt-1.5 text-red-500 text-xs">
          {errors.galleryImages}
        </Paragraph>
      )}
      {details.galleryImages.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {galleryImagePreviews.map((preview, index) => (
            <div
              key={index}
              className="relative group w-full max-w-[150px] border rounded-lg overflow-hidden shadow-md"
            >
              <Image
                src={preview}
                alt={`Gallery ${index}`}
                width={250}
                height={250}
                className="w-full h-20 object-cover"
              />
              <Button
                onClick={() => handleRemoveGalleryImage(index)}
                className="absolute top-1 right-1 flex items-center justify-center bg-red-600 text-white w-6 h-6 rounded-full"
                aria-label={`Remove gallery image ${index}`}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AirportMediaForm;
