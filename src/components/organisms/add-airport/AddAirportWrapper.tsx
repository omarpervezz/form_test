"use client";
import React, { FormEvent } from "react";
import AirportBasicInfoForm from "@/components/molecules/add-airport/AirportBasicInfoForm";
import MultiStepTabNavigation from "@/components/molecules/global/MultiStepTabNavigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/redux-store/store";
import { setActiveTab } from "@/redux/feature/package-upload/packageUploadTabSlice";
import MultiStepFormPaginationsButton from "@/components/molecules/global/MultiStepFormPaginationsButton";
import { setError } from "@/redux/feature/add-airport/addAirportErrorsSlice";
import AirportMediaForm from "@/components/molecules/add-airport/AirportMediaForm";

const tabs = [{ label: "Basic Info" }, { label: "Media" }];

const AddAirportWrapper: React.FC = () => {
  const dispatch = useDispatch();
  const activeTab = useSelector(
    (state: RootState) => state.packageUploadTab.activeTab
  );
  const details = useSelector((state: RootState) => state.addAirport.details);

  const validateStep = (tabIndex: number): boolean => {
    const newErrors: { [key: string]: string } = {};
    if (tabIndex === 0) {
      if (!details.airportName.trim()) {
        newErrors.airportName = "Airport name is required.";
      }
      if (!details.shortCode.trim()) {
        newErrors.shortCode = "Short code is required.";
      }
      if (!details.country.trim()) {
        newErrors.country = "Country is required.";
      }
      if (!details.city.trim()) {
        newErrors.city = "City is required.";
      }
      if (!details.airportType.trim()) {
        newErrors.airportType = "Airport type is required.";
      }
      if (!details.description.trim()) {
        newErrors.description = "Description is required.";
      }
    } else if (tabIndex === 1) {
      // Validate Media
      if (!details.mainImage) {
        newErrors.mainImage = "Main image is required.";
      }
      if (details.galleryImages.length === 0) {
        newErrors.galleryImages = "Gallery images are required.";
      }
    }

    Object.keys(newErrors).forEach((field) => {
      dispatch(setError({ field, error: newErrors[field] }));
    });

    return Object.keys(newErrors).length === 0;
  };

  const handleTabChange = (tabIndex: number) => {
    if (tabIndex > activeTab && !validateStep(activeTab)) return;
    dispatch(setActiveTab(tabIndex));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateStep(activeTab)) return;
    // Submit form data
    console.log("Form submitted successfully:", details);
  };

  const renderActiveSection = () => {
    switch (activeTab) {
      case 0:
        return <AirportBasicInfoForm />;
      case 1:
        return <AirportMediaForm />;

      default:
        return null;
    }
  };

  return (
    <div className="p-1 sm:p-5 rounded-md space-y-5">
      <MultiStepTabNavigation onTabChange={handleTabChange} tabs={tabs} />
      <form onSubmit={handleSubmit}>
        <div className="space-y-5">{renderActiveSection()}</div>
        <MultiStepFormPaginationsButton
          handleTabChange={handleTabChange}
          activeTab={activeTab}
          tabsLength={tabs.length}
        />
      </form>
    </div>
  );
};

export default AddAirportWrapper;
